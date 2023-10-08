import React from "react";
import Layout from "../components/Layout/Layout";
import ComingSoonCard from "../components/ComingSoonCard";
import { fetchUsers } from "../utils/fetchUsers";
import { GetServerSideProps } from "next";
import { fetchNotes } from "../utils/fetchNotes";
import { fetchGoals } from "../utils/fetchGoals";
import { Goals, Notes, User } from "../typings";
interface Props {
  users: User[];
  goals: Goals[];
  notes: Notes[];
}

const chat = ({ users, goals, notes }: Props) => {
  return (
    <Layout
      hasBg={false}
      bgColor={"#121212"}
      icon="chat.svg"
      text="Chats"
      goals={goals}
      border="gray-500"
      children={
        <div className="flex flex-col items-center justify-center w-full h-full">
          <ComingSoonCard />
        </div>
      }
    />
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
export default chat;
