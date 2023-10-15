import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import ComingSoonCard from "../components/ComingSoonCard";
import dynamic from "next/dynamic";
import "../styles/chat.css";
import styles from "../styles/Home.module.css";
import { GetServerSideProps } from "next";
import { fetchUsers } from "../utils/fetchUsers";
import { Goals, User } from "../typings";
import { useUser } from "@clerk/nextjs";
import { Button, Checkbox, Modal, Text } from "@nextui-org/react";
import { fetchGoals } from "../utils/fetchGoals";
import ChatMobile from "../components/Chat/ChatMobile";
const Chat = dynamic(() => import("../components/Chat/Chat"), {
  ssr: false,
  loading: () => <p>...</p>,
});

interface Props {
  users: User[];
  goals: Goals[];
}
const categories = [
  {
    name: "Maths",
    value:
      "sendbird_group_channel_196366427_00ef971c0f88f6dd06389fd19a2871818c2954c1",
  },
  {
    name: "English",
    value:
      "sendbird_group_channel_196293859_8f660b9965e1b1b7c4c2e329b853c9664f1edb9a",
  },
];
const chat = ({ users, goals }: Props) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [categoryslide, setCategoryslide] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("visited")) {
      setShowModal(true);
      localStorage.setItem("visited", "true");
    }
  }, []);

  if (isSignedIn) {
    const match = users.filter(
      (userss) => userss.email == user.emailAddresses[0].emailAddress
    );

    const handleCategoryChange = (category: any) => {
      // @ts-ignore
      setSelectedCategories((prev: any) => [...prev, category]);
    };
    const handleSubmit = () => {
      // Join selected group chats
      selectedCategories.forEach(async (category) => {
        const response = await fetch(
          `https://api-7FB154A3-C967-45D0-90B7-6A63E5F0E3EB.sendbird.com/v3/group_channels/${category}/invite`,
          {
            method: "POST",
            headers: {
              "Api-Token": "41d1f2713e9ae9eae6144731df5c5d84e2392124",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_ids: [match[0].chatid], // Replace with the user id of the current user
            }),
          }
        );
        console.log("category", category);

        if (!response.ok) {
          console.error("Failed to join group chat:", await response.text());
        }
      });

      setShowModal(false);
    };
    return (
      <Layout
        hasBg={false}
        bgColor={"#121212"}
        icon="chat.svg"
        text="Chats"
        goals={goals}
        border="gray-500"
        children={
          <main className="min-h-screen overflow-hidden  scrollbar-none scrollbar">
            {/* <Modal
              className="!bg-[#191919]/40 z-50 h-[70vh] flex justify-center items-center ml-10 backdrop-blur-md fixed top-0 left-0 right-0  w-full overflow-x-hidden overflow-y-auto md:inset-0"
              open={showModal}
              onClose={() => setShowModal(false)}
            >
              <Modal.Header className="w-full">
                <h1>Welcome!</h1>
              </Modal.Header>
              <Modal.Body>
                <p>Select the categories you want to follow:</p>
                {categories.map((category) => (
                  <Checkbox
                    key={category}
                    onChange={() => handleCategoryChange(category)}
                  >
                    {category}
                  </Checkbox>
                ))}
              </Modal.Body>
              <Modal.Footer onClick={() => setShowModal(false)}>
                <Button onPress={() => setShowModal(false)}>Cancel</Button>
                <Button onPress={handleSubmit}>Submit</Button>
              </Modal.Footer>
            </Modal> */}
            {!categoryslide ? (
              <Modal
                closeButton
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="modal-title"
                className="!bg-[#191919]/40 z-50 h-[70vh] flex justify-center items-center ml-10 backdrop-blur-sm fixed top-0 left-0 right-0  w-full overflow-x-hidden overflow-y-auto md:inset-0"
                width="80%"
              >
                <Modal.Header className="text-neutral-400">
                  <p className="text-neutral-400"></p>
                </Modal.Header>
                <Modal.Body className="flex justify-center items-center h-full w-full">
                  {" "}
                  <Text id="modal-title" color="white" size={40}>
                    <h1 className="fade  bg-transparent  text-neutral-100 brightness-125">
                      Welcome to Chats
                    </h1>
                  </Text>
                  <h2 className="text-neutral-400 fade">
                    {" "}
                    Before you access the app we would like to ask a few
                    questions from you
                  </h2>
                </Modal.Body>
                <Modal.Footer className="w-full p-2">
                  <div className="flex fade justify-center p-2 w-full gap-5">
                    <div className=" border-gray-500/30 bg-[#363636]/20 backdrop-blur-lg from-gray-300 w-fit flex flex-col justify-start relative hover:   items-center py-3 border rounded">
                      <button
                        onClick={() => setCategoryslide(true)}
                        className="rounded-xl cursor-pointer whitespace-nowrap md:text-lg  text-sm   text-[#dddddd] relative mx-24"
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                </Modal.Footer>
              </Modal>
            ) : (
              <Modal
                closeButton
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="modal-title"
                className="!bg-[#191919]/40 z-50 h-[70vh] flex justify-center items-center ml-10 backdrop-blur-sm fixed top-0 left-0 right-0  w-full overflow-x-hidden overflow-y-auto md:inset-0"
                width="80%"
              >
                <Modal.Header className="text-neutral-400">
                  <p className="text-neutral-400"></p>
                </Modal.Header>
                <Modal.Body className="flex justify-center items-center h-full w-full">
                  {" "}
                  <Text id="modal-title" color="white" size={40}>
                    <h1 className="fade  bg-transparent  text-neutral-100 brightness-125">
                      Join a Group Chat
                    </h1>
                  </Text>
                  <h2 className="text-neutral-400 fade">
                    {" "}
                    Select a category of which group chat you want to join
                  </h2>
                  {categories.map((category) => (
                    <div className="flex gap-3 justify-start items-center max-w-7xl min-w-max">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        onChange={(e) => handleCategoryChange(category.value)}
                        className="border-solid border-neutral-200 hover:cursor-pointer bg-transparent mb-px relative w-6 shrink-0 h-6 border-2 rounded checked:bg-[#6d8383] focus:ring-transparent focus:border-none"
                      />
                      <h1 className="text-white ">{category.name}</h1>
                    </div>
                  ))}
                </Modal.Body>
                <Modal.Footer className="w-full p-2">
                  <div className="flex fade justify-center p-2 w-full gap-5">
                    <div className=" border-gray-500/30 bg-[#363636]/20 backdrop-blur-lg from-gray-300 w-fit flex flex-col justify-start relative hover:   items-center py-3 border rounded">
                      <button
                        onClick={handleSubmit}
                        className="rounded-xl cursor-pointer whitespace-nowrap md:text-lg  text-sm   text-[#dddddd] relative mx-24"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </Modal.Footer>
              </Modal>
            )}

            <Chat user={match} />
            <ChatMobile user={match} />
          </main>
        }
      />
    );
  } else null;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const users = await fetchUsers();
  const goals = await fetchGoals();

  return {
    props: {
      users,
      goals,
    },
  };
};
export default chat;
