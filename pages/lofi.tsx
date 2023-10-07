import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import Notess from "../components/Notes/Notes";

import Dialog from "../components/ChapterPopup/ChapterPopup";
import dynamic from "next/dynamic";

import LofiNotes from "../components/Notes/LofiNotes";
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
import { Tooltip } from "@nextui-org/react";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
interface Props {
  users: User[];
  goals: Goals[];
  notes: Notes[];
  setLoading?: (value: boolean) => void;
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
const lofi = ({ users, goals, notes, setLoading }: Props) => {
  const dispatch = useDispatch();
  const [goal, setGoal] = useState<Goals[]>(goals);
  const [tempTodo, setTemptodo] = useState<any>(null);
  const [notesList, setNotesList] = useState<any[]>([]);
  const [showTodo, setShowTodo] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [toolbar, setToolbar] = useState(true);

  const [sessionStarted, setSessionStarted] = useState(false);
  const { activeSong, isPlaying } = useSelector((state: any) => state.player);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timespent, setTimespent] = useState(0);
  const [todos, setTodos] = useState<any[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState("");
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

  useEffect(() => {
    const hours = Math.floor(seconds / 3600);
    const rm = seconds % 3600;

    const minutes = Math.floor(rm / 60);
    const _seconds = seconds % 60;
    setTime(
      `${hours > 0 ? hours + " h" : ""}  ${minutes > 0 ? minutes + " m" : ""
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

  return (
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
                  <div className="absolute right-6 top-20   p-4 flex items-center justify-center">
                    <Clock />
                  </div>
                )}
              </>
            )}
            <Clock />

            <Draggable>
              <div
                className={
                  showTodo
                    ? "top-36 right-10 absolute inline transition-opacity  opacity-100 duration-150 "
                    : "top-36 right-10 absolute opacity-0 "
                }
              >
                <LofiTodo todos={todos} user={user} setTodos={setTodos} />
              </div>
            </Draggable>

            <div
              className={
                showNotes
                  ? "top-36 right-10 absolute inline transition-opacity  opacity-100 duration-150 "
                  : "top-36 right-10 absolute opacity-0 "
              }
            >
              {showNotes && (
                <LofiNotes notes={notes} user={user} setNotes={setNotesList} />
              )}
            </div>

            <Draggable>
              <div className="w-fit cursor-pointer absolute bottom-10 right-4 h-fit space-y-5 px-5 py-3 bg-white bg-opacity-30 rounded-[5px] border border-white border-opacity-50 backdrop-blur-[30px]">
                <div className="flex gap-4 justify-center items-center ">
                  <div
                    className={
                      toolbar
                        ? "bg-white cursor-pointer hover:bg-opacity-20 transition-all duration-100 active:scale-105 bg-opacity-30 p-4 rounded backdrop-blur-lg opacity-100"
                        : "hidden opacity-0"
                    }
                  >
                    <img
                      id="todo"
                      onClick={() => {
                        showTodo ? setShowTodo(false) : setShowTodo(true);
                      }}
                      className="w-7 h-7 relative select-none"
                      src="https://cdn.discordapp.com/attachments/1045236840220860468/1158382223075065937/image.png?ex=651c0b03&is=651ab983&hm=e0c1b35db7758a487d8540e5c4fe76725ff42c4491b3d40cc75d01c819657b95&"
                    />
                  </div>
                  <div
                    className={
                      toolbar
                        ? "bg-white cursor-pointer hover:bg-opacity-20 transition-all duration-100 active:scale-105 bg-opacity-30 p-4 rounded backdrop-blur-lg opacity-100"
                        : "hidden opacity-0"
                    }
                  >
                    <img
                      onClick={() => {
                        showNotes ? setShowNotes(false) : setShowNotes(true);
                      }}
                      id="notes"
                      className="w-7 h-7 relative select-none"
                      src="https://cdn.discordapp.com/attachments/1045236840220860468/1158378707078099046/image.png?ex=651c07bd&is=651ab63d&hm=16d72c47a38143065332b826d2feb836e28bb21a330bd385d8371f14b28d8840&"
                    />
                  </div>
                  <div
                    className={
                      "bg-white cursor-pointer hover:bg-opacity-20 transition-all duration-100 active:scale-105 bg-opacity-30 p-4 rounded backdrop-blur-lg   flex items-center justify-center h-[3.6rem] w-[3.6rem]"
                    }
                    onClick={() => {
                      toolbar ? setToolbar(false) : setToolbar(true);
                    }}
                  >
                    <div className="w-5 bg-white select-none h-[3px]" />
                  </div>
                </div>
                <div className="flex gap-4  items-center">
                  <Tooltip content="coming soon">
                    <div
                      className={
                        toolbar
                          ? "bg-white bg-opacity-30 p-4 rounded backdrop-blur-lg opacity-100 transition-opacity duration-100"
                          : "hidden opacity-0"
                      }
                    >
                      <img
                        className="w-7 h-7 relative select-none"
                        src="https://cdn.discordapp.com/attachments/1045236840220860468/1158378707078099046/image.png?ex=651c07bd&is=651ab63d&hm=16d72c47a38143065332b826d2feb836e28bb21a330bd385d8371f14b28d8840&"
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </Draggable>
            <button
              className="bg-[#D9D9D9] active:scale-105 transition-all Z-10 select-none duration-100 bg-opacity-10 border-opacity-50 backdrop-blur-lg border-white border text-white w-1/5 rounded p-4 cursor-pointer"
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
