import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { useDispatch } from "react-redux";

import Layout from "../components/Layout/Layout";
import Discover from "../components/lofi/components/Discover";
import { Goals, Notes, User } from "../typings";
import { fetchUsers } from "../utils/fetchUsers";
import MusicPlayer from "../components/lofi/MusicPlayer";
import { setActiveSong, setIsPlaying } from "../redux/features/playerSlice";
import Clock from "../components/Clock/Clock";
import TodoList from "../components/TodoList/TodoList";
import { fetchNotes } from "../utils/fetchNotes";
import { fetchGoals } from "../utils/fetchGoals";
import LofiTodo from "../components/TodoList/LofiTodo";
import Draggable, { DraggableCore } from "react-draggable";
import Notess from "../components/Notes/Notes";

import Dialog from "../components/ChapterPopup/ChapterPopup";
import dynamic from "next/dynamic";

import LofiNotes from '../components/Notes/LofiNotes'

interface Props {
  users: User[];
  goals: Goals[];
  notes: Notes[];
  setLoading?: (value: boolean) => void;
}
const lofi = ({ users, goals, notes, setLoading }: Props) => {
  const dispatch = useDispatch();
  const [goal, setGoal] = useState<Goals[]>(goals);
  const [tempTodo, setTemptodo] = useState<any>(null);
  const [notesList, setNotesList] = useState<any[]>([]);
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const [sessionStarted, setSessionStarted] = useState(false);
  const { activeSong, isPlaying } = useSelector((state: any) => state.player);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timespent, setTimespent] = useState(0);
  const [todos, setTodos] = useState<any[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState("");

  const ReactQuill = dynamic(import("react-quill"), { ssr: false });

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

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    const hours = Math.floor(seconds / 3600);
    const rm = seconds % 3600;

    const minutes = Math.floor(rm / 60);
    const _seconds = seconds % 60;
    setTime(
      `${hours > 0 ? hours + " h" : ""}  ${
        minutes > 0 ? minutes + " m" : ""
      }  ${_seconds > 0 ? _seconds + " s" : ""}`
    );
  }, [seconds]);

  const match = users.filter(
    (_users) => _users.email === user?.emailAddresses[0].emailAddress
  );

  const calculatePoints = (timeSpentInSeconds: number) => {
    const pointsPerSecond = 0.1; // change this value to adjust point earning rate
    const earnedPoints = Math.floor(timeSpentInSeconds * pointsPerSecond);
    return earnedPoints;
  };

  // @ts-ignore

  const handleStart = () => {
    setSessionStarted(true);
    // @ts-ignore
    setStartTime(new Date());
  };
  const handleStop = () => {
    setSessionStarted(false);
    // @ts-ignore
    setEndTime(new Date());
    const earnedPoints = calculatePoints(seconds);
    const points = Number(match[0]?.focus) + earnedPoints;

    const postUser = async () => {
      const userInfo: User = {
        _id: match[0]?._id,
        focus: points.toString(),
      };
      const result = await fetch(`/api/addPoints`, {
        body: JSON.stringify(userInfo),
        method: "POST",
      });

      const json = await result.json();
      return json;
    };
    postUser();
    console.log("posted 2 you gained points ", earnedPoints);
  };

  const notess = notes.filter(
    (note) => note.email === user?.emailAddresses[0].emailAddress
  );
  const [selectedCategory, setSelectedCategory] = useState("");

  let categories = new Set();
  notess.forEach((note) => {
    categories.add(note.category);
  });

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const filteredNotes = notess.filter(
    (note) => selectedCategory === "" || note.category === selectedCategory
  );

  const [selectedNote, setSelectedNote] = useState("");
  const [selectedNoteData, setSelectedNoteData] = useState("");

  const [text, setText] = useState("");
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
    return json;
  };
  const [showModal, setShowModal] = React.useState(false);
  const showNote = () => {
    setShowModal(true);
  };
  console.log(notess);
  const [showAddNotesModal, setShowAddNotesModal] = useState(false);

  const handleAddingNewNote = () => {
    setShowAddNotesModal(true);
  };

  const [dummyNote, setDummyNote] = useState<any>(null);


  return (
    <>
      <Layout
        hasBg={true}
        bgColor={"#121212"}
        icon="workspace.svg"
        text="Lofi"
        border={"#ccc"}
        children={
          <div className="w-full h-screen text-[#000000]">
            <div className="flex items-center justify-center w-full h-full flex-col gap-10">
              {sessionStarted && (
                <>
                  <Discover />
                  {seconds > 0 && (
                    <div className="absolute right-4 top-16 h-20 w-20 rounded-full bg-[#D9D9D9] p-4 flex items-center justify-center">
                      {time}time
                    </div>
                  )}
                </>
              )}
              {/* <Clock /> */}
              <Draggable>
                <div className="top-36 right-10 absolute">
                  <LofiTodo todos={todos} user={user} setTodos={setTodos} />
                </div>
              </Draggable>

              <Draggable>
                <div className="top-36 right-50 absolute">
                <LofiNotes notes={notes} user={user} setNotes={setNotesList}/>
                </div>
              </Draggable>


              {/* <Draggable>
              <div className="top-36 right-10 absolute">
                <div className="flex justify-center w-full gap-1 relative items-center">
                  <div className="flex items-center gap-2 col-span-2 justify-end w-full">
                    <div className="w-full"></div>
                    <div className="flex justify-between w-full mr-[10vw] mt-[20vh] bg-white">
                      <CategoryDropdown
                        categories={categories}
                        handleCategoryChange={handleCategoryChange}
                      />
                    </div>
                    <div
                      onClick={handleAddingNewNote}
                      className="mr-[50vw] mt-[30vh] bg-opacity-30 rounded-sm w-fit bg-white self-center flex flex-row justify-center gap-1 h-10 items-center px-[10px] py-2 border rounded m-3 ml-auto"
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center w-full h-full gap-3">
                  {filteredNotes.map((note) => (
                    <>
                      <Dialog isOpen={showModal} onClose={setShowModal}>
                        <div className="rounded-xl scale-150 md:scale-100 bg-[#101010] p-2 w-full h-full  md:p-16">
                          <div className=" md:h-[43px] text-white md:text-3xl  text-sm font-semibold">
                            {selectedNote}
                          </div>
                          <div className="md:w-44 h-[0px] w-full border border-neutral-400"></div>
                          <div className="scale-75 md:scale-100 w-full h-full text-sm">
                            <ReactQuill
                              theme="snow"
                              className="h-64 md:mt-5 mt-0  !border-none !outline-none  !text-xs  scrollbar scrollbar-track-white scrollbar-thumb-blue-50"
                              value={text || selectedNoteData}
                              onChange={(e) => {
                                setText(e);
                                handleNoteChange(note._id!);
                              }}
                            />
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
                        className="bg-[#212121] p-4 space-y-5 w-full rounded-lg"
                      >
                        <div>
                          <h1 className="border-b w-fit">{note.topic}</h1>
                        </div>
                        <div>
                          <div
                            dangerouslySetInnerHTML={{ __html: note.note }}
                          />
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <Dialog isOpen={showAddNotesModal} onClose={setShowAddNotesModal}>
                {
                  <Notess
                    setNotes={setNotesList}
                    setDummyNote={setDummyNote}
                    notes={notes}
                    close={setShowAddNotesModal}
                  />
                }
              </Dialog>
              </div>
              </Draggable> */}

              

              <div className="w-fit absolute bottom-10 right-4 h-fit space-y-5 px-5 py-3 bg-white bg-opacity-30 rounded-[5px] border border-white border-opacity-50 backdrop-blur-[30px]">
                <div className="flex gap-4 justify-center items-center ">
                  <div className="bg-white bg-opacity-30 p-4 rounded backdrop-blur-lg">
                    <img
                      id="todo"
                      className="w-7 h-7 relative"
                      src="https://cdn.discordapp.com/attachments/1045236840220860468/1158382223075065937/image.png?ex=651c0b03&is=651ab983&hm=e0c1b35db7758a487d8540e5c4fe76725ff42c4491b3d40cc75d01c819657b95&"
                    />
                  </div>
                  <div className="bg-white bg-opacity-30 p-4 rounded backdrop-blur-lg">
                    <img
                      id="notes"
                      className="w-7 h-7 relative"
                      src="https://cdn.discordapp.com/attachments/1045236840220860468/1158378707078099046/image.png?ex=651c07bd&is=651ab63d&hm=16d72c47a38143065332b826d2feb836e28bb21a330bd385d8371f14b28d8840&"
                    />
                  </div>
                  <div className="bg-white bg-opacity-30 p-4  flex items-center justify-center h-14 w-14 rounded backdrop-blur-lg">
                    <div className="w-5 bg-white h-[3px]" />
                  </div>
                </div>
                <div className="flex gap-4  items-center">
                  <div className="bg-white bg-opacity-30 p-4 rounded backdrop-blur-lg">
                    <img
                      className="w-7 h-7 relative"
                      src="https://cdn.discordapp.com/attachments/1045236840220860468/1158378707078099046/image.png?ex=651c07bd&is=651ab63d&hm=16d72c47a38143065332b826d2feb836e28bb21a330bd385d8371f14b28d8840&"
                    />
                  </div>
                </div>
              </div>
              <button
                className="bg-[#D9D9D9] bg-opacity-50 border-white border text-white w-1/5 rounded p-4 cursor-pointer"
                onClick={sessionStarted ? handleStop : handleStart}
              >
                {sessionStarted ? "Stop Session" : "Start Session"}
              </button>
            </div>

            {activeSong?.title && (
              <div className="absolute z-50 h-28 w-4/5 bottom-0  right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl ">
                <MusicPlayer />
              </div>
            )}
          </div>
        }
      />
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

export default lofi;
