import React, { useEffect, useState } from "react";
import Main from "../components/dashboard/Main";
import Header from "../components/dashboard/Main";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/Navbar";
import { GetServerSideProps } from "next";
import { fetchUsers } from "../utils/fetchUsers";
import { GoalBody, Goals, User } from "../typings";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { fetchGoals } from "../utils/fetchGoals";
import { fetchNotes } from "../utils/fetchNotes";
import toast from "react-hot-toast";
import { UserButton, useUser } from "@clerk/nextjs";
import Head from "next/head";

import {
  Button,
  Checkbox,
  Collapse,
  Grid,
  Input,
  Loading,
  Modal,
  Progress,
  Text,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import Planet from "./tracker";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import Island from "../components/BoonIsland/Island";
import Dialog from "../components/ChapterPopup/ChapterPopup";
import SkeletonLoading from "../components/SkeletonLoading";
import TodoList from "../components/TodoList/TodoList";
import CustomLoader from "../components/CustomLoader";
import Notes from "../components/Notes/Notes";
import { DeleteIcon, XIcon } from "lucide-react";
import Category from "../pages/select-categories";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });
interface Props {
  users: User[];
  goals: Goals[];
  notes: Notes[];
  setLoading?: (value: boolean) => void;
}

interface RoadmapItem {
  id: number;
  title: string;
}
interface datatype {
  message: {
    choices: [
      {
        message: {
          content: string;
        };
      }
    ];
  };
}

function CategoryDropdown({ categories, handleCategoryChange }: any) {
  return (
    <select
      className="bg-transparent outline-none border-none ring-0 divide-x-0 select-none"
      onChange={handleCategoryChange}
    >
      {Array.from(categories).map((category: any, index) => (
        <option
          className="bg-transparent text-black"
          key={index}
          value={category}
        >
          {category}
        </option>
      ))}
    </select>
  );
}

