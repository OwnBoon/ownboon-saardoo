import React, { useEffect, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button, Dropdown, Modal, Text } from "@nextui-org/react";

import { fetchUsers } from "../utils/fetchUsers";
import { Goals, Notes, Roadmaps, User } from "../typings";
import { fetchGoals } from "../utils/fetchGoals";
import { fetchNotes } from "../utils/fetchNotes";
import Layout from "../components/Layout/Layout";
import handler from "../pages/api/roadmap/generate";
import { fetchRoadmaps } from "../utils/fetchRoadmap";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import RoadComp from "../components/Roadmap/roadmaps";
import ReactTimeago from "react-timeago";
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
  roadmaps: Roadmaps[];
}

interface RoadmapItem {
  id: number;
  level: number;
  parent: number;
  title: string;
}
const Home = ({ users, goals, notes, roadmaps }: Props) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [desc, setDesc] = useState("");
  const [data, setData] = useState<datatype>();
  const userroadmap = roadmaps.filter(
    (roadmap) => roadmap.email === user?.emailAddresses[0].emailAddress
  );

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("self");
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  function generateString(length: number) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const random = generateString(8);
  const [description, setDescription] = useState("");
  console.log(desc);

  const fetchRoadmap = async () => {
    // e.preventDefault();
    setVisible(false);
    console.log(desc);
    setDesc("");
    setLoading(true);
    const result = await fetch(
      `https://nodejs-sms.saard00vfx.repl.co/api?title=${desc}`
    );
    const json = await result.json();
    setVisible(false);
    // console.log(json);
    setData(json);
    // const fine = content!.replace("@finish", "");

    const content = json?.message.choices[0].message.content;
    // const fiine = content?.replace("@finish", "");
    // const sus = JSON.parse(fiine!);
    // console.log(sus.roadmap[0].title);

    const mutations = {
      _type: "roadmap",
      content: content,
      email: user?.emailAddresses[0].emailAddress,
      // goal: sus.roadmap[0].title,
      progress: 0,
      completed: false,
      slug: {
        current: random,
      },
    };
    const result2 = await fetch(`/api/addRoadmaps`, {
      body: JSON.stringify(mutations),
      method: "POST",
    });
    const json2 = await result2.json();
    return json;
  };
  // console.log("data is", data);
  const handleOpen = (category: any) => {
    setVisible(true);
    setCategory(category);
  };
  const closeHandler = () => {
    setVisible(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setVisible(false);
  };

  const completeRoadmap = async (id: string) => {
    console.log(id);
    const postInfo = {
      _id: id,
      completed: true,
    };
    const result = await fetch(`/api/setCurrentRoadmap`, {
      body: JSON.stringify(postInfo),
      method: "POST",
    });

    console.log("completing roadmap");
    const json = await result.json();
    console.log(json);
    return json;
  };
  const deleteRoadmap = async (id: string) => {
    const postInfo = {
      _id: id,
    };
    const result = await fetch(`/api/deleteRoadmap`, {
      body: JSON.stringify(postInfo),
      method: "POST",
    });
    console.log("deleting roadmap");
    const json = await result.json();
    console.log(json);
    router.replace(router.asPath);
    return json;
  };

  // ------ data section --------

  const sampleData = [
    {
      category: "ui/ux",
      roadmap: [
        {
          id: 1,
          level: 0,
          parent: 0,
          title: "HTML5",
          completed: true,
          description: "Learn the basics of HTML5.",
        },
        {
          id: 2,
          level: 0,
          parent: 0,
          title: "CSS3",
          completed: true,
          description: "Explore advanced CSS3 techniques.",
        },
        {
          id: 3,
          level: 0,
          parent: 0,
          title: "Javascript",
          completed: true,
          description: "Dive into the world of JavaScript.",
        },
        {
          id: 4,
          level: 0,
          parent: 0,
          title: "React",
          completed: true,
          description: "Build interactive UIs with React.",
        },
        {
          id: 5,
          level: 1,
          parent: 1,
          title: "Semantic Markup",
          completed: true,
          description: "Master the art of semantic markup.",
        },
        {
          id: 6,
          level: 1,
          parent: 1,
          title: "Forms",
          completed: true,
          description: "Create user-friendly forms.",
        },
        {
          id: 7,
          level: 1,
          parent: 1,
          title: "Accessibility",
          completed: true,
          description: "Ensure accessibility for all users.",
        },
        {
          id: 8,
          level: 1,
          parent: 2,
          title: "Responsive Design",
          completed: true,
          description: "Design responsive layouts.",
        },
        {
          id: 9,
          level: 1,
          parent: 2,
          title: "CSS Frameworks",
          completed: true,
          description: "Use popular CSS frameworks.",
        },
        {
          id: 10,
          level: 1,
          parent: 2,
          title: "CSS Preprocessors",
          completed: true,
          description: "Enhance CSS with preprocessors.",
        },
        {
          id: 11,
          level: 1,
          parent: 3,
          title: "ES6",
          completed: false,
          description: "Discover the power of ES6.",
        },
        {
          id: 12,
          level: 1,
          parent: 3,
          title: "Ajax and APIs",
          completed: false,
          description: "Connect to APIs using Ajax.",
        },
        {
          id: 13,
          level: 1,
          parent: 3,
          title: "React State and Props",
          completed: false,
          description: "Manage state and props in React.",
        },
        {
          id: 14,
          level: 1,
          parent: 3,
          title: "React Router",
          completed: false,
          description: "Navigate with React Router.",
        },
        {
          id: 15,
          level: 1,
          parent: 4,
          title: "React Redux",
          completed: false,
          description: "Implement Redux in React applications.",
        },
        {
          id: 16,
          level: 2,
          parent: 5,
          title: "SEO Friendly Markup",
          completed: false,
          description: "Optimize for search engines.",
        },
        {
          id: 17,
          level: 2,
          parent: 5,
          title: "Microdata",
          completed: false,
          description: "Add microdata to your pages.",
        },
        {
          id: 18,
          level: 2,
          parent: 6,
          title: "Custom Validation",
          completed: false,
          description: "Customize form validation.",
        },
        {
          id: 19,
          level: 2,
          parent: 6,
          title: "Progressive Enhancements",
          completed: false,
          description: "Enhance user experience progressively.",
        },
        {
          id: 20,
          level: 2,
          parent: 8,
          title: "Mobile First Design",
          completed: false,
          description: "Prioritize mobile-friendly design.",
        },
      ],
    },
  ];

  const lastCompleted = () => {
    const completedItems = sampleData[0].roadmap.filter(
      (item) => item.completed === true
    );
    return completedItems.slice(-3);
  };

  const firstRemaining = () => {
    const remaining = sampleData[0].roadmap.filter(
      (item) => item.completed === false
    );
    return remaining.slice(0, 3);
  };

  const completed = lastCompleted();
  const remaining = firstRemaining();

  const above = () => {
    let above = [];

    for (let i = 0; i < completed.length; i++) {
      if (i % 2 === 0) {
        above.push(completed[i].description);
      } else {
        above.push(completed[i].title);
      }
    }

    return above;
  };
  const below = () => {
    let below = [];

    for (let i = 0; i < completed.length; i++) {
      if (i % 2 === 0) below.push(completed[i].title);
      else below.push(completed[i].description);
    }

    return below;
  };

  const aboveItems = above();
  const belowItems = below();

  return (
    <Layout
      hasBg={false}
      bgColor={"#121212"}
      icon="roadmap.svg"
      text="Roadmap"
      goals={goals}
      border="gray-500"
      children={
        <div>
          <div className="flex w-full gap-6 ">
            <Modal
              closeButton
              aria-labelledby="modal-title"
              className="!bg-[#191919]"
              open={visible}
              onClose={closeHandler}
            >
              <Modal.Header>
                <Text id="modal-title" color="gray" size={18}>
                  Describe what you want to learn
                </Text>
              </Modal.Header>
              <Modal.Body>
                <textarea
                  placeholder={`${
                    category === "self"
                      ? "Self Improvement"
                      : "Skill Improvement"
                  }`}
                  className="w-full h-32 p-2 rounded-md !bg-[#232222] border border-[#585858] outline-none text-[#fff] placeholder-[#585858] placeholder-opacity-80 resize-none focus:ring-1 focus:ring-[#585858] focus:border-transparent"
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                />
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="bg-[#474747]  py-2 px-3 rounded-md text-[#807d7d] w-full"
                  style={{
                    border: "1px solid #585858",
                  }}
                  disabled={userroadmap.length <= 4 ? false : true}
                  onClick={fetchRoadmap}
                >
                  {userroadmap.length <= 4
                    ? "Send"
                    : "You can only generate upto 5 roadmaps"}
                </button>
              </Modal.Footer>
            </Modal>
            <div
              className="first w-1/2  bg-[#191919]  inline-block md:inline-flex items-center justify-between p-4 rounded-md"
              style={{
                border: "1px solid #585858",
              }}
            >
              <div className="flex text-sm md:text-base flex-col gap-1">
                <span className="font-light font-sans md:font-medium">
                  Self Improvement Roadmap
                </span>
                <span
                  className="w-1/2"
                  style={{
                    borderBottom: "1px solid #585858",
                  }}
                ></span>
              </div>
              <button
                className="bg-[#474747] md:py-2 font-sans md:px-3 mt-2 md:mt-0 text-sm px-2  md:font-semibold hover:bg-[#555555] transition-all duration-75 !hover:border-[#505050] font-extralight rounded-md"
                style={{
                  border: "1px solid #585858",
                }}
                onClick={() => handleOpen("self")}
              >
                Generate Now
              </button>
            </div>

            <div
              className="first w-1/2 bg-[#191919] inline-block md:inline-flex items-center justify-between p-4 rounded-md"
              style={{
                border: "1px solid #585858",
              }}
            >
              <div className="flex flex-col text-sm md:text-base gap-1">
                <span className="font-light font-sans md:font-medium">
                  Skill Improvement Roadmap
                </span>
                <span
                  className="w-1/2"
                  style={{
                    borderBottom: "1px solid #585858",
                  }}
                ></span>
              </div>
              <button
                className="bg-[#474747] font-sans md:py-2 md:px-3 mt-2 md:mt-0 text-sm px-2 md:font-semibold hover:bg-[#555555] transition-all duration-75 !hover:border-[#505050] font-extralight rounded-md"
                style={{
                  border: "1px solid #585858",
                }}
                onClick={() => handleOpen("self")}
              >
                Generate Now
              </button>
            </div>
          </div>

          {/* road map data */}

          {!userroadmap && (
            <div className="flex items-center justify-center my-10 text-[#2CD3E1]">
              <span>
                Haven't yet generated any -- plz chose category and continue!
              </span>
            </div>
          )}
          {userroadmap && (
            <div className="w-full mt-8 flex flex-col gap-8">
              {userroadmap.map((roadmap: Roadmaps) => (
                <div className="flex relative bg-gradient-to-r overflow-hidden from-[#585858] via-[#2b2b2b] md:via-[#121212]  to-[#121212] rounded-tl-[10px] rounded-bl-[10px]     rounded-lg   ">
                  <div className="absolute z-0 opacity-25 overflow-hidden flex justify-center items-center mt-10">
                    <RoadComp roadmap={roadmap} />
                  </div>

                  <div className=" top-0 left-0 w-full z-10 h-full flex flex-col py-8 pl-8 text-white">
                    <div className="flex justify-between">
                      <p className="flex items-center font-sans  tracking-[1px] md:text-lg gap-3 md:gap-6 my-1 bold font-light">
                        Total Progress <ArrowRightIcon width={"12px"} />{" "}
                        {/* @ts-ignore */}
                        {Math.round(roadmap.progress)}%
                      </p>
                      <div className="px-10">
                        <Dropdown>
                          {/* @ts-ignore */}
                          <Dropdown.Button color="" light>
                            :
                          </Dropdown.Button>
                          <Dropdown.Menu
                            onAction={() => {
                              // @ts-ignore
                              completeRoadmap(roadmap._id);
                            }}
                            variant="light"
                            aria-label="Actions"
                          >
                            <Dropdown.Item key="Complete">
                              Complete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <p className="flex items-center font-sans md:gap-6 gap-3 my-1  tracking-[1px] md:text-lg font-light bold ">
                      Current Goal <ArrowRightIcon width={"12px"} />{" "}
                      <span className="font-extralight md:font-light md:text-lg text-sm font-sans">
                        {roadmap.goal}
                      </span>
                    </p>
                    <p className="flex items-center font-sans tracking-[1px] md:text-lg font-light md:gap-6 gap-3 my-1 bold ">
                      Days Spent <ArrowRightIcon width={"12px"} />{" "}
                      {/* @ts-ignore */}
                      <ReactTimeago date={roadmap._createdAt} />
                    </p>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() =>
                          router.push(`/roadmaps/${roadmap.slug?.current}`)
                        }
                        className=" bg-neutral-800   rounded-[5px] flex  border border-zinc-700  text-white/80 w-fit md:py-2 md:px-3 px-2   mt-4"
                        style={{
                          border: "none",
                          outline: "none",
                          // color: "#585858",
                        }}
                      >
                        <p className="text-neutral-200  font-sans text-sm md:font-semibold ">
                          Explore more
                        </p>
                      </button>
                      <Button
                        // @ts-ignore
                        onPress={() => deleteRoadmap(roadmap._id)}
                        className="!mx-4 mt-2 scale-[0.8] md:scale-100 font-sans"
                        color="error"
                        size={"sm"}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
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
  const roadmaps = await fetchRoadmaps();

  return {
    props: {
      users,
      goals,
      notes,
      roadmaps,
    },
  };
};
export default Home;
