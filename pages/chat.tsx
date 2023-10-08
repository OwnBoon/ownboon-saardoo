import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import ComingSoonCard from "../components/ComingSoonCard";
import dynamic from "next/dynamic";
import "../styles/chat.css"
import styles from "../styles/Home.module.css";
import { fetchGoals } from "../utils/fetchGoals";
import { GetServerSideProps } from "next";
import { fetchUsers } from "../utils/fetchUsers";
import { Goals, User } from "../typings";
import { useUser } from "@clerk/nextjs";
import { Button, Checkbox, Modal, Row, Text } from "@nextui-org/react";
import { Bold } from "lucide-react";
const Chat = dynamic(() => import("../components/Chat/Chat"), {
  ssr: false,
  loading: () => <p>...</p>,
});

interface Props {
  users: User[];
  goals: Goals[];
}
const categories = [
  "sendbird_group_channel_196366427_00ef971c0f88f6dd06389fd19a2871818c2954c1",
  "Economics",
  "Category 3",
];
const chat = ({ users, goals }: Props) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [showModal, setShowModal] = useState(true);
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
        console.log(category);

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
            <Modal open={showModal} onClose={() => setShowModal(false)} closeButton blur
        aria-labelledby="modal-title" preventClose scroll css={{background:'$gray900'}}
       >
              <Modal.Header  >
                <Text id="modal-title" size={19} h1 weight="bold" css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }} > Welcome to  {' '}  
                <Text b size={20}>
                  Chats!
                </Text>
                </Text>
              </Modal.Header>
              <Modal.Body autoMargin>
                <Text size={16} h4 weight='semibold'  css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}>Please Select the categories you want to follow:</Text>
                {categories.map((category) => (
                  <Checkbox
                  lineThrough 
                  color="gradient"
                  labelColor="primary"
                  isRounded
                    key={category}
                    onChange={() => handleCategoryChange(category)}
                    size="sm"
                  >
                    {category}
                  </Checkbox>
                ))}
              </Modal.Body>
              <Modal.Footer onClick={() => setShowModal(false)}>
                <Row justify="space-between">
                <Button auto  onPress={handleSubmit}>Submit</Button>
                <Button auto  color="error" onPress={() => setShowModal(false)}>Cancel</Button>
                </Row>
              </Modal.Footer>
            </Modal>
            <Chat user={match} />
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