const Home = ({ users, goals, notes, setLoading }: Props) => {
  // const { activeSong } = useSelector((state: any) => state.player);
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded) {
    return <div>Loading</div>;
  }
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedNote, setSelectedNote] = useState("");
  const [selectedNoteData, setSelectedNoteData] = useState("");
  setLoading ? setLoading(true) : "";
  const [goal, setGoal] = useState<Goals[]>(goals);
  const router = useRouter();
  const match = users.filter(
    (userss) => userss.email == user?.emailAddresses[0].emailAddress
  );
  const [todos, setTodos] = useState<any[]>([]);

  const [tempTodo, setTemptodo] = useState<any>(null);

  const [notesList, setNotesList] = useState<any[]>([]);

  useEffect(() => {
    setTodos(
      goals
        .filter((goal) => goal.username == user?.username)
        .sort((a, b) =>
          a.todoIndex != undefined && b.todoIndex != undefined
            ? a.todoIndex - b.todoIndex
            : 0
        )
    );
    if (user && !match[0]?.categories) {
      // router.push("/categories");
    } else {
      null;
    }
    setLoading ? setLoading(false) : "";
    setNotesList(notes);
  }, []);

  const refreshGoals = async () => {
    const goals: Goals[] = await fetchGoals();
    setGoal(goals);
  };

  const addGoalDataSchedule = async (title: string) => {
    try {
      const postInfo: GoalBody = {
        // @ts-ignore
        _type: "goals",
        title: title,
        progress: 0,
        username: user?.username!,
        completed: false,
        delete: false,
        todoIndex: todos.length,
      };
      const result = await fetch(`/api/addGoalData`, {
        body: JSON.stringify(postInfo),
        method: "POST",
      });
      const json = await result.json();
      console.log(json);
      return json;
    } catch (err) {
      console.error(err);
    }
  };

  const [text, setText] = useState("");

  const addCompleted = async (id: string | undefined) => {
    try {
      const postInfo: Goals = {
        // @ts-ignore
        _id: id,
        completed: true,
      };
      const result = await fetch(`/api/setGoals`, {
        body: JSON.stringify(postInfo),
        method: "POST",
      });
      const json = await result.json();

      console.log(json);
      router.replace(router.asPath);

      return json;
    } catch (err) {
      console.error(err);
    }
  };
  const addUnCompleted = async (id: string | undefined) => {
    toast.custom((t) => (
      <div>
        <Loading color={"white"} size="md" />
      </div>
    ));
    try {
      const postInfo: Goals = {
        // @ts-ignore
        _id: id,
        completed: false,
      };
      const result = await fetch(`/api/setGoals`, {
        body: JSON.stringify(postInfo),
        method: "POST",
      });
      const json = await result.json();
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://ownboon-practice.vercel.app/_next/image?url=%2Flogo.png&w=48&q=75"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-[15px] font-medium text-gray-900">
                  U set ur todo to not completed
                </p>
                <p className="mt-1 text-[15px] text-gray-500">
                  Try refreshing the page to see it!
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-[15px] font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
      router.replace(router.asPath);

      console.log(json);
      return json;
    } catch (err) {
      console.error(err);
    }
  };
  const focus = match[0]?.focus;
  const factor = 0.02;
  const focus_no = Number(focus);
  const level = Math.floor(focus_no! * factor);

  const notess = notes.filter(
    (note) => note.email === user?.emailAddresses[0].emailAddress
  );

  let categories = new Set();
  notess.forEach((note) => {
    categories.add(note.category);
  });

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  console.log("selected", selectedCategory);

  const filteredNotes = notess.filter(
    (note) => selectedCategory === "" || note.category === selectedCategory
  );
  const [desc, setDesc] = useState("");
  const [data, setData] = useState<datatype>();
  const [show, setShow] = useState(false);
  const refreshTodo = async () => {
    const todo = await fetchGoals();
    todo;
  };
  const fetchRoadmap = async (
    mood: string,
    objective: string,
    time: string
  ) => {
    // e.preventDefault();

    setShow(true);

    const result = await fetch(
      `/api/roadmap/schedule?title=${objective}?mood=${mood}?time=${time}`
    );

    const json = await result.json();
    setData(json);
    setShow(false);
    return json;
  };
  console.log("scheldular data", data);
  const [susdata, setSusData] = useState();

  const [showModal, setShowModal] = React.useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);

  useEffect(() => {
    if (data) {
      // @ts-ignore
      const roadmapdata = data?.message.choices[0].message.content;
      const fine = roadmapdata.replace("@finish", "");
      const sus = JSON.parse(fine);
      setSusData(sus);
    }
  }, [data]);
  const [temptodos, setTemptodos] = useState(todos);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(temptodos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTemptodos(items);
  };

  const addDeleted = async (id: string | undefined) => {
    try {
      const noteInfo = {
        // @ts-ignore
        _id: id,
      };
      //@ts-ignore
      setNotes(notes.filter((t: any) => t._id != id));

      fetch(`/api/deleteNote`, {
        body: JSON.stringify(noteInfo),
        method: "POST",
      }).then(async (res) => {
        const json = await res.json();
        router.replace("/lofi");
        setShowModal(false);
        return json;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const [userprompt, setUserprompt] = useState({
    mood: "",
    objective: "",
    time: "",
  });
  const handlechange = (eventmood: string) => {
    setEmpty(false);
    if (userprompt.mood && userprompt.mood === eventmood) {
      setUserprompt({ ...userprompt, mood: "" });
    } else {
      setUserprompt({ ...userprompt, mood: eventmood });
    }
  };
  const handleprompt = () => {};
  const [pageposition, setPagepostion] = useState(0);
  let pageid = 0;
  useEffect(() => {
    if (!showPromptModal) {
      pageid = 0;
      setPagepostion(pageid);
      setEmpty(false);
      setUserprompt({ mood: "", objective: "", time: "" });
    }
  }, [showPromptModal]);
  const handleNoteChange = async (id: string) => {
    const mutations = {
      _id: id,
      note: text,
    };

    const result = await fetch("/api/setNotes", {
      body: JSON.stringify(mutations),
      method: "POST",
    });
    const json = result.json();
    setShowModal(false);
    router.replace("/workspace");
    return json;
  };

  const handlenextpage = () => {
    pageid = pageposition + 1;
    setPagepostion(pageid);
    setEmpty(false);
  };
  const handlepreviouspage = () => {
    pageid = pageposition - 1;
    setPagepostion(pageid);
    setEmpty(false);
  };
  const [empty, setEmpty] = useState(false);
  const [categoryslide, setCategoryslide] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");

  const [todoText, setTodoText] = useState("");

  const handleOptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
  };

  const [showAddNotesModal, setShowAddNotesModal] = useState(false);
  const [showBoonIslandModal, setShowBoonIslandModal] = useState(false);
  const [boonisland, setBoonisland] = useState(false);
  const load = () => {
    setShowBoonIslandModal(true);
    setBoonisland(true);
    setTimeout(() => {
      setBoonisland(false);
    }, 1000);
  };

  const [dummyNote, setDummyNote] = useState<any>(null);

  const handleAddingNewNote = () => {
    setShowAddNotesModal(true);
  };
  const showNote = () => {
    setShowModal(true);
  };

  // const notes = [1,2,2,3,3,3,3,3,3,3,3,3]

  return (
    <div className="overflow-y-scroll h-screen">
      {!match[0].categories && !categoryslide ? (
        <>
          <Modal
            // closeButton
            aria-labelledby="modal-title"
            className="!bg-[#191919]/40 z-50 h-[70vh] flex justify-center items-center ml-10 backdrop-blur-md fixed top-0 left-0 right-0  w-full overflow-x-hidden overflow-y-auto md:inset-0"
            open={true}
            width="80%"
          >
            <Modal.Header className="text-neutral-400">
              <p className="text-neutral-400"></p>
            </Modal.Header>
            <Modal.Body className="flex justify-center items-center h-full w-full">
              {" "}
              <Text id="modal-title" color="white" size={40}>
                <h1 className="fade  bg-transparent  text-neutral-100 brightness-125">
                  Welcome to OwnBoon
                </h1>
              </Text>
              <h2 className="text-neutral-400 fade">
                {" "}
                Before you access the app we would like to ask a few questions
                from you
              </h2>
            </Modal.Body>
            <Modal.Footer className="w-full p-2">
              <div className="flex fade justify-center p-2 w-full gap-5">
                <div className=" border-gray-500/30 bg-[#363636]/20 backdrop-blur-lg from-gray-300 w-fit flex flex-col justify-start relative hover:   items-center py-3 border rounded">
                  <button
                    onClick={() => setCategoryslide(true)}
                    className="rounded-xl cursor-pointer whitespace-nowrap md:text-lg  text-sm   text-[#dddddd] relative mx-24"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </Modal.Footer>
          </Modal>
        </>
      ) : categoryslide ? (
        <Modal
          aria-labelledby="modal-title"
          className="!bg-[#191919]/40 h-[90%] flex justify-center items-center ml-10 backdrop-blur-md fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0"
          open={true}
          width="80%"
        >
          <Category users={users} />
        </Modal>
      ) : null}
      <div className=" bg-[#101010]  fade flex mt-[40px] flex-row justify-end relative font-sans w-full items-start">
        <div className="flex font-fontspring flex-col justify-start  gap-x-4 gap-y-5 relative w-full  items-end">
          <section
            id="section-1"
            className="grid gird-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-start gap-5 relative w-full items-center mr-5"
          >
            <div
              id="TodoAndGenerator-container"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 flex-col md:flex-row lg:flex-col justify-start gap-5 relative items-center"
            >
              <TodoList todos={todos} user={user} setTodos={setTodos} />

              <div className=" bg-[#191919] flex flex-col justify-start gap-2 relative w-full h-fit shrink-0 items-center pt-4 pb-3  rounded-lg">
                <div className="whitespace-nowrap underline underline-offset-8 text-[19px] md:text-[23px] font-sans text-white relative">
                  AI Schedule Generator
                </div>
                <div className="mb-2 relative w-40 h-px shrink-0 " />
                <div className="text-center font-poppins text-sm md:text-[15px] text-white mb-2 relative w-3/4 sm:text-sm md:text-base lg:text-lg xl:text-[15px]">
                  The AI schedule generator analyzes preferences, constraints,
                  and resources to create optimized schedules, maximizing
                  efficiency and productivity.
                </div>
                <button
                  onClick={() => setShowPromptModal(true)}
                  className="cursor-pointer border-gray-500 bg-[#363636] from-gray-300 w-10/12 flex flex-col justify-start relative h-12 shrink-0 items-center py-3 border rounded"
                >
                  <h1 className="rounded-xl cursor-pointer whitespace-nowrap text-[15px] font-sans text-[#dddddd] relative mx-24">
                    Generate Now
                  </h1>
                </button>
              </div>
            </div>
            <div
              id="boonIland-wraper "
              className="bg-[#191919] xl:col-span-2 w-full h-full py-3 rounded-lg overflow-hidden gap-2"
            >
              <div className="whitespace-nowrap text-[23px] text-center font-sans text-white relative">
                Boon Island
              </div>
              <div className="" onClick={() => load()}>
                {/* display the image of the current level of boon island, static image to avoid long loading */}
                <div className="opacity-100  bg-transparent hover:cursor-pointer w-full md:w-1/2 group h-full absolute "></div>
                {level < 5 ? (
                  <img
                    className="group-hover:brightness-110 transition-all duration-150"
                    src="https://cdn.sanity.io/images/mrfd4see/production/d1bd6eff25b845c90126df595c24663cffcd9acf-3072x1414.png?w=2000&fit=max&auto=format"
                  />
                ) : level < 10 ? (
                  <div>
                    <img
                      className="group-hover:brightness-110 transition-all duration-150"
                      src="https://cdn.sanity.io/images/mrfd4see/production/d1bd6eff25b845c90126df595c24663cffcd9acf-3072x1414.png?w=2000&fit=max&auto=format"
                    />
                  </div>
                ) : level < 21 ? (
                  <img
                    className="group-hover:brightness-110 transition-all duration-150"
                    src="https://cdn.sanity.io/images/mrfd4see/production/996a064b91c927a0fceec73bc265112d1207822f-3072x1414.png?w=2000&fit=max&auto=format"
                  />
                ) : level < 31 ? (
                  <img
                    className="group-hover:brightness-110 transition-all duration-150"
                    src="https://cdn.sanity.io/images/mrfd4see/production/f8cf6a118ab5c937763289890beb462071486665-3072x1414.png?w=2000&fit=max&auto=format"
                  />
                ) : level < 41 ? (
                  <img
                    className="group-hover:brightness-110 transition-all duration-150"
                    src="https://cdn.sanity.io/images/mrfd4see/production/914f72baf217a69b15346c9ae10db7057b1d4d12-3072x1414.png?w=2000&fit=max&auto=format"
                  />
                ) : level > 51 ? (
                  <img
                    className="group-hover:brightness-110 transition-all duration-150"
                    src="https://cdn.sanity.io/images/mrfd4see/production/e600fb45845244fdce46b6e1bec2bff7d8631f5f-3360x1786.png?w=2000&fit=max&auto=format"
                  />
                ) : null}
              </div>
            </div>
          </section>
          <div className="md:p-5  overflow-scroll bg-[#191919] flex flex-col mr-5 gap-y-3 relative w-full items-center h-full  rounded-lg justify-center overflow-y-visible ">
            <div className="flex justify-center w-full  gap-1 relative items-center">
              <div className="flex items-center gap-2 col-span-2 justify-end w-full">
                <div className="w-full"></div>
                <div className="flex justify-between w-full">
                  <CategoryDropdown
                    categories={categories}
                    handleCategoryChange={handleCategoryChange}
                  />
                </div>
                <div
                  onClick={handleAddingNewNote}
                  className="border-gray-500 col-span-1 bg-[#38383A] self-center flex flex-row justify-center gap-1 h-10 items-center px-[10px] py-2 border rounded m-3 ml-auto"
                >
                  <img
                    src="https://file.rendit.io/n/xqvQ4cl5AoJGfD7albqE.png"
                    className="min-h-0 min-w-0"
                  />
                  <button className="whitespace-nowrap text-[15px] font-sans text-[#dddddd]">
                    Add Note
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="flex justify-center items-center       flex-shrink-0 " /> */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:p-5  lg:grid-cols-3 justify-center items-center w-full h-full gap-3">
              {filteredNotes.map((note) => (
                <>
                  <Dialog isOpen={showModal} onClose={setShowModal}>
                    <div className="rounded-xl scale-150 md:scale-100 bg-[#101010]/50 backdrop-blur-2xl p-2 w-full h-full  md:p-16">
                      <div className=" md:h-[43px] text-white md:text-3xl flex items-center gap-5  text-sm font-semibold">
                        {selectedNote}
                        <button
                          className="text-white flex"
                          onClick={(e) => {
                            addDeleted(note._id);
                          }}
                        >
                          <Tooltip content="delete the note">
                            <DeleteIcon className="text-sm text-red-200" />
                          </Tooltip>
                        </button>
                      </div>
                      <div className="md:w-44 h-[0px] w-full border border-neutral-400"></div>
                      <div className="scale-75 flex justify-center items-center flex-col md:scale-100 w-full h-full text-sm">
                        <div className=" inline">
                          <ReactQuill
                            theme="snow"
                            className=" lg:h-64 md:h-32 lg:mt-5 md:mt-2 mt-0 sm:h-fit  w-fit !border !border-white/10   scrollbar scrollbar-track-white scrollbar-thumb-blue-50"
                            value={text || note?.note}
                            onChange={setText}
                          />
                        </div>
                        {/* <div className="p-2">
                          <textarea
                            contentEditable={true}
                            cols={16}
                            rows={5}
                            className="md:hidden flex bg-[#101010]/30 focus:outline-none focus:ring  border-white/20 rounded-lg backdrop-blur-lg scrollbar-thin   justify-center items-center"
                            value={text || selectedNoteData}
                            onChange={(e) => {
                              setText(e.target.value);
                            }}
                          />
                        </div> */}
                        <div
                          onClick={(e) => handleNoteChange(note._id!)}
                          className="bg-opacity-30  w-fit mt-16 rounded-lg active:scale-105 bg-white flex p-2 justify-center items-center"
                        >
                          <button className=" text-sm select-none  text-[#dddddd] relative px-5">
                            Update Note
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog>
                  <div
                    onClick={() => {
                      setShowModal(true);
                      console.log("note.topic", note.topic);
                      setSelectedNote(note.topic);
                      setSelectedNoteData(note.note);
                    }}
                    className="bg-[#212121] cursor-pointer w-full h-40 overflow-y-auto p-4 space-y-5  rounded-lg"
                  >
                    <div>
                      <h1 className="border-b w-fit cursor-text font-semibold text-lg">
                        {note.topic}
                      </h1>
                    </div>
                    <div>
                      <div
                        className="cursor-text"
                        dangerouslySetInnerHTML={{ __html: note.note }}
                      />
                    </div>
                  </div>
                </>
              ))}
            </div>

            <Dialog isOpen={showAddNotesModal} onClose={setShowAddNotesModal}>
              {
                <Notes
                  setNotes={setNotesList}
                  setDummyNote={setDummyNote}
                  notes={notes}
                  categories={categories}
                  close={setShowAddNotesModal}
                />
              }
            </Dialog>

            <Dialog isOpen={showPromptModal} onClose={setShowPromptModal}>
              <div className="flex w-[50vw]  p-5 h-[30vw] mt-[-10vw] rounded-xl bg-[#101010] flex-col ">
                <div className="flex flex-col  items-center justify-center">
                  <h1 className="text-[2vw] my-2  text-white text-center ">
                    BoonBot
                  </h1>
                  <div className="w-44 h-[0px] border border-neutral-400"></div>
                </div>
                <div className="flex justify-center mt-7 text-center items-center">
                  <div
                    className={`${
                      pageposition === 0 ? "pageentry " : "pageexit"
                    } text-center`}
                  >
                    <h2 className="text-[1.3vw]  mt-6 my-2 font-fontspring  text-white font-medium ">
                      How are you feeling today?
                    </h2>
                    <div className="p-2 flex flex-row    gap-x-5">
                      <div className="flex items-center justify-center flex-row gap-x-3">
                        <Checkbox
                          className="mb-5  mt-5 px-5 rounded-3xl bg-[#1212136c]  py-5"
                          isSelected={
                            userprompt.mood && userprompt.mood === "Unmotivated"
                              ? true
                              : false
                          }
                          onChange={() => handlechange("Unmotivated")}
                          color="gradient"
                          labelColor="warning"
                        >
                          <h4 className="text-gray-300 md:text-[1.1vw]    text-[3vw] ">
                            Unmotivated
                          </h4>
                        </Checkbox>
                        <Checkbox
                          className="mb-5  mt-5 px-5 rounded-3xl bg-[#1212136c]  py-5"
                          isSelected={
                            userprompt.mood && userprompt.mood === "Great"
                              ? true
                              : false
                          }
                          onChange={() => handlechange("Great")}
                          color="gradient"
                          labelColor="warning"
                        >
                          <h4 className="text-gray-300 md:text-[1.1vw]    text-[3vw] ">
                            Great
                          </h4>
                        </Checkbox>
                        <Checkbox
                          className="mb-5  mt-5 px-5 rounded-3xl bg-[#1212136c]  py-5"
                          isSelected={
                            userprompt.mood && userprompt.mood === "Stressed"
                              ? true
                              : false
                          }
                          onChange={() => handlechange("Stressed")}
                          color="gradient"
                          labelColor="warning"
                        >
                          <h4 className="text-gray-300 md:text-[1.1vw]    text-[3vw] ">
                            Stressed
                          </h4>
                        </Checkbox>
                        <Checkbox
                          className="mb-5  mt-5 px-5 rounded-3xl bg-[#1212136c]  py-5"
                          isSelected={
                            userprompt.mood && userprompt.mood === "Normal"
                              ? true
                              : false
                          }
                          onChange={() => handlechange("Normal")}
                          color="gradient"
                          labelColor="warning"
                        >
                          <h4 className="text-gray-300 md:text-[1.1vw]    text-[3vw] ">
                            Normal
                          </h4>
                        </Checkbox>
                      </div>
                    </div>
                    {empty && "Please Pick one of the options"}
                  </div>
                  <div
                    className={`${
                      pageposition === 1 ? " pageentry " : "pageexit "
                    } text-center`}
                  >
                    <h2 className="text-[1.3vw]  my-2 font-fontspring  text-white font-medium ">
                      What do you want to get done?
                    </h2>
                    <div className="p-2 flex flex-row w-[30vw]   gap-x-5">
                      <textarea
                        name="prompt"
                        placeholder="I want to do trignometry 1 and magnetism for AP..."
                        id="prompt"
                        onChange={(e) =>
                          setUserprompt({
                            ...userprompt,
                            objective: e.target.value,
                          })
                        }
                        className="border-none  text-xl font-poppins w-[30vw]  bg-[#232222]"
                      ></textarea>
                    </div>
                    {empty && "Please enter atleast a sentence"}
                  </div>
                  <div
                    className={`${
                      pageposition === 2 ? " pageentry " : "pageexit "
                    } text-center`}
                  >
                    <h2 className="text-[1.3vw]  my-2 font-fontspring  text-white font-medium ">
                      How much time do you have?
                    </h2>
                    <div className="p-2 flex flex-row  w-[30vw]  gap-x-5">
                      <textarea
                        placeholder="I got 5 hours until i fly to las vegas..."
                        name="prompt"
                        id="prompt"
                        onChange={(e) =>
                          setUserprompt({ ...userprompt, time: e.target.value })
                        }
                        className="border-none  text-xl font-poppins w-[30vw]  bg-[#232222]"
                      ></textarea>
                    </div>
                    {empty && "Please enter atleast a sentence"}
                  </div>
                  <div
                    className={`${
                      pageposition === 3 ? " pageentry " : "pageexit "
                    } text-center`}
                  >
                    <h2 className="text-[1.3vw] mt-6 my-2 font-fontspring  text-white font-medium ">
                      Generate Your Roadmap
                    </h2>
                    <div className="p-2 flex flex-row  w-[30vw] justify-center items-center">
                      <div className="flex flex-row gap-x-4 items-center justify-center">
                        <button
                          onClick={() => setShowPromptModal(false)}
                          className="py-2 px-4 my-2 bg-white text-black rounded-3xl font-poppins text-[0.9vw]"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => {
                            fetchRoadmap(
                              userprompt.mood,
                              userprompt.objective,
                              userprompt.time
                            );
                            handlenextpage();
                          }}
                          className="py-2 px-4 my-2 bg-white text-black rounded-3xl font-poppins text-[0.9vw]"
                        >
                          Generate Now
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${
                      pageposition === 4 ? " pageentry " : "pageexit "
                    } text-center`}
                  >
                    <h2 className="text-[1.3vw] mt-6 my-2 font-fontspring  text-white font-medium ">
                      Here's your schedule
                    </h2>
                    {susdata ? (
                      <div className="p-2 flex flex-row  w-[30vw] justify-center items-center">
                        <div className="space-y-2">
                          <>
                            {/* @ts-ignore */}
                            {susdata.roadmap.map((roadmaps: any) => (
                              <div className="space-y-5 flex justify-start h-full">
                                {roadmaps.title}
                              </div>
                            ))}
                          </>
                        </div>
                        <div
                          onClick={() => {
                            // @ts-ignore
                            susdata.roadmap.map((roadmaps: any) => {
                              addGoalDataSchedule(roadmaps.title);
                            });
                          }}
                          className="mt-5 border w-fit p-2 rounded-lg cursor-pointer"
                        >
                          Add to todos
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {pageposition !== 4 ? (
                <div className="flex flex-row  items-center justify-between">
                  <div className="flex flex-row items-start justify-start">
                    {pageposition ? (
                      <button
                        onClick={() => handlepreviouspage()}
                        className="py-2 fade px-4 my-2 bg-white text-black rounded-3xl font-poppins text-[0.9vw]"
                      >
                        {"<-"} Back
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowPromptModal(false)}
                        className="py-2 px-4 my-2 bg-white text-black rounded-3xl font-poppins text-[0.9vw]"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                  <div className="flex flex-row items-end justify-end">
                    <button
                      onClick={() =>
                        pageposition === 0 && !userprompt.mood
                          ? setEmpty(true)
                          : pageposition === 1 &&
                            (!userprompt.objective ||
                              userprompt.objective.length < 30)
                          ? setEmpty(true)
                          : pageposition === 2 &&
                            (!userprompt.time || userprompt.time.length < 2)
                          ? setEmpty(true)
                          : handlenextpage()
                      }
                      className="py-2 px-4 my-2 bg-white text-black rounded-3xl font-poppins text-[0.9vw]"
                    >
                      Next {"->"}
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </Dialog>
            <Dialog
              isOpen={showBoonIslandModal}
              onClose={setShowBoonIslandModal}
            >
              <div className="flex w-[94.3vw] ml-[-21vw] mt-[5.2vw]  h-[48vw] items-center justify-center  rounded-xl  flex-col ">
                {boonisland && (
                  <Loading className="mt-[10vw]" color={"white"} />
                )}

                <div className="flex z-50 cursor-pointer  text-center items-center">
                  <Island
                    setShowBoonIslandModal={setShowBoonIslandModal}
                    users={users}
                  />
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const users = await fetchUsers();
  const goals = await fetchGoals();
  const notes = await fetchNotes();

  return {
    props: {
      users,
      goals,
      notes,
    },
  };
};

const WorkspacePage = ({ users, goals, notes, setLoading }: Props) => {
  return (
    <Layout
      setLoading={setLoading}
      bgColor={"#121212"}
      icon="workspace.svg"
      goals={goals}
      users={users}
      text="Workspace"
      border="gray-500"
      hasBg={false}
    >
      <Home users={users} goals={goals} notes={notes} />
    </Layout>
  );
};

export default WorkspacePage;
