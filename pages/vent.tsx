import React, { useEffect } from "react";
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
import { fetchMessage } from "../utils/fetchMessage";
import { Message } from "../typings";
import { useUser } from "@clerk/nextjs";

interface Props {
  messages: Message[];
}

const vent = ({ messages }: Props) => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  // @ts-ignore
  const socket = socketIO.connect(process.env.NEXT_PUBLIC_SOCKET_URL);
  const userName = user?.username || user?.firstName || "random_user";
  const pfp = user?.profileImageUrl!;

  useEffect(() => {
    localStorage.setItem("userName", userName);
    localStorage.setItem("pfp", pfp);
    socket.emit("newUser", { userName, socketID: socket.id, pfp });
  }, []);
  return (
    <div className="grid grid-cols-12 h-screen bg-[#f4f1eb]/50">
      <Sidebar />
      {/* <Main /> */}
      <ChatPage message={messages} socket={socket} />
      <Progress />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const messages = await fetchMessage();

  return {
    props: {
      messages,
    },
  };
};

export default vent;
