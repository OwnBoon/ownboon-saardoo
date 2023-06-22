import React, { useEffect, useState } from "react";
import Main from "../components/dashboard/Main";
import Header from "../components/dashboard/Main";
import Progress from "../components/dashboard/Progress";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/Navbar";
import ChatPage from "../components/Vent/ChatPage";
import socketIO from "socket.io-client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { fetchUsers } from "../utils/fetchUsers";
import { User } from "../typings";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import CryptoJS from "crypto-js";
interface Props {
  users: User[];
}
const vent = ({ users }: Props) => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  // @ts-ignore

  useEffect(() => {
    if (user) {
      const match = users.filter(
        (userss) => userss.email === user!.emailAddresses[0].emailAddress
      );
      const data = JSON.stringify({
        username: match[0].name,
        first_name: user!.firstName,
        last_name: user!.lastName,
        secret: match[0].secret,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.chatengine.io/users/",
        headers: {
          "PRIVATE-KEY": "8ef40a21-bcb4-47f3-928e-2b83389392b1",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);
  return (
    <div className="grid grid-cols-12 h-screen bg-[#f4f1eb]/50">
      <Sidebar />
      {/* <Main /> */}
      <div className="col-span-9 flex flex-col  justify-center items-center">
        <p>Choose your Vent</p>
        <div className="flex p-5 gap-20">
          {/* First */}

          <div onClick={() => router.push("/groupchat")} className="text-3xl  ">
            Group Chat
          </div>
          {/* Second */}
          <div onClick={() => router.push("/buddies")} className="text-3xl">
            Buddies
          </div>
        </div>
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
export default vent;
