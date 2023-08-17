import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Modal, Text } from "@nextui-org/react";

import { fetchUsers } from "../utils/fetchUsers";
import { Goals, Notes, Roadmaps, User } from "../typings";
import { fetchGoals } from "../utils/fetchGoals";
import { fetchNotes } from "../utils/fetchNotes";
import Layout from "../components/Layout/Layout";
import handler from "../pages/api/roadmap/generate";
import { fetchRoadmaps } from "../utils/fetchRoadmap";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
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

  const fetchRoadmap = async (e: any) => {
    // e.preventDefault();
    setVisible(false);
    setDesc("");
    const result = await fetch(
      `https://nodejs-sms.saard00vfx.repl.co/api?title=${desc}`
    );
    const json = await result.json();
    setData(json);

    // const fine = content!.replace("@finish", "");

    const content = data?.message.choices[0].message.content;
    // const fiine = content?.replace("@finish", "");
    // const sus = JSON.parse(fiine!);
    // console.log(sus.roadmap[0].title);

    const mutations = {
      _type: "roadmap",
      content: content,
      email: user?.emailAddresses[0].emailAddress,
      // goal: sus.roadmap[0].title,
      progress: 0,
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
    const postInfo = {
      id: id,
    };
    const result = await fetch(`/api/deleteRoadmap`, {
      body: JSON.stringify(postInfo),
      method: "POST",
    });
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
      border="gray-500"
      children={
        <div>
          <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Describe what you want to learn
              </Text>
            </Modal.Header>
            <Modal.Body>
              <textarea
                placeholder={`${
                  category === "self" ? "Self Improvement" : "Skill Improvement"
                }`}
                className="w-full h-32 p-2 rounded-md bg-[#191919] border border-[#585858] outline-none text-[#fff] placeholder-[#585858] placeholder-opacity-80 resize-none focus:ring-1 focus:ring-[#585858] focus:border-transparent"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
            </Modal.Body>
            <Modal.Footer>
              <button
                className="bg-[#474747] py-2 px-3 rounded-md text-[#807d7d] w-full"
                style={{
                  border: "1px solid #585858",
                }}
                onClick={fetchRoadmap}
              >
                Send
              </button>
            </Modal.Footer>
          </Modal>
          <div className="flex w-full gap-6 ">
            <div
              className="first w-1/2 bg-[#191919] flex items-center justify-between p-4 rounded-md"
              style={{
                border: "1px solid #585858",
              }}
            >
              <div className="flex flex-col gap-1">
                <span>Self Improvement Roadmap</span>
                <span
                  className="w-1/2"
                  style={{
                    borderBottom: "1px solid #585858",
                  }}
                ></span>
              </div>
              <button
                className="bg-[#474747] py-2 px-3 rounded-md"
                style={{
                  border: "1px solid #585858",
                }}
                onClick={() => handleOpen("self")}
              >
                Generate Now
              </button>
            </div>
            <div
              className="first w-1/2 bg-[#191919] flex items-center justify-between p-4 rounded-md"
              style={{
                border: "1px solid #585858",
              }}
            >
              <div className="flex flex-col gap-1">
                <span>Skill Improvement Roadmap</span>
                <span
                  className="w-1/2"
                  style={{
                    borderBottom: "1px solid #585858",
                  }}
                ></span>
              </div>
              <button
                className="bg-[#474747] py-2 px-3 rounded-md"
                style={{
                  border: "1px solid #585858",
                }}
                onClick={() => handleOpen("skill")}
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
                <div className="flex relative">
                  {/* <div className="completed relative bg-gradient-to-r from-[#cccccc] to-[#121212] text-[#dddddd54] w-1/2 flex flex-col py-6 rounded-l-lg">
                  <div className="flex justify-between px-6">
                    {aboveItems?.map((item, i) => (
                      <div
                        key={i}
                        className={`w-1/3 flex justify-center flex-col text-center ${
                          i % 2 !== 0
                            ? ""
                            : 'after:content-["|"] after:width-[1px] after:height-[1px]'
                        }`}
                        style={{
                          alignSelf: "end",
                        }}
                      >
                        <p>{item}</p>
                      </div>
                      ))}
                  </div>
                  <div className="h-4 px-6 bg-gradient-to-l from-[#cccccc] to-[#47474722] my-2 flex justify-evenly rounded-l-lg">
                    <span className="w-1/3 flex justify-center">
                      <span className="h-4 w-4 bg-[#474747] rounded-full"></span>
                    </span>
                    <span className="w-1/3 flex justify-center">
                    <span className="h-4 w-4 bg-[#474747] rounded-full"></span>
                    </span>
                    <span className="w-1/3 flex justify-center">
                      <span className="h-4 w-4 bg-[#474747] rounded-full"></span>
                    </span>
                  </div>
                  <div className="flex justify-between px-6">
                    {belowItems?.map((item, i) => (
                      <div
                        key={i}
                        className={`w-1/3 flex justify-center flex-col text-center ${
                          i % 2 === 0
                          ? ""
                            : 'before:content-["|"] before:width-[1px] before:height-[1px]'
                        }`}
                        style={{
                          alignSelf: "start",
                        }}
                        >
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </div> */}

                  {/* <div className="remaining text-[#585858] w-1/2 flex flex-col py-6 rounded">
                  <div className="flex justify-between px-6">
                    {aboveItems?.map((item, i) => (
                      <div
                        key={i}
                        className={`w-1/3 flex  ${
                          i === 0 ? "text-[#fff]" : "text-[#585858]"
                        } justify-center flex-col text-center ${
                          i % 2 !== 0
                            ? ""
                            : 'after:content-["|"] after:width-[1px] after:height-[1px]'
                        }`}
                        style={{
                          alignSelf: "end",
                        }}
                      >
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="h-4 my-2 px-6 bg-gradient-to-r from-[#cccccc] to-[#cccccc6e] rounded-r-lg flex justify-between">
                    <span className="w-1/3 flex text-center justify-center">
                      <span className="h-4 w-4 bg-[#fff] rounded-full"></span>
                    </span>
                    <span className="w-1/3 flex justify-center">
                      <span className="h-4 w-4 bg-[#474747] rounded-full"></span>
                    </span>
                    <span className="w-1/3 flex justify-center">
                    <span className="h-4 w-4 bg-[#474747] rounded-full"></span>
                    </span>
                  </div>
                  <div className="flex justify-between px-6">
                  {belowItems?.map((item, i) => (
                    <div
                        key={i}
                        className={`w-1/3 flex ${
                          i === 0 ? "text-[#fff]" : "text-[#585858]"
                        } justify-center flex-col text-center ${
                          i % 2 === 0
                            ? ""
                            : 'before:content-["|"] before:width-[1px] before:height-[1px]'
                        }`}
                        style={{
                          alignSelf: "start",
                        }}
                      >
                        <p>{item}</p>
                      </div>
                    ))}
                    </div>
                  </div> */}

                  <div className="content absolute top-0 left-0 w-1/2 h-full flex flex-col py-8 pl-8 text-white">
                    <p className="flex items-center gap-6 my-1 bold text-sm">
                      Total Progress <ArrowRightIcon width={"12px"} />{" "}
                      {roadmap.progress}
                    </p>
                    <p className="flex items-center gap-6 my-1 bold text-sm">
                      Current Goal <ArrowRightIcon width={"12px"} />{" "}
                      {roadmap.goal}
                    </p>
                    <p className="flex items-center gap-6 my-1 bold text-sm">
                      Days Spent <ArrowRightIcon width={"12px"} /> 7{" "}
                    </p>
                    <button
                      onClick={() =>
                        router.push(`/roadmaps/${roadmap.slug?.current}`)
                      }
                      className="bg-[#191919] w-1/3 py-2 px-3 rounded-md mt-4"
                      style={{
                        border: "none",
                        outline: "none",
                        color: "#585858",
                      }}
                    >
                      Explore More
                    </button>
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
