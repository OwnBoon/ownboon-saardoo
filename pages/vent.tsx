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
  const socket = socketIO.connect(
    "https://socketio-ownboon-server.saard00vfx.repl.co"
  );
  const { data: session } = useSession();
  const userName = session?.user?.name || "idk";
  const pfp = session?.user?.image || "";

  useEffect(() => {
    localStorage.setItem("userName", userName);
    localStorage.setItem("pfp", pfp);
    socket.emit("newUser", { userName, socketID: socket.id, pfp });
  }, []);
  return (
    <div className="grid grid-cols-12 bg-[#f4f1eb]/50">
      <Sidebar />
      {/* <Main /> */}
      <ChatPage socket={socket} />
      <Progress />
    </div>
  );
};

export default vent;
