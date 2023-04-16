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

const vent = () => {
  const router = useRouter();
  // @ts-ignore
  const socket = socketIO.connect(process.env.NEXT_PUBLIC_SOCKETIO_URL_2);
  const { data: session } = useSession();
  const userName = session?.user?.name || "idk";
  const pfp =
    session?.user?.image ||
    "https://cdn.discordapp.com/attachments/1018929979897163868/1084440633432875069/00099-573026695-nvinkpunk_potrait_of_a_handsome_teenage_boy_with_the_most_cutest_face.png";

  useEffect(() => {
    localStorage.setItem("userName", userName);
    localStorage.setItem("pfp", pfp);
    socket.emit("newUser", { userName, socketID: socket.id, pfp });
  }, []);
  return (
    <div className="grid grid-cols-12 h-screen bg-[#f4f1eb]/50">
      <Sidebar />
      {/* <Main /> */}
      {/* @ts-ignore */}
      <ChatPage socket={socket} />
      <Progress />
    </div>
  );
};

export default vent;
