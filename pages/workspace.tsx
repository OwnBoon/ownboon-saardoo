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
import Spline from "@splinetool/react-spline";
import Island from "../components/BoonIsland/Island";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
interface Props {
  users: User[];
  goals: Goals[];
  notes: Notes[];
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

const Home = ({ users, goals, notes }: Props) => {
  // const { activeSong } = useSelector((state: any) => state.player);
  const { isLoaded, isSignedIn, user } = useUser();

  const [goal, setGoal] = useState<Goals[]>(goals);
  const router = useRouter();
  const match = users.filter(
    (userss) => userss.email == user?.emailAddresses[0].emailAddress
  );
  const todos = goals.filter(
    (goal) => goal.username == user?.emailAddresses[0].emailAddress
  );
  useEffect(() => {
    if (user && !match[0].categories) {
      router.push("/categories");
    } else {
      null;
    }
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
        username: user?.emailAddresses[0].emailAddress,
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
                <p className="text-sm font-medium text-gray-900">
                  Todos Updated
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Try refreshing the page to see it!
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
        username: user?.emailAddresses[0].emailAddress!,
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
        <Loading type="default" />
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
                <p className="text-sm font-medium text-gray-900">
                  U set ur todo to not completed
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Try refreshing the page to see it!
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                <p className="text-sm font-medium text-gray-900">
                  U Deleted a todos
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Try refreshing the page to see it!
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    const mutations: Notes = {
      _type: "notes",
      note: text,
      email: user?.emailAddresses[0].emailAddress!,
    };

    const result = await fetch(`/api/addNotes`, {
      body: JSON.stringify(mutations),
      method: "POST",
    });

    const json = await result.json();
    return json;
  };
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

  useEffect(() => {
    if (data) {
      // @ts-ignore
      const roadmapdata = data?.message.choices[0].message.content;
      const fine = roadmapdata.replace("@finish", "");
      const sus = JSON.parse(fine);
      setSusData(sus);
    }
  }, [data]);
  return (
    <div className="grid grid-cols-12  overflow-y-scroll bg-[#f4f1eb]/50">
      <Head>
        <title> Dashboard @ {user?.firstName || user?.username} </title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Toaster position="top-right" reverseOrder={false} />
      <Sidebar />
      <div className="col-span-10">
        <div className="flex justify-between p-3 border-b">
          <div>Workspace</div>
          <div className="flex gap-10">
            <UserButton />
            <p>{user?.username || user?.firstName}</p>
          </div>
        </div>
        <div className="gap-20 px-16 py-5 border-b border-black items-start grid grid-cols-12 ">
          <div className="justify-start col-span-5   space-y-7 ">
            <div className="border rounded-lg space-y-5 bg-white/70 overflow-y-scroll h-72   w-full px-10 py-2">
              <h1 className="border-b sticky top-0 bg-white z-20 font-semibold ">
                Todo List
              </h1>
              {todos.map((todo) => (
                <div className="flex px-2 bg-white   gap-3 rounded-lg">
                  {/* @ts-ignore */}
                  <Tooltip content="complete todos">
                    {todo.completed ? (
                      <Checkbox
                        isSelected={true}
                        onChange={() => {
                          addUnCompleted(todo._id);
                          router.replace(router.asPath);
                        }}
                        color="primary"
                      />
                    ) : (
                      <Checkbox
                        onChange={() => {
                          addCompleted(todo._id);
                          router.replace(router.asPath);
                        }}
                        color="primary"
                      />
                    )}
                  </Tooltip>
                  <Collapse
                    className="w-full flex flex-col text-xs font-semibold items-end"
                    title={todo.title}
                  >
                    <Button
                      onPress={() => {
                        addDeleted(todo._id);
                      }}
                      bordered
                      shadow
                      size={"sm"}
                    >
                      Delete Todo
                    </Button>
                  </Collapse>
                </div>
              ))}
              <button
                className="border mt-10 px-2 py-1 rounded-lg w-full"
                onClick={(e) => {
                  showtask ? handlesubmit(e) : setShowTask(true);
                }}
              >
                + Add Task
              </button>
              {showtask ? (
                <div className="mt-10 py-3">
                  <Input
                    clearable
                    value={title}
                    underlined
                    onChange={(e) => setTitle(e.target.value)}
                    labelPlaceholder="Title"
                    className="!outline-none !border-none"
                    initialValue="eg. Add hydration state error handling"
                  />
                </div>
              ) : null}
            </div>
            <div>
              {" "}
              <div className="border   bg-white space-y-5 overflow-y-scroll h-fit  w-full px-2 rounded-xl py-2">
                <p className="border-b flex justify-center">Notes</p>
                <div className="space-y-20 flex   flex-col items-center">
                  {user ? (
                    <ReactQuill
                      theme="snow"
                      className="h-36 w-full   scrollbar scrollbar-track-white scrollbar-thumb-blue-50"
                      value={text || notess[0]?.note}
                      onChange={setText}
                    />
                  ) : null}
                  <Button onPress={handleSubmit} bordered className="mt-5">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-span-7 w-full h-full py-5 px-2 border items-center  flex flex-col  ">
            <div className=" text-lg font-sans text-black ">Boon Island</div>
            <Island users={users} />
          </div>
        </div>
        <div>
          <div>
            {" "}
            <div>
              <div className="flex flex-col p-5 w-full items-center space-y-7 justify-center">
                <Text
                  h1
                  size={52}
                  css={{
                    textGradient: "45deg, $blue600 -20%, $pink600 50%",
                  }}
                  weight="bold"
                >
                  AI Schedule Generator
                </Text>
                <Grid>
                  <Textarea
                    size="xl"
                    cols={50}
                    rows={5}
                    bordered
                    helperText="please enter a issue"
                    color="secondary"
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    labelPlaceholder="Issue description"
                  />
                </Grid>
                <Grid className="">
                  <Button
                    onPress={(e) => fetchRoadmap(e)}
                    color="gradient"
                    auto
                  >
                    Submit
                  </Button>
                </Grid>
                <div></div>
              </div>
            </div>
            {/* <DraggableRoadmap data={sampleData} /> */}
            {show ? (
              <Grid className="flex flex-col items-center">
                <Progress
                  indeterminated
                  value={50}
                  color="secondary"
                  status="secondary"
                />
                <Text color="gray" h2 size={15}>
                  takes around a minute
                </Text>
              </Grid>
            ) : (
              <Grid className="flex justify-between">
                <Text className="font-semibold" h1 size={20}>
                  Your schedule will show here
                </Text>
                {susdata ? (
                  <>
                    <Button
                      onPress={() =>
                        // @ts-ignore
                        susdata.roadmap.forEach((roadmap: RoadmapItem) =>
                          addGoalDataSchedule(roadmap.title)
                        )
                      }
                    >
                      Add Todos
                    </Button>
                  </>
                ) : null}
              </Grid>
            )}
            {susdata ? (
              <div className="p-5 flex justify-center   flex-col">
                <Text className="border-b w-fit font-semibold" h1 size={20}>
                  You can start your schedule by:
                </Text>
                {/* @ts-ignore */}
                {susdata.roadmap.map((roadmaps: RoadmapItem) => (
                  <div>
                    <li className="py-1">{roadmaps.title}</li>
                  </div>
                ))}
              </div>
            ) : null}
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
export default Home;
