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
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const vent = () => {
  const router = useRouter();
  const [room, setRoom] = useState("");
  const { isLoaded, isSignedIn, user } = useUser();
  // @ts-ignore

  return (
    <div className="grid grid-cols-12 h-screen bg-[#f4f1eb]/50">
      <Sidebar />
      {/* <Main /> */}
      <div className="col-span-9 flex flex-col justify-center items-center">
        <h1>Home Page</h1>

        <div>
          <input
            placeholder="Room"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
            required
          />
        </div>
        <Link
          onClick={(e) => (!room ? e.preventDefault() : null)}
          href={`/chat?name=${user?.username || user?.firstName}&room=${room}`}
        >
          <button type="submit">Enter room</button>
        </Link>
      </div>
      <Progress />
    </div>
  );
};

export default vent;
