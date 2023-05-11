import React from "react";
import Main from "../components/dashboard/Main";
import Header from "../components/dashboard/Main";
import Progress from "../components/dashboard/Progress";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/Navbar";
import { GetServerSideProps } from "next";
import { fetchUsers } from "../utils/fetchUsers";
import { User } from "../typings";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
interface Props {
  users: User[];
}

const Home = ({ users }: Props) => {
  const { activeSong } = useSelector((state: any) => state.player);

  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className="grid grid-cols-12 bg-[#f4f1eb]/50">
      <Sidebar />
      <Main users={users} />
      <Progress />
      {activeSong?.title && (
        <div className="absolute z-50 h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl ">
          {/* <MusicPlayer /> */}
        </div>
      )}
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
export default Home;
