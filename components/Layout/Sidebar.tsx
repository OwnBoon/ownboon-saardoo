import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Dialog from "../ChapterPopup/ChapterPopup";

interface Props {
  border: string;
}

const Sidebar = ({ border }: Props) => {
  const router = useRouter();
  const selected =
    "transition-all duration-155 brightness-125 w-fit cursor-pointer flex items-center gap-8 text-white";
  const normal = "w-fit cursor-pointer flex items-center text-gray-400 gap-8";
  const [showBuddyModal, setShowBuddyModal] = React.useState(false);
  const [showChatsModal, setShowChatsModal] = useState(false)
  const [showSocialsModal, setShowSocialsModal] = useState(false)
  return (
    <>
      <div
        className={` h-screen w-[11vw]  text-[#FFFFFF] text-[15px] flex flex-col items-start justify-between p-5 border-r-2 border-[#1B1F3A] fixed`}
      >
        <div className="logo flex flex-col   gap-y-8">
          <div className="flex flex-row  gap-8 items-center">
            <img className="w-[55px]" src="ownboon.svg" />
            <span className="font-fontspring ">OwnBoon</span>
          </div>
          <div className="flex flex-col  justify-center gap-y-8">
            <div
           onClick={() => setShowSocialsModal(true)}
            //   onClick={() => router.push("/socials")}
              className={router.pathname == "/socials" ? selected : normal}
            >
              <Image
                src="socials.svg"
                alt={""}
                width={55}
                height={55}
                className=" p-2  rounded  "
              />
              <span className="font-fontspring text-[15px]">Socials</span>
            </div>
            <div
              onClick={() =>setShowChatsModal(true)}
            //   onClick={() => router.push("/chats")}
              className={router.pathname == "/chats" ? selected : normal}
            >
              <Image
                src="chat.svg"
                width={55}
                height={55}
                alt={""}
                className=" p-2 rounded  "
              />
              <span className="font-fontspring text-[15px]">Chats</span>
            </div>
            <div
              onClick={() =>setShowBuddyModal(true)}
            //   onClick={() => router.push("/buddies")}
              className={router.pathname == "/buddies" ? selected : normal}
            >
              <Image
                src="buddies.svg"
                width={55}
                height={55}
                alt={""}
                className=" p-2 rounded  "
              />
              <span className="font-fontspring">Buddies</span>
            </div>
            <div
              onClick={() => router.push("/workspace")}
              className={router.pathname == "/workspace" ? selected : normal}
            >
              <Image
                src="workspace.svg"
                width={55}
                height={55}
                alt={""}
                className=" p-2 rounded  "
              />
              <span className="font-fontspring">Workspace</span>
            </div>
            <div
              onClick={() => router.push("/roadmap")}
              className={router.pathname == "/roadmap" ? selected : normal}
            >
              <Image
                src="roadmap.svg"
                width={55}
                height={55}
                alt={""}
                className=" p-2 rounded  "
              />
              <span className="font-fontspring">Roadmap</span>
            </div>
            <div
              onClick={() => router.push("/lofi")}
              className={router.pathname == "/lofi" ? selected : normal}
            >
              <Image
                src="workspace.svg"
                width={55}
                height={55}
                alt={""}
                className=" p-2 rounded  "
              />
              <span className="font-fontspring">Lofi</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8"></div>
        <div className="p-2 flex gap-4 items-center text-white">
          <Image
            src="feedback.svg"
            width={55}
            height={55}
            alt={""}
            className=" p-2 rounded  "
          />
          <span className="font-fontspring">Feedback</span>
        </div>
      </div>
      <Dialog isOpen={showBuddyModal} onClose={setShowBuddyModal}>
        <div className="flex items-center w-[30vw] h-full justify-center flex-col ">
            <div className="flex flex-col p-5 items-center justify-center">
                <h1 className="text-[3vw] my-2  text-white text-center ">Empowering Buddies</h1>
        <div className="w-44 h-[0px] border border-neutral-400"></div>
        <h2 className="text-[1vw] my-2  text-white text-center italic font-semibold">Find Your Self Development Buddy</h2>
            </div>
        <button className="py-2 px-4 my-2 bg-white rounded-3xl text-[0.9vw]">Coming Soon</button>
        </div>
      </Dialog>
      <Dialog isOpen={showSocialsModal} onClose={setShowSocialsModal}>
        <div className="flex items-center w-[30vw] h-full justify-center flex-col ">
            <div className="flex flex-col p-5 items-center justify-center">
                <h1 className="text-[3vw] my-2  text-white text-center ">Healthy Social Media</h1>
        <div className="w-44 h-[0px] border border-neutral-400"></div>
        <h2 className="text-[1vw] my-2  text-white text-center italic font-semibold">The Only Healthy Social Media for your self improvement journey with the use of ai</h2>
            </div>
        <button className="py-2 px-4 my-2 bg-white rounded-3xl text-[0.9vw]">Coming Soon</button>
        </div>
      </Dialog>
      <Dialog isOpen={showChatsModal} onClose={setShowChatsModal}>
        <div className="flex items-center w-[30vw] h-full justify-center flex-col ">
            <div className="flex flex-col p-5 items-center justify-center">
                <h1 className="text-[3vw] my-2  text-white text-center ">Tailored Group Chats</h1>
        <div className="w-44 h-[0px] border border-neutral-400"></div>
        <h2 className="text-[1vw] my-2  text-white text-center italic font-semibold">Learn, Grow and Share your Experience with the world</h2>
            </div>
        <button className="py-2 px-4 my-2 bg-white rounded-3xl text-[0.9vw]">Coming Soon</button>
        </div>
      </Dialog>
    </>
  );
};

export default Sidebar;
