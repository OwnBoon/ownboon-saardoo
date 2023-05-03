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
import Spline from "@splinetool/react-spline";
interface Props {
  users: User[];
}

const Home = ({ users }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className="grid grid-cols-12 bg-[#f4f1eb]/50">
      <Sidebar />
      {/*  */}
      <div className="col-span-9 h-screen">
        <p className="flex justify-center p-5">Track Your Progress</p>
        <Spline
          className="scale-75"
          scene="https://prod.spline.design/sDtiNp5HMCCgVQRc/scene.splinecode"
        />
      </div>
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
export default Home;
