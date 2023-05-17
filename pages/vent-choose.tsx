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

  return (
    <div className="grid grid-cols-12 h-screen bg-[#f4f1eb]/50">
      <Sidebar />
      {/* <Main /> */}
      <div className="col-span-9 flex flex-col  justify-center items-center">
        <p>Choose your Vent</p>
        <div className="flex p-5 gap-20">
          {/* First */}

          <div
            onClick={() => router.push("/vent-group")}
            className="text-3xl  "
          >
            Vent Group
          </div>
          {/* Second */}
          <div onClick={() => router.push("/vent")} className="text-3xl">
            Vent Chat
          </div>
        </div>
      </div>
      <Progress />
    </div>
  );
};

export default vent;
