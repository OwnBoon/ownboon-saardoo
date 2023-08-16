import React, { useEffect, useState } from "react";
import Main from "../components/dashboard/Main";
import Header from "../components/dashboard/Main";
// import Progress from "../components/dashboard/Progress";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/Navbar";
import { GetServerSideProps } from "next";
import { fetchUsers } from "../utils/fetchUsers";
import { Goals, Notes, User, UserBody } from "../typings";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { fetchGoals } from "../utils/fetchGoals";
import { fetchNotes } from "../utils/fetchNotes";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import {
  Button,
  Grid,
  Textarea,
  Progress,
  Tooltip,
  Card,
  Checkbox,
  Row,
  Input,
  Modal,
  Loading,
} from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import {
  ArrowDownLeftIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { MdPassword } from "react-icons/md";
import ReactPlayer from "react-player";
import Head from "next/head";
import { categories } from "../utils/constants";
interface datatype {
  message: {
    response: string;
  };
}
interface Info {
  link: string;
  description: string;
}
interface Props {
  users: User[];
  goals: Goals[];
  notes: Notes[];
}

interface RoadmapItem {
  id: number;
  level: number;
  parent: number;
  title: string;
}
const Home = ({ users, goals, notes }: Props) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [desc, setDesc] = useState("");
  const [data, setData] = useState<datatype>();

  const sampledata = {
    message: {
      id: "chatcmpl-7oDdGrMYqGQ7vLhrxnA9i9yUxkV2H",
      object: "chat.completion",
      created: 1692203158,
      model: "gpt-3.5-turbo-0613",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content:
              '{"roadmap":[{"id":1,"level":0,"parent":0,"title":"Peeing Process"},{"id":2,"level":1,"parent":1,"title":"Find a suitable restroom"},{"id":3,"level":1,"parent":1,"title":"Unbutton or unzip pants"},{"id":4,"level":1,"parent":1,"title":"Pull down underwear"},{"id":5,"level":1,"parent":1,"title":"Position yourself over the toilet or urinal"},{"id":6,"level":1,"parent":1,"title":"Relax your muscles"},{"id":7,"level":1,"parent":1,"title":"Release the urine"},{"id":8,"level":1,"parent":1,"title":"Wipe or shake if necessary"},{"id":9,"level":1,"parent":1,"title":"Button or zip up pants"},{"id":10,"level":1,"parent":1,"title":"Flush the toilet if applicable"},{"id":11,"level":1,"parent":1,"title":"Wash your hands"}]}',
          },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 223,
        completion_tokens: 221,
        total_tokens: 444,
      },
    },
  };

  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const [stuff, setStuff] = useState("");
  const [loading, setLoading] = useState(false);

  const match = users.filter(
    (userss) => userss.email === user?.emailAddresses[0].emailAddress
  );
  const handler = async (texts: string) => {
    setText(texts);
    setLoading(true);
    const result = await fetch(
      `/api/roadmap/normalchat?title=${text}?categories=${categories.map(
        (cateogr) => cateogr.name
      )}`
    );
    const json = await result.json();
    // @ts-ignore
    // const deez = stuff.message.choices[0].message.content;
    // const json1 = JSON.parse(deez);
    setStuff(json);
    setVisible(true);
    setLoading(false);
    return json;
  };

  const closeHandler = () => {
    setVisible(false);
  };
  const fetchRoadmap = async (e: any) => {
    // e.preventDefault();

    setShow(true);

    const result = await fetch(
      `https://nodejs-sms.saard00vfx.repl.co/api?title=${desc}`
    );

    const json = await result.json();
    setData(json);
    console.log(json);
    setShow(false);
    return json;
  };

  const [modaldata, setModaldata] = useState<Info>();
  useEffect(() => {
    if (stuff) {
      // @ts-ignore
      const deez = stuff.message.choices[0].message.content;
      const bnruh = JSON.parse(deez);
      setModaldata(bnruh);
    }
  }, [stuff]);
  // console.log(video);
  // const roadmapdata = data?.message.choices[0].content.roadmap;

  if (!data) {
    return (
      <div>
        <Head>
          <title>Self Help Hub</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <div className="grid grid-cols-12 bg-[#f4f1eb]/50">
          <Sidebar />
          <div className="col-span-10">
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
                  Welcome to Self Help Hub
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
              <Grid className="flex justify-center">
                <Text h1 size={20}>
                  Your roadmap will show here
                </Text>
              </Grid>
            )}
          </div>{" "}
        </div>
      </div>
    );
  }

  // const dataObject = JSON.parse(roadmapData);
  // const category = dataObject.category;
  // const roadmap = dataObject.roadmap;
  if (data) {
    // @ts-ignore
    const roadmapdata = data?.message.choices[0].message.content;
    // const fine = roadmapdata.replace("@finish", "");
    const sus = JSON.parse(roadmapdata);
    console.log(sus);
    console.log(roadmapdata);

    const addCategory = async (name: string) => {
      try {
        const postInfo: UserBody = {
          id: match[0]._id,
          categories: match[0].categories + "," + name,
        };
        const result = await fetch(`/api/addCategory`, {
          body: JSON.stringify(postInfo),
          method: "POST",
        });
        const json = await result.json();
        return json;
      } catch (err) {
        console.error(err);
      } finally {
        window.location.reload();
      }
    };

    return (
      <div className="grid grid-cols-12 bg-[#f4f1eb]/50">
        <Head>
          <title>Self Help Hub - {text}</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <Sidebar />
        <div className="col-span-10">
          {" "}
          <div className="">
            <div className="flex flex-col p-5 w-full items-center space-y-7 justify-center">
              <Text
                h1
                size={52}
                css={{
                  textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}
                weight="bold"
              >
                Welcome to Self Help Hub
              </Text>
              <Grid className="flex justify-between gap-10">
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
                {/* <Tooltip content={"click to follow this category"}>
                  <Button
                    onPress={() => addCategory(sus.category)}
                    color="secondary"
                    shadow
                    auto
                  >
                    {sus.category}
                  </Button>
                </Tooltip> */}
              </Grid>
              <Grid className="">
                <Button
                  shadow
                  onPress={(e) => fetchRoadmap(e)}
                  color="gradient"
                  auto
                >
                  Submit
                </Button>
              </Grid>
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
              ) : null}
            </div>
          </div>
          {/* <DraggableRoadmap data={sampleData} /> */}
          <div className="flex border gap-2 w-full overflow-x-scroll scrollbar scrollbar-none mt-20 ">
            <div>
              {loading ? (
                <Grid>
                  <Loading type="points" />
                </Grid>
              ) : null}
            </div>
             {sus.roadmap.map((roadmaps: RoadmapItem) => (
              <div className="flex items-center w-full justify-center">
                <ArrowRightIcon className="h-5 w-5 " />
                <Card
                  isPressable
                  isHoverable
                  onPress={() => handler(roadmaps.title)}
                  variant="bordered"
                  css={{ mw: "400px" }}
                >
                  <Card.Body>
                    <Text>{roadmaps.title}</Text>
                  </Card.Body>
                  <Modal
                    closeButton
                    aria-labelledby="modal-title"
                    open={visible}
                    onClose={closeHandler}
                  >
                    <Modal.Header>
                      <Text size={18}>{text}</Text>
                    </Modal.Header>
                    {stuff ? (
                      <>
                        <Modal.Body>
                          <Grid className="flex flex-col items-center">
                            <Text>{modaldata?.description}</Text>
                            <div className="scale-[0.6] rounded-lg">
                              <ReactPlayer controls url={modaldata?.link} />
                            </div>
                          </Grid>
                        </Modal.Body>
                      </>
                    ) : null}
                    <Modal.Footer></Modal.Footer>
                  </Modal>
                </Card>
              </div>
            ))} 
          </div>
        </div>{" "}
      </div>
    );
  }
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
