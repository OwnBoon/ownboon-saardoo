import React from "react";
import Main from "../components/dashboard/Main";
import Header from "../components/dashboard/Main";
import Progress from "../components/dashboard/Progress";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/Navbar";
import { GetServerSideProps } from "next";
import { fetchUsers } from "../utils/fetchUsers";
import { User } from "../typings";

interface Props {
  users: User[];
}

const dashboard = ({ users }: Props) => {
  return (
    <div className="grid grid-cols-12 bg-[#f4f1eb]/50">
      <Sidebar />
      <Main users={users} />
      <Progress />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const users = await fetchUsers();

  return {
    props: {
      users,
    },
  };
};
export default dashboard;
