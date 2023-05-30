import React, { useEffect, useState } from "react";
import Main from "../components/dashboard/Main";
import Header from "../components/dashboard/Main";
// import Progress from "../components/dashboard/Progress";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/Navbar";
import { GetServerSideProps } from "next";
import { fetchUsers } from "../utils/fetchUsers";
import { Goals, Notes, User } from "../typings";
import { useSession } from "next-auth/react";
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
} from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import {
  ArrowDownLeftIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { MdPassword } from "react-icons/md";
import ReactPlayer from "react-player";
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
  const { activeSong } = useSelector((state: any) => state.player);
  const { isLoaded, isSignedIn, user } = useUser();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const match = users.filter(
    (userss) => userss.email == user?.emailAddresses[0].emailAddress
  );
  useEffect(() => {
    if (user && !match[0].categories) {
      router.push("/categories");
    } else {
      null;
    }
  }, []);
  const [desc, setDesc] = useState("");
  const [data, setData] = useState<datatype>();

  const sampledata = {
    category: "ui/ux",
    roadmap: [
      { id: 1, level: 0, parent: 0, title: "HTML5" },
      { id: 2, level: 0, parent: 0, title: "CSS3" },
      { id: 3, level: 0, parent: 0, title: "Javascript" },
      { id: 4, level: 0, parent: 0, title: "React" },
      { id: 5, level: 1, parent: 1, title: "Semantic Markup" },
      { id: 6, level: 1, parent: 1, title: "Forms" },
      { id: 7, level: 1, parent: 1, title: "Accessibility" },
      { id: 8, level: 1, parent: 2, title: "Responsive Design" },
      { id: 9, level: 1, parent: 2, title: "CSS Frameworks" },
      { id: 10, level: 1, parent: 2, title: "CSS Preprocessors" },
      { id: 11, level: 1, parent: 3, title: "ES6" },
      { id: 12, level: 1, parent: 3, title: "Ajax and APIs" },
      { id: 13, level: 1, parent: 3, title: "React State and Props" },
      { id: 14, level: 1, parent: 3, title: "React Router" },
      { id: 15, level: 1, parent: 4, title: "React Redux" },
      { id: 16, level: 2, parent: 5, title: "SEO Friendly Markup" },
      { id: 17, level: 2, parent: 5, title: "Microdata" },
      { id: 18, level: 2, parent: 6, title: "Custom Validation" },
      { id: 19, level: 2, parent: 6, title: "Progressive Enhancements" },
      { id: 20, level: 2, parent: 8, title: "Mobile First Design" },
      { id: 21, level: 2, parent: 8, title: "Fluid Grids" },
      { id: 22, level: 2, parent: 8, title: "CSS Flexbox" },
      { id: 23, level: 2, parent: 9, title: "Bootstrap" },
      { id: 24, level: 2, parent: 9, title: "Materialize" },
      { id: 25, level: 2, parent: 10, title: "Sass" },
      { id: 26, level: 2, parent: 10, title: "Less" },
      { id: 27, level: 2, parent: 11, title: "Async and Await" },
      { id: 28, level: 2, parent: 11, title: "Arrow Functions" },
      { id: 29, level: 2, parent: 12, title: "RESTful APIs" },
      { id: 30, level: 2, parent: 12, title: "JSON Parsing" },
    ],
  };

  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const [video, setVideo] = useState("");
  const [stuff, setStuff] = useState("");
  const handler = async (texts: string) => {
    setText(texts);
    const result = await fetch(`/api/roadmap/normalchat?title=${text}`);
    const json = await result.json();
    // @ts-ignore
    // const deez = stuff.message.choices[0].message.content;
    // const json1 = JSON.parse(deez);
    setStuff(json);
    setVisible(true);
    return json;
  };

  const closeHandler = () => {
    setVisible(false);
  };
  const fetchRoadmap = async (e: any) => {
    // e.preventDefault();

    setShow(true);

    const result = await fetch(`/api/roadmap/generate?title=${desc}`);

    const json = await result.json();
    setData(json);
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
    const fine = roadmapdata.replace("@finish", "");
    const sus = JSON.parse(fine);
    // console.log(roadmapdata);

    return (
      <div className="grid grid-cols-12 bg-[#f4f1eb]/50">
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
                <Button onPress={(e) => fetchRoadmap(e)} color="gradient" auto>
                  Submit
                </Button>
              </Grid>
              <div></div>
            </div>
          </div>
          {/* <DraggableRoadmap data={sampleData} /> */}
          <div className="flex border gap-2 w-full overflow-x-scroll scrollbar scrollbar-none mt-20 ">
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
