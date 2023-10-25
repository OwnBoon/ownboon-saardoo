import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Dialog from "../ChapterPopup/ChapterPopup";
import Link from "next/link";
import { Box, Drawer, SwipeableDrawer } from "@mui/material";

interface Props {
  border: string;
  showsidebar: boolean;
  setShowsidebar: (value: boolean) => void;
  window?: () => Window;
}
const drawerBleeding = 56;
const Sidebar = ({ border, showsidebar, setShowsidebar, window }: Props) => {
  const [open, setOpen] = React.useState(false);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const router = useRouter();
  const selected =
    "transition-all duration-50 sidebar brightness-150 w-fit cursor-pointer flex items-center gap-y-8 gap-x-4 text-white";
  const normal =
    "w-fit cursor-pointer sidebar brightness-[-50] flex items-center text-gray-400 gap-y-8 gap-x-4";
  const [showBuddyModal, setShowBuddyModal] = React.useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = React.useState(false);
  const [showChatsModal, setShowChatsModal] = useState(false);
  const [showSocialsModal, setShowSocialsModal] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowsidebar(true)}
      onMouseLeave={() => setShowsidebar(false)}
      className={`h-screen  transition-all group hidden  md:inline-flex lg:inline-flex fixed z-50 duration-[2000]  p-[3px] md:p-2 lg:p-2 border-r-2  border-[#3a3a3b]   w-[60px] md:w-[80px] lg:w-[90px]
          hover:w-[240px] bg-[#101010]
       text-[#FFFFFF] text-[15px]  flex-col items-start justify-between  `}
    >
      <div className="logo flex flex-col transition-all   gap-y-8">
        <div className="flex flex-row transition-all gap-4 items-center">
          <img
            src="https://ownboon.com/_next/image?url=%2Flogo.png&w=48&q=75"
            alt={""}
            width={55}
            height={55}
            className=" p-2  rounded  "
          />
          <span
            className={
              showsidebar
                ? "opacity-100 transition-all duration-100"
                : "opacity-0 transition-all duration-100"
            }
          >
            OwnBoon
          </span>
        </div>
        <div className="flex  flex-col transition-all justify-center  gap-y-8">
          <Link
            href={"/socials"}
            //   onClick={() => router.push("/socials")}
            className={router.pathname == "/socials" ? selected : normal}
          >
            <Image
              src="/socials.svg"
              alt={""}
              width={55}
              height={55}
              className=" p-2  rounded  "
            />
            {showsidebar && (
              <span className="font-fontspring inline-flex duration-150 w-0 fade2 text-xs -mx-20 group-hover:-mx-0 group-hover:text-base group-hover:w-fit   transition-all opacity-100  ">
                Socials
              </span>
            )}
          </Link>
          <Link
            href={"/chat"}
            //   onClick={() => router.push("/chats")}
            className={router.pathname == "/chat" ? selected : normal}
          >
            <Image
              src="/chat.svg"
              width={55}
              height={55}
              alt={""}
              className=" p-2 rounded  "
            />
            {showsidebar && (
              <span className="font-fontspring inline-flex duration-150 w-0 fade2 text-xs -mx-20 group-hover:-mx-0 group-hover:text-base group-hover:w-fit   transition-all opacity-100  ">
                Chats
              </span>
            )}
          </Link>
          <div
            onClick={() => setShowBuddyModal(true)}
            //   onClick={() => router.push("/buddies")}
            className={router.pathname == "/buddies" ? selected : normal}
          >
            <Image
              src="/buddies.svg"
              width={55}
              height={55}
              alt={""}
              className=" p-2 rounded  "
            />
            {showsidebar && (
              <span className="font-fontspring inline-flex duration-150 w-0 fade2 text-xs -mx-20 group-hover:-mx-0 group-hover:text-base group-hover:w-fit   transition-all opacity-100  ">
                Buddies
              </span>
            )}
          </div>
          <div
            onClick={() => router.push("/workspace")}
            className={router.pathname == "/workspace" ? selected : normal}
          >
            <Image
              src="/workspace.svg"
              width={55}
              height={55}
              alt={""}
              className=" p-2 rounded  "
            />
            {showsidebar && (
              <span className="font-fontspring inline-flex duration-150 w-0 fade2 text-xs -mx-20 group-hover:-mx-0 group-hover:text-base group-hover:w-fit   transition-all opacity-100  ">
                Workspace
              </span>
            )}
          </div>
          <div
            onClick={() => router.push("/roadmap")}
            className={router.pathname == "/roadmap" ? selected : normal}
          >
            <Image
              src="/roadmap.svg"
              width={55}
              height={55}
              alt={""}
              className=" p-2 rounded  "
            />
            {showsidebar && (
              <span className="font-fontspring inline-flex duration-150 w-0 fade2 text-xs -mx-20 group-hover:-mx-0 group-hover:text-base group-hover:w-fit   transition-all opacity-100  ">
                Roadmaps
              </span>
            )}
          </div>
          <div
            onClick={() => router.push("/lofi")}
            className={router.pathname == "/lofi" ? selected : normal}
          >
            <Image
              src="/lofi.svg"
              width={55}
              height={55}
              alt={""}
              className=" p-2 rounded  "
            />
            {showsidebar && (
              <span className="font-fontspring inline-flex duration-150 w-0 fade2 text-xs -mx-20 group-hover:-mx-0 group-hover:text-base group-hover:w-fit   transition-all opacity-100  ">
                Lofi
              </span>
            )}
          </div>
        </div>

        <Dialog isOpen={showFeedbackModal} onClose={setShowFeedbackModal}>
          <div className="rounded-xl bg-[#101010] p-16">
            <div className="flex items-center w-[30vw] h-full justify-center flex-col ">
              <div className="flex flex-col p-5 items-center justify-center">
                <h1 className="text-[2vw] my-2  text-white text-center ">
                  Your Feedback Matters!
                </h1>
                <div className="w-44 h-[0px] border border-neutral-400"></div>
                <div className="flex flex-row space-x-4 p-4 justify-between">
                  <div className="flex flex-col">
                    <iframe
                      src="https://discord.com/widget?id=1100319628984598548&theme=dark"
                      width="350"
                      height="500"
                      allowTransparency={true}
                      frameBorder={0}
                      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    ></iframe>
                  </div>
                  <div className="flex flex-col  ">
                    <p className="md:text-[1.6vw] text-[2vw]">
                      Join our discord community to get latest updates and
                      announcements
                    </p>
                    <a
                      href="https://discord.gg/Aje9uqBMvr"
                      className="py-2 px-4 text-center  bg-[#7289da] text-black rounded-3xl text-[2vw] md:text-[0.9vw]"
                    >
                      Join Discord
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>

        <Dialog isOpen={showBuddyModal} onClose={setShowBuddyModal}>
          <div className="rounded-xl bg-[#101010] p-16">
            <div className="flex items-center w-[30vw] h-full justify-center flex-col ">
              <div className="flex flex-col p-5 items-center justify-center">
                <h1 className="text-[2vw] my-2  text-white text-center ">
                  Empowering Buddies
                </h1>
                <div className="w-44 h-[0px] border border-neutral-400"></div>
                <h2 className="text-[1vw] my-2  text-white text-center italic font-semibold">
                  Find Your Self Development Buddy
                </h2>
              </div>
              <button className="py-2 px-4 my-2 bg-white text-black rounded-3xl text-[0.9vw]">
                Coming Soon
              </button>
            </div>
          </div>
        </Dialog>
      </div>
      <div
        onClick={() => setShowFeedbackModal(true)}
        className={
          router.pathname == "/feedback"
            ? `${selected}  pb-3`
            : `${normal} pb-6`
        }
      >
        <Image
          src="/feedback.svg"
          width={55}
          height={55}
          alt={""}
          className=" p-2 rounded  "
        />
        {showsidebar && (
          <span className="font-fontspring inline-flex duration-150 w-0 fade2 text-xs -mx-20 group-hover:-mx-0 group-hover:text-base group-hover:w-fit   transition-all opacity-100  ">
            Feedback
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
