import React from "react";
import Image from "next/image";
import {
  HomeIcon,
  RectangleStackIcon,
  ClockIcon,
  ChatBubbleBottomCenterIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
const Sidebar = () => {
  const router = useRouter();
  const selected =
    "bg-[#4b9afa] hover:bg-[#4b9afa]/70 transition-all duration-150 w-fit p-2 cursor-pointer rounded-full text-white";
  const normal = "p-2 w-fit cursor-pointer flex items-center gap-4";
  return (
    <div className="flex flex-col col-span-1 h-screen items-start p-5 justify-between w-1/3">
      <div className="logo flex justify-between items-center gap-2" >
        <img src="ownboon.svg" />
        <span>OwnBoon</span>
      </div>
      <div className="flex flex-col gap-5">
        <div
          onClick={() => router.push("/dashboard")}
          className={router.pathname == "/dashboard" ? selected : normal}
        >
          <Image
            src="socials.svg"
            width={35}
            height={35}
            alt={""}
            className="bg-[#1B1F3A] p-2 rounded border-2 border-[#1B1F3A]"
          />
          <span>Socials</span>
        </div>
        <div
          onClick={() => router.push("/socials")}
          className={router.pathname == "/socials" ? selected : normal}
        >
          <Image
            src="chat.svg"
            width={35}
            height={35}
            alt={""}
            className="bg-[#1B1F3A] p-2 rounded border-2 border-[#1B1F3A]"
          />
          <span>Chats</span>
        </div>
        <div
          onClick={() => router.push("/workspace")}
          className={router.pathname == "/workspace" ? selected : normal}
        >
          <Image
            src="buddies.svg"
            width={35}
            height={35}
            alt={""}
            className="bg-[#1B1F3A] p-2 rounded border-2 border-[#1B1F3A]"
          />
          <span>Buddies</span>
        </div>
        <div
          onClick={() => router.push("/vent-choose")}
          className={router.pathname == "/vent-choose" ? selected : normal}
        >
          <Image
            src="workspace.svg"
            width={35}
            height={35}
            alt={""}
            className="bg-[#1B1F3A] p-2 rounded border-2 border-[#1B1F3A]"
          />
          <span>Workspace</span>
        </div>
        <div
          onClick={() => router.push("/roadmap")}
          className={router.pathname == "/roadmap" ? selected : normal}
        >
          <Image
            src="roadmap.svg"
            width={35}
            height={35}
            alt={""}
            className="bg-[#1B1F3A] p-2 rounded border-2 border-[#1B1F3A]"
          />
          <span>Roadmap</span>
        </div>
      </div>
      <div className="p-2 flex gap-4 items-center text-[#2CD3E1]">
        <Image
          src="feedback.svg"
          width={35}
          height={35}
          alt={""}
          className="bg-[#1B1F3A] p-2 rounded border-2 border-[#1B1F3A]"
        />
        <span>Feedback</span>
      </div>
    </div>
  );
};

export default Sidebar;
