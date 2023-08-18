import React, { useEffect, useState } from "react";
import Main from "../components/dashboard/Main";
import Header from "../components/dashboard/Main";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/Navbar";
import { GetServerSideProps } from "next";
import { fetchUsers } from "../utils/fetchUsers";
import { GoalBody, Goals, Notes, User } from "../typings";
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

const Home = ({ users, goals, notes, setLoading }: Props) => {

  // const { activeSong } = useSelector((state: any) => state.player);
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <div>Loading</div>;
  }

  setLoading ? setLoading(true) : "";
  const [goal, setGoal] = useState<Goals[]>(goals);
  const router = useRouter();
  const match = users.filter(
    (userss) => userss.email == user?.emailAddresses[0].emailAddress
  );
  const [todos, setTodos] = useState<any[]>([]);

  const [tempTodo, setTemptodo] = useState<any>(null);

  console.log(goals);

  useEffect(() => {
    setTodos(goals.filter((goal) => goal.username == user?.username));
    if (user && !match[0].categories) {
      // router.push("/categories");
    } else {
      null;
    }
    setLoading ? setLoading(false) : "";
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
          className={`${t.visible ? "animate-enter" : "animate-leave"
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

  const notess = notes.filter(
    (note) => note.email === user?.emailAddresses[0].emailAddress
  );

  const [desc, setDesc] = useState("");
  const [data, setData] = useState<datatype>();
  const [show, setShow] = useState(false);
  const refreshTodo = async () => {
    const todo = await fetchGoals();
    todo;
  };
  const fetchRoadmap = async (e: any) => {
    // e.preventDefault();

    setShow(true);

    const result = await fetch(`/api/roadmap/schedule?title=${desc}`);

    const json = await result.json();
    setData(json);
    setShow(false);
    return json;
  };
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
  const handleprompt = () => { };
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

  const [selectedOption, setSelectedOption] = useState("");

  const [todoText, setTodoText] = useState("");

  const handleOptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
  };

  const [showBoonIslandModal, setShowBoonIslandModal] = useState(false);
  const [boonisland, setBoonisland] = useState(false)
  const load = () => {
    setShowBoonIslandModal(true)
    setBoonisland(true)
    setTimeout(() => {
      setBoonisland(false)
    }, 1000);
  }

  return (
    <>

      <div className="overflow-y-visible bg-[#101010] fade flex mt-[40px] flex-row justify-end relative font-sans w-full items-start">
        <div className="flex font-fontspring flex-col justify-start  gap-x-4 gap-y-5 relative w-full  items-end">
          <div className="flex flex-row justify-start gap-x-5 relative w-full items-center  mr-5">
            <div className="flex flex-col justify-start gap-y-5 relative w-1/3 items-center">
              <TodoList todos={todos} user={user} setTodos={setTodos} />

              <div className=" bg-[#191919] flex flex-col justify-start gap-2 relative w-full h-[12.3vw] shrink-0 items-center pt-4 pb-3  rounded-lg">
                <div className="whitespace-nowrap text-[23px] font-sans text-white relative">
                  AI SCHEDULE GENERATOR
                </div>
                <div className="mb-2 relative w-40 h-px shrink-0 " />
                <div className="text-center font-poppins text-[15px]  text-white mb-2 relative w-3/4">
                  The AI schedule generator analyzes preferences, constraints, and
                  resources to create optimized schedules, maximizing efficiency
                  and productivity.
                </div>
                <div className="bg-gradient-to-r border-gray-500 from-gray-300 w-10/12 flex flex-col justify-start relative h-12 shrink-0 items-center py-3 border rounded">
                  <button
                    onClick={() => setShowPromptModal(true)}
                    className="rounded-xl cursor-pointer whitespace-nowrap text-[15px] font-sans text-[#dddddd] relative mx-24"
                  >
                    Generate Now
                  </button>
                </div>
              </div>
            </div>
<<<<<<< HEAD
            <img
              src="https://file.rendit.io/n/JmNhUvsva3wm0ElTUHoF.svg"
              className="min-h-0 min-w-0 relative w-4 shrink-0"
            />
          </div>

          <div className="border-solid border-gray-500 border   mb-3 relative w-40 h-px  shrink-0 " />
          <div className="flex flex-row transition-all justify-center items-center w-full gap-x-3">
            <div className="self-start hoverpop  flex flex-col justify-start mb-4 gap-2 relative w-1/4 items-center">
              <div
                onClick={() => setShowModal(true)}
                className="bg-[#212121] flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
              >
                <div className="text-center whitespace-nowrap text-[20px]  text-white relative">
                  Chapter 1
                </div>
                <div className="w-24 h-[0px] border border-neutral-400"></div>
                <div className="border-solid border-gray-700  relative w-12  shrink-0 mb-1 ml-px bordert borderb-0 borderx-0" />

                <div className="text-[15px]   text-[#dddddd] self-center relative w-full">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequatDuis aute irure
                  dolor in reprehenderit in...
                </div>
=======
            <div className=" bg-[#191919] flex flex-col items-stretch justify-start relative w-2/3 h-[31.5vw] py-3  rounded-lg">
              <div className="whitespace-nowrap text-[23px] text-center font-sans text-white relative">
                BOON ISLAND
>>>>>>> 6478151d24861461f4539df20a0fdfe20772d458
              </div>

              <div
                className="grow flex "
                onClick={() => load()}
              >
                {/* display the image of the current level of boon island, static image to avoid long loading */}
              </div>
            </div>
          </div>
<<<<<<< HEAD
          <div className="flex flex-row transition-all justify-center items-center w-full gap-x-3">
            <div className="self-start hoverpop flex flex-col justify-start mb-4 gap-2 relative w-1/4 items-center">
              <div
                onClick={() => setShowModal(true)}
                className="bg-[#212121] flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
              >
                <div className="text-center whitespace-nowrap text-[20px]  text-white relative">
                  Chapter 1
                </div>
                <div className="w-24 h-[0px] border border-neutral-400"></div>
                <div className="border-solid border-gray-700  relative w-12  shrink-0 mb-1 ml-px bordert borderb-0 borderx-0" />

                <div className="text-[15px]   text-[#dddddd] self-center relative w-full">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequatDuis aute irure
                  dolor in reprehenderit in...
                </div>
=======
          <div className="  bg-[#191919] flex  flex-col  mr-5 gap-y-3 relative w-full items-center   rounded-lg justify-center overflow-y-visible ">
            <div className="flex flex-row justify-start gap-1 relative w-16 items-center">
              <div className="text-[23px] text-white  pt-3 top-0 sticky ">
                NOTES
>>>>>>> 6478151d24861461f4539df20a0fdfe20772d458
              </div>
              <img
                src="https://file.rendit.io/n/JmNhUvsva3wm0ElTUHoF.svg"
                className="min-h-0 min-w-0 relative w-4 shrink-0"
              />
            </div>

            <div className="border-solid border-gray-500 border   mb-3 relative w-40 h-px  shrink-0 " />
            <div className="flex flex-row  justify-center items-center w-full gap-x-3">
              <div className="self-start hoverpop  flex flex-col justify-start mb-4 gap-2 relative w-1/4 items-center">
                <div
                  onClick={() => setShowModal(true)}
                  className="bg-[#212121] flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
                >
                  <div className="text-center whitespace-nowrap text-[20px]  text-white relative">
                    Chapter 1
                  </div>
                  <div className="w-24 h-[0px] border border-neutral-400"></div>
                  <div className="border-solid border-gray-700  relative w-12  shrink-0 mb-1 ml-px bordert borderb-0 borderx-0" />

                  <div className="text-[15px]   text-[#dddddd] self-center relative w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequatDuis aute irure
                    dolor in reprehenderit in...
                  </div>
                </div>
              </div>
              <div className="self-start hoverpop flex flex-col justify-start mb-4 gap-2 relative w-1/4 items-center">
                <div
                  onClick={() => setShowModal(true)}
                  className="bg-[#212121] flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
                >
                  <div className="text-center whitespace-nowrap text-[20px]  text-white relative">
                    Chapter 1
                  </div>
                  <div className="w-24 h-[0px] border border-neutral-400"></div>
                  <div className="border-solid border-gray-700  relative w-12  shrink-0 mb-1 ml-px bordert borderb-0 borderx-0" />

                  <div className="text-[15px]   text-[#dddddd] self-center relative w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequatDuis aute irure
                    dolor in reprehenderit in...
                  </div>
                </div>
              </div>
              <div className="self-start hoverpop flex flex-col justify-start mb-4 gap-2 relative w-1/4 items-center">
                <div
                  onClick={() => setShowModal(true)}
                  className="bg-[#212121] flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
                >
                  <div className="text-center whitespace-nowrap text-[20px]  text-white relative">
                    Chapter 1
                  </div>
                  <div className="w-24 h-[0px] border border-neutral-400"></div>
                  <div className="border-solid border-gray-700  relative w-12  shrink-0 mb-1 ml-px bordert borderb-0 borderx-0" />

                  <div className="text-[15px]   text-[#dddddd] self-center relative w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequatDuis aute irure
                    dolor in reprehenderit in...
                  </div>
                </div>
              </div>
            </div>
<<<<<<< HEAD
          </div>
          <div className="flex flex-row transition-all  justify-center items-center w-full gap-x-3">
            <div className="self-start hoverpop flex flex-col justify-start mb-4 gap-2 relative w-1/4 items-center">
              <div
                onClick={() => setShowModal(true)}
                className="bg-[#212121] flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
              >
                <div className="text-center whitespace-nowrap text-[20px]  text-white relative">
                  Chapter 1
                </div>
                <div className="w-24 h-[0px] border border-neutral-400"></div>
                <div className="border-solid border-gray-700  relative w-12  shrink-0 mb-1 ml-px bordert borderb-0 borderx-0" />

                <div className="text-[15px]   text-[#dddddd] self-center relative w-full">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequatDuis aute irure
                  dolor in reprehenderit in...
=======
            <div className="flex flex-row  justify-center items-center w-full gap-x-3">
              <div className="self-start hoverpop flex flex-col justify-start mb-4 gap-2 relative w-1/4 items-center">
                <div
                  onClick={() => setShowModal(true)}
                  className="bg-[#212121] flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
                >
                  <div className="text-center whitespace-nowrap text-[20px]  text-white relative">
                    Chapter 1
                  </div>
                  <div className="w-24 h-[0px] border border-neutral-400"></div>
                  <div className="border-solid border-gray-700  relative w-12  shrink-0 mb-1 ml-px bordert borderb-0 borderx-0" />

                  <div className="text-[15px]   text-[#dddddd] self-center relative w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequatDuis aute irure
                    dolor in reprehenderit in...
                  </div>
>>>>>>> 6478151d24861461f4539df20a0fdfe20772d458
                </div>
              </div>
              <div className="self-start hoverpop flex flex-col justify-start mb-4 gap-2 relative w-1/4 items-center">
                <div
                  onClick={() => setShowModal(true)}
                  className="bg-[#212121] flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
                >
                  <div className="text-center whitespace-nowrap text-[20px]  text-white relative">
                    Chapter 1
                  </div>
                  <div className="w-24 h-[0px] border border-neutral-400"></div>
                  <div className="border-solid border-gray-700  relative w-12  shrink-0 mb-1 ml-px bordert borderb-0 borderx-0" />

                  <div className="text-[15px]   text-[#dddddd] self-center relative w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequatDuis aute irure
                    dolor in reprehenderit in...
                  </div>
                </div>
              </div>
              <div className="self-start hoverpop flex flex-col justify-start mb-4 gap-2 relative w-1/4 items-center">
                <div
                  onClick={() => setShowModal(true)}
                  className="bg-[#212121] flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
                >
                  <div className="text-center whitespace-nowrap text-[20px]  text-white relative">
                    Chapter 1
                  </div>
                  <div className="w-24 h-[0px] border border-neutral-400"></div>
                  <div className="border-solid border-gray-700  relative w-12  shrink-0 mb-1 ml-px bordert borderb-0 borderx-0" />

                  <div className="text-[15px]   text-[#dddddd] self-center relative w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequatDuis aute irure
                    dolor in reprehenderit in...
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row  justify-center items-center w-full gap-x-3">
              <div className="self-start hoverpop flex flex-col justify-start mb-4 gap-2 relative w-1/4 items-center">
                <div
                  onClick={() => setShowModal(true)}
                  className="bg-[#212121] flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
                >
                  <div className="text-center whitespace-nowrap text-[20px]  text-white relative">
                    Chapter 1
                  </div>
                  <div className="w-24 h-[0px] border border-neutral-400"></div>
                  <div className="border-solid border-gray-700  relative w-12  shrink-0 mb-1 ml-px bordert borderb-0 borderx-0" />

                  <div className="text-[15px]   text-[#dddddd] self-center relative w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequatDuis aute irure
                    dolor in reprehenderit in...
                  </div>
                </div>
              </div>
<<<<<<< HEAD
            </div>
          </div>
          <div className="flex flex-row transition-all justify-center items-center w-full gap-x-3">
            <div className="self-start hoverpop flex flex-col justify-start mb-4 gap-2 relative w-1/4 items-center">
              <div
                onClick={() => setShowModal(true)}
                className="bg-[#212121] flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
              >
                <div className="text-center whitespace-nowrap text-[20px]  text-white relative">
                  Chapter 1
=======
              <div className="self-start hoverpop flex flex-col justify-start mb-4 gap-2 relative w-1/4 items-center">
                <div
                  onClick={() => setShowModal(true)}
                  className="bg-[#212121] flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
                >
                  <div className="text-center whitespace-nowrap text-[20px]  text-white relative">
                    Chapter 1
                  </div>
                  <div className="w-24 h-[0px] border border-neutral-400"></div>
                  <div className="border-solid border-gray-700  relative w-12  shrink-0 mb-1 ml-px bordert borderb-0 borderx-0" />

                  <div className="text-[15px]   text-[#dddddd] self-center relative w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequatDuis aute irure
                    dolor in reprehenderit in...
                  </div>
>>>>>>> 6478151d24861461f4539df20a0fdfe20772d458
                </div>
              </div>
              <div className="self-start hoverpop flex flex-col justify-start mb-4 gap-2 relative w-1/4 items-center">
                <div
                  onClick={() => setShowModal(true)}
                  className="bg-[#212121] flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
                >
                  <div className="text-center whitespace-nowrap text-[20px]  text-white relative">
                    Chapter 1
                  </div>
                  <div className="w-24 h-[0px] border border-neutral-400"></div>
                  <div className="border-solid border-gray-700  relative w-12  shrink-0 mb-1 ml-px bordert borderb-0 borderx-0" />

                  <div className="text-[15px]   text-[#dddddd] self-center relative w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequatDuis aute irure
                    dolor in reprehenderit in...
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row  justify-center items-center w-full gap-x-3">
              <div className="self-start hoverpop flex flex-col justify-start mb-4 gap-2 relative w-1/4 items-center">
                <div
                  onClick={() => setShowModal(true)}
                  className="bg-[#212121] flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
                >
                  <div className="text-center whitespace-nowrap text-[20px]  text-white relative">
                    Chapter 1
                  </div>
                  <div className="w-24 h-[0px] border border-neutral-400"></div>
                  <div className="border-solid border-gray-700  relative w-12  shrink-0 mb-1 ml-px bordert borderb-0 borderx-0" />

                  <div className="text-[15px]   text-[#dddddd] self-center relative w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequatDuis aute irure
                    dolor in reprehenderit in...
                  </div>
                </div>
              </div>
              <div className="self-start hoverpop flex flex-col justify-start mb-4 gap-2 relative w-1/4 items-center">
                <div
                  onClick={() => setShowModal(true)}
                  className="bg-[#212121] flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
                >
                  <div className="text-center whitespace-nowrap text-[20px]  text-white relative">
                    Chapter 1
                  </div>
                  <div className="w-24 h-[0px] border border-neutral-400"></div>
                  <div className="border-solid border-gray-700  relative w-12  shrink-0 mb-1 ml-px bordert borderb-0 borderx-0" />

                  <div className="text-[15px]   text-[#dddddd] self-center relative w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequatDuis aute irure
                    dolor in reprehenderit in...
                  </div>
                </div>
              </div>
              <div className="self-start hoverpop flex flex-col justify-start mb-4 gap-2 relative w-1/4 items-center">
                <div
                  onClick={() => setShowModal(true)}
                  className="bg-[#212121] flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
                >
                  <div className="text-center whitespace-nowrap text-[20px]  text-white relative">
                    Chapter 1
                  </div>
                  <div className="w-24 h-[0px] border border-neutral-400"></div>
                  <div className="border-solid border-gray-700  relative w-12  shrink-0 mb-1 ml-px bordert borderb-0 borderx-0" />

                  <div className="text-[15px]   text-[#dddddd] self-center relative w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequatDuis aute irure
                    dolor in reprehenderit in...
                  </div>
                </div>
              </div>
            </div>

            <Dialog isOpen={showModal} onClose={setShowModal}>
              <div className="rounded-xl bg-[#101010] p-16">

                <div className="w-[139px] h-[43px] text-white text-3xl font-semibold">
                  Chapter 1
                </div>
                <div className="w-44 h-[0px] border border-neutral-400"></div>
                <div className="w-full h-[579px] text-neutral-200 text-base font-medium mt-3">
                  Chapter 1Chapter 1Chapter 1Chapter 1Chapter 1Chapter 1Chapter 1Ch
                  <br />
                  apter 1Chapter 1Chapter 1Chapter{" "}
                </div>
              </div>
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
                    className={`${pageposition === 0 ? "pageentry " : "pageexit"
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
                    className={`${pageposition === 1 ? " pageentry " : "pageexit "
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
                    className={`${pageposition === 2 ? " pageentry " : "pageexit "
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
                    className={`${pageposition === 3 ? " pageentry " : "pageexit "
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
                          onClick={() => handleprompt()}
                          className="py-2 px-4 my-2 bg-white text-black rounded-3xl font-poppins text-[0.9vw]"
                        >
                          Generate Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {pageposition !== 3 ? (
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
                      ""
                    )}
                  </div>
                  <div className="flex flex-row items-end justify-end">
                    <button
                      onClick={() =>
                        pageposition === 0 && !userprompt.mood
                          ? setEmpty(true)
                          : pageposition === 1 &&
                            (!userprompt.objective ||
                              userprompt.objective.length < 40)
                            ? setEmpty(true)
                            : pageposition === 2 &&
                              (!userprompt.time || userprompt.time.length < 40)
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
            <Dialog isOpen={showBoonIslandModal} onClose={setShowBoonIslandModal}>
              <div className="flex w-[94.3vw] ml-[-21vw] mt-[5.2vw]  h-[48vw] items-center justify-center  rounded-xl  flex-col ">
                {boonisland && <Loading className="mt-[10vw]" color={"white"} />}

                <div className="flex   text-center items-center">
                  <Island setShowBoonIslandModal={setShowBoonIslandModal} users={users} />

                </div>
              </div>

            </Dialog>
          </div>
        </div>
      </div>
    </>
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

const WorkspacePage = ({ users, goals, notes }: Props) => {
  return (
    <Layout
      bgColor={"#121212"}
      icon="workspace.svg"
      text="Workspace"
      border="gray-500"
      hasBg={false}
    >
      <Home users={users} goals={goals} notes={notes} />
    </Layout>
  );
};

export default WorkspacePage;
