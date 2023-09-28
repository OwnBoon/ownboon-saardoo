import React from "react";
import Layout from "../components/Layout/Layout";
import ComingSoonCard from "../components/ComingSoonCard";
import dynamic from "next/dynamic";
import "../styles/chat.css";
import styles from "../styles/Home.module.css";
import { GetServerSideProps } from "next";
import { fetchUsers } from "../utils/fetchUsers";
import { User } from "../typings";
import { useUser } from "@clerk/nextjs";
const Chat = dynamic(() => import("../components/Chat/Chat"), {
  ssr: false,
  loading: () => <p>...</p>,
});

interface Props {
  users: User[];
}

const buddies = ({ users }: Props) => {
  const { isLoaded, isSignedIn, user } = useUser();
  if (isSignedIn) {
    const match = users.filter(
      (userss) => userss.email == user.emailAddresses[0].emailAddress
    );
    return (
      <Layout
        hasBg={false}
        bgColor={"#121212"}
        icon="chat.svg"
        text="Chats"
        border="gray-500"
        children={
          <main className="min-h-screen overflow-hidden  scrollbar-none scrollbar">
            <Chat user={match} />
          </main>
        }
      />
    );
  } else null;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const users = await fetchUsers();

  return {
    props: {
      users,
    },
  };
};
export default buddies;
