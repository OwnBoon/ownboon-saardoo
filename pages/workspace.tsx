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
  setLoading ? setLoading(true) : "";
  const [goal, setGoal] = useState<Goals[]>(goals);
  const router = useRouter();
  const match = users.filter(
    (userss) => userss.email == user?.emailAddresses[0].emailAddress
  );
  const todos = goals.filter((goal) => goal.username == user?.username);
  useEffect(() => {
    if (user && !match[0].categories) {
      router.push("/categories");
    } else {
      null;
    }
    setLoading ? setLoading(false) : "";
  }, []);
  const [showtask, setShowTask] = useState(false);
  const [title, setTitle] = useState("");

  const refreshGoals = async () => {
    const goals: Goals[] = await fetchGoals();
    setGoal(goals);
  };

  const addGoalData = async () => {
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
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full  bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
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
                  Todos Updated
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

      console.log(json);

      return json;
    } catch (err) {
      console.error(err);
    }
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

  const handlesubmit = (e: any) => {
    e.preventDefault();
    addGoalData();
    setShowTask(false);
    setTitle("");
    router.replace(router.asPath);
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
  const addDeleted = async (id: string | undefined) => {
    try {
      const postInfo = {
        // @ts-ignore
        _id: id,
      };
      const result = await fetch(`/api/deleteGoals`, {
        body: JSON.stringify(postInfo),
        method: "POST",
      });
      const json = await result.json();
      console.log(json);
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
                  U Deleted a todos
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
      return json;
    } catch (err) {
      console.error(err);
    }
  };
  const notess = notes.filter(
    (note) => note.email === user?.emailAddresses[0].emailAddress
  );

  // const handleSubmit = async (e: any) => {
  //   // e.preventDefault();
  //   const mutations: Notes = {
  //     _type: "notes",
  //     topic: '',
  //     note: text,
  //     email: user?.emailAddresses[0].emailAddress!,
  //   };

  //   const result = await fetch(`/api/addNotes`, {
  //     body: JSON.stringify(mutations),
  //     method: "POST",
  //   });

  //   const json = await result.json();
  //   return json;
  // };
  const [visible, setVisible] = useState(false);
  const [texts, setTexts] = useState("");
  const [stuff, setStuff] = useState("");
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
  const [showPromptModal, setShowPromptModal] = useState(false)

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

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(temptodos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTemptodos(items);
  };

  // sample way to add dragable functionality todo list
  //   import React, { useState } from 'react';
  // import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

  // const TodoList = () => {
  //   const [todos, setTodos] = useState([
  //     { id: '1', text: 'Task 1' },
  //     { id: '2', text: 'Task 2' },
  //     { id: '3', text: 'Task 3' },
  //   ]);

  //   const handleDragEnd = (result) => {
  //     if (!result.destination) return;

  //     const items = Array.from(todos);
  //     const [reorderedItem] = items.splice(result.source.index, 1);
  //     items.splice(result.destination.index, 0, reorderedItem);

  //     setTodos(items);
  //   };

  //   return (
  //     <DragDropContext onDragEnd={handleDragEnd}>
  //       <Droppable droppableId="todos">
  //         {(provided) => (
  //           <ul {...provided.droppableProps} ref={provided.innerRef}>
  //             {todos.map((todo, index) => (
  //               <Draggable key={todo.id} draggableId={todo.id} index={index}>
  //                 {(provided) => (
  //                   <li
  //                     {...provided.draggableProps}
  //                     {...provided.dragHandleProps}
  //                     ref={provided.innerRef}
  //                   >
  //                     {todo.text}
  //                   </li>
  //                 )}
  //               </Draggable>
  //             ))}
  //             {provided.placeholder}
  //           </ul>
  //         )}
  //       </Droppable>
  //     </DragDropContext>
  //   );
  // };

  // export default TodoList;
  return (
    <div className="overflow-y-visible bg-[#101010] fade flex mt-[30px] flex-row justify-end relative font-sans w-full items-start">
      <div className="flex font-fontspring flex-col justify-start  gap-x-4 gap-y-3 relative w-full  items-end">
        <div className="flex flex-row justify-start gap-3 relative w-full items-center  mr-5">
          <div className="flex flex-col justify-start gap-y-2 relative w-1/3 items-center">
            <div className="border-solid border-gray-700 bg-gradient-to-br  flex flex-col justify-start gap-2 relative w-full h-[16vw] shrink-0 items-start pl-12 py-3 border rounded-lg">
              <div className="self-center flex flex-row justify-start gap-1 relative w-24 items-center">
                <div className="whitespace-nowrap text-[23px] font-sans text-white relative">
                  TODOS
                </div>
                <img
                  src="https://file.rendit.io/n/JmNhUvsva3wm0ElTUHoF.svg"
                  className="min-h-0 min-w-0 relative w-4 shrink-0"
                />
              </div>
              <div className="border-solid border-gray-700 self-center mb-3 relative w-40 h-px shrink-0 bordert borderb-0 borderx-0" />
              <div className="flex flex-row justify-start mb-1 gap-4 relative w-20 items-center">
                <div className="border-solid border-gray-700 mb-px relative w-6 shrink-0 h-6 border-2 rounded" />
                <div className="whitespace-nowrap  font-sans text-white relative">
                  Step 1
                </div>
              </div>
              <div className="flex flex-row justify-start mb-1 gap-4 relative w-20 items-center">
                <div className="border-solid border-gray-700 mb-px relative w-6 shrink-0 h-6 border-2 rounded" />
                <div className="whitespace-nowrap  text-[#dddddd] relative">
                  Step 1
                </div>
              </div>
              <div className="flex flex-row justify-start mb-1 gap-4 relative w-20 items-center">
                <div className="border-solid border-gray-700 mb-px relative w-6 shrink-0 h-6 border-2 rounded" />
                <div className="whitespace-nowrap  text-[#dddddd] relative">
                  Step 1
                </div>
              </div>
              <div className="flex flex-row justify-start mb-3 gap-4 relative w-20 items-center">
                <div className="border-solid border-gray-700 mb-px relative w-6 shrink-0 h-6 border-2 rounded" />
                <div className="whitespace-nowrap  text-[#dddddd] relative">
                  Step 1
                </div>
              </div>
              <div className="border-solid border-gray-500 bg-gradient-to-r from-gray-600 to-black-100 self-center flex flex-row justify-center gap-1 relative h-10 shrink-0 items-center px-[108px] py-2 border rounded">
                <img
                  src="https://file.rendit.io/n/xqvQ4cl5AoJGfD7albqE.png"
                  className="min-h-0 min-w-0 relative w-4 shrink-0"
                />
                <button className="whitespace-nowrap text-[15px] font-sans text-[#dddddd] relative">
                  Add Task
                </button>
              </div>
            </div>
            <div className="border-solid border-gray-700 bg-[rgba(51,_56,_88,_0.13)] flex flex-col justify-start gap-2 relative w-full h-[11.9vw] shrink-0 items-center pt-4 pb-3 border rounded-lg">
              <div className="whitespace-nowrap text-[23px] font-sans text-white relative">
                AI Schedule Generator
              </div>
              <div className="border-solid border-gray-700 mb-2 relative w-40 h-px shrink-0 bordert borderb-0 borderx-0" />
              <div className="text-center font-poppins text-[15px]  text-white mb-2 relative w-3/4">
                The AI schedule generator analyzes preferences, constraints, and
                resources to create optimized schedules, maximizing efficiency
                and productivity.
              </div>
              <div className="border-solid border-gray-500 bg-gradient-to-r from-gray-600 to-black-100 flex flex-col justify-start relative h-10 shrink-0 items-center py-2 border rounded">
                <button onClick={()=>setShowPromptModal(true)} className="cursor-pointer whitespace-nowrap text-[15px] font-sans text-[#dddddd] relative mx-24">
                  Generate Now
                </button>
              </div>
            </div>
          </div>
          <div className="border-solid border-gray-700 bg-[rgba(51,_56,_88,_0.13)] flex flex-col items-stretch justify-start relative w-2/3 h-[542px] py-3 border rounded-lg">
            <div className="whitespace-nowrap text-[23px] text-center font-sans text-white relative">
              Boon Island
            </div>

            <div className="grow flex ">
              {/* <Island  users={users} /> */}
              {/* display the image of the current level of boon island, static image to avoid long loading */}
            </div>
          </div>
        </div>
        <div className="border-solid border-gray-700  bg-[rgba(51,_56,_88,_0.13)] flex  flex-col  mr-5 gap-y-3 relative w-full items-center  border rounded-lg justify-center overflow-y-visible ">
          <div className="flex flex-row justify-start gap-1 relative w-16 items-center">
            <div className="text-[23px] text-white  pt-3 top-0 sticky ">
              Notes
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
                className="bg-gradient-to-br from-gray-700 to-black-400 flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
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
                className="bg-gradient-to-br from-gray-700 to-black-400 flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
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
                className="bg-gradient-to-br from-gray-700 to-black-400 flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
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
                className="bg-gradient-to-br from-gray-700 to-black-400 flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
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
                className="bg-gradient-to-br from-gray-700 to-black-400 flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
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
                className="bg-gradient-to-br from-gray-700 to-black-400 flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
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
                className="bg-gradient-to-br from-gray-700 to-black-400 flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
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
                className="bg-gradient-to-br from-gray-700 to-black-400 flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
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
                className="bg-gradient-to-br from-gray-700 to-black-400 flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
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
                className="bg-gradient-to-br from-gray-700 to-black-400 flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
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
                className="bg-gradient-to-br from-gray-700 to-black-400 flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
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
                className="bg-gradient-to-br from-gray-700 to-black-400 flex flex-col cursor-pointer h-[12.6vw]  justify-start gap-1 relative w-full items-start pt-4 pb-5 px-6   rounded-lg"
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
            <div className="w-[139px] h-[43px] text-white text-3xl font-semibold">
              Chapter 1
            </div>
            <div className="w-44 h-[0px] border border-neutral-400"></div>
            <div className="w-full h-[579px] text-neutral-200 text-base font-medium mt-3">
              Chapter 1Chapter 1Chapter 1Chapter 1Chapter 1Chapter 1Chapter 1Ch
              <br />
              apter 1Chapter 1Chapter 1Chapter{" "}
            </div>
          </Dialog>
          <Dialog isOpen={showPromptModal} onClose={setShowPromptModal}>
          <div className="flex w-[30vw] h-full pt-[-10vw]  flex-col ">
            <div className="flex flex-col p-5 items-center justify-center">
                <h1 className="text-[2vw] my-2  text-white text-center ">BoonBot</h1>
        <div className="w-44 h-[0px] border border-neutral-400"></div>
            </div>
        <h2 className="text-[1vw] my-2  text-white font-medium ">How are you feeling today?</h2>
        <textarea name="prompt" id="prompt" ></textarea>
        {/* <button className="py-2 px-4 my-2 bg-white rounded-3xl text-[0.9vw]">Coming Soon</button> */}
        </div>
          </Dialog>
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
