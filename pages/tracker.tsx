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

const Planet = ({ users }: Props) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const match = users.filter(
    (usere) => usere.email === user?.emailAddresses[0].emailAddress
  );
  const router = useRouter();

  // const match = users.filter((user) => user.email == session?.user?.email);
  const focus = match[0]?.focus;
  const factor = 0.02;
  const focus_no = Number(focus);
  const level = Math.floor(focus_no! * factor);
  const barlevel = level * 10;
  console.log(level);
  return (
    <div className=" p-5 bg-[#f4f1eb]/50 overflow-hidden">
      {/*  */}
      <div className="h-screen">
        <p className="flex justify-center items-center p-3">
          Track Your Progress
        </p>
        <div className="">
          <div className="flex gap-5">
            <p>
              <span className="font-semibold">{focus}</span> Points
            </p>{" "}
            | <p>{level} Boons</p>
          </div>
          <div className="w-full bg-black/30 h-2  mt-1 rounded-md">
            <div
              className="bg-cyan-500 rounded-md h-2"
              style={{ width: `${barlevel}% ` }}
            ></div>
          </div>
          <div className="flex justify-between">
            {level < 5 && (
              <>
                <div>
                  <p> 1 boon</p>
                </div>
                <div>
                  <p> 10 boons</p>
                </div>
              </>
            )}
          </div>
        </div>
        {user ? (
          <>
            {level < 5 ? (
              <div className="border h-full w-full scale-75">
                <p>Townhall Level {level}: unlanded farmer</p>
                <Spline
                  className=""
                  scene="https://prod.spline.design/G2HOyymUf9aYWnL3/scene.splinecode"
                />
              </div>
            ) : null}
          </>
        ) : null}
      </div>
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
export default Planet;
