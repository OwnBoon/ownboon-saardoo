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
import { UserButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import {
  Button,
  Checkbox,
  Grid,
  Input,
  Progress,
  Text,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import Planet from "./tracker";
import dynamic from "next/dynamic";
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
  const { activeSong } = useSelector((state: any) => state.player);
  const { isLoaded, isSignedIn, user } = useUser();
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
  }, []);
  const [showtask, setShowTask] = useState(false);
  const [title, setTitle] = useState("");

  const addGoalData = async () => {
    try {
      const postInfo: GoalBody = {
        // @ts-ignore
        _type: "goals",
        title: title,
        progress: 0,
        username: user?.username!,
        completed: false,
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
  const addGoalDataSchedule = async (title: string) => {
    try {
      const postInfo: GoalBody = {
        // @ts-ignore
        _type: "goals",
        title: title,
        progress: 0,
        username: user?.username!,
        completed: false,
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
      <Sidebar />
      <div className="col-span-10">
        <div className="flex justify-between p-3 border-b">
          <div>Workspace</div>
          <div className="flex gap-10">
            <UserButton />
            <p>{user?.username || user?.firstName}</p>
          </div>
        </div>
        <div className="flex px-24 py-5 border-b border-black items-start justify-between ">
          <div className="justify-start   space-y-7 ">
            <div className="border rounded-lg space-y-5 overflow-y-scroll h-fit  w-full px-10 py-2">
              <p className="border-b">Todo List</p>
              {todos.map((todo) => (
                <div className="flex px-2 py-1 gap-5 rounded-lg">
                  {/* @ts-ignore */}
                  <Tooltip content="complete todos">
                    <Checkbox
                      onChange={() => addCompleted(todo._id)}
                      color="primary"
                    />
                  </Tooltip>
                  <p>{todo.title}</p>
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
                <div className="mt-10 py-10">
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
              <div className="border rounded-lg space-y-5 overflow-y-scroll h-fit  w-full px-10 py-2">
                <p className="border-b flex justify-center">Notes</p>
                <div className="space-y-16 flex  flex-col items-center">
                  {user ? (
                    <ReactQuill
                      theme="snow"
                      className="h-44   scrollbar scrollbar-track-white scrollbar-thumb-blue-50"
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
          <div className=" scale-x-100 -my-20  scale-y-75 flex items-start">
            <Planet users={users} />
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
