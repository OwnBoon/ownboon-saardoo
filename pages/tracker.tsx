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
import { useUser } from "@clerk/nextjs";
interface Props {
  users: User[];
}

const level1 = "https://prod.spline.design/G2HOyymUf9aYWnL3/scene.splinecode";

const Home = ({ users }: Props) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  // const match = users.filter((user) => user.email == session?.user?.email);
  // const level: number = match[0].focus!;
  return (
    <div className="grid grid-cols-12 bg-[#f4f1eb]/50">
      <Sidebar />
      {/*  */}
      <div className="col-span-9 h-screen">
        <p className="flex justify-center items-center p-5">
          Track Your Progress
        </p>
        {/* {level < 5 ? (
          <div className="border h-full w-full scale-75">
            <p>Level {level}: unlanded farmer</p>
            <Spline
              className=""
              scene="https://prod.spline.design/G2HOyymUf9aYWnL3/scene.splinecode"
            />
          </div>
        ) : null} */}
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
