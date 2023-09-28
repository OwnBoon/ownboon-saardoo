import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Dialog from "../ChapterPopup/ChapterPopup";
import Link from "next/link";

interface Props {
  border: string;
  showsidebar: boolean;
  setShowsidebar: (value: boolean) => void;
}

const Sidebar = ({ border, showsidebar, setShowsidebar }: Props) => {
  const router = useRouter();
  const selected =
    "transition-all duration-50 sidebar brightness-150 w-fit cursor-pointer flex items-center gap-y-8 gap-x-4 text-white";
  const normal =
    "w-fit cursor-pointer sidebar brightness-[-50] flex items-center text-gray-400 gap-y-8 gap-x-4";
  const [showBuddyModal, setShowBuddyModal] = React.useState(false);
  const [showChatsModal, setShowChatsModal] = useState(false);
  const [showSocialsModal, setShowSocialsModal] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setShowsidebar(true)}
        onMouseLeave={() => setShowsidebar(false)}
        className={`h-screen transition-all fixed z-10 duration-[2000] bg-[#101010] p-[3px] md:p-2 lg:p-3 border-r-2  border-[#3a3a3b] mr-[2px] ${
          !showsidebar
            ? "w-[60px] md:w-[80px] lg:w-[90px]"
            : "w-[240px] bg-[#101010]"
        }  text-[#FFFFFF] text-[15px] flex flex-col items-start justify-between  `}
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
                src="socials.svg"
                alt={""}
                width={55}
                height={55}
                className=" p-2  rounded  "
              />

              <span
                className={
                  showsidebar
                    ? "font-fontspring transition-all opacity-100  "
                    : "opacity-0"
                }
              >
                Socials
              </span>
            </Link>
            <Link
              href={"/chat"}
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
              <span
                className={
                  showsidebar
                    ? "font-fontspring transition-all opacity-100  "
                    : "opacity-0"
                }
              >
                Chats
              </span>
            </Link>
            <div
              onClick={() => setShowBuddyModal(true)}
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
              <span
                className={
                  showsidebar
                    ? "font-fontspring transition-all opacity-100  "
                    : "opacity-0"
                }
              >
                Buddies
              </span>
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
              <span
                className={
                  showsidebar
                    ? "font-fontspring transition-all opacity-100  "
                    : "opacity-0"
                }
              >
                Workspace
              </span>
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
              <span
                className={
                  showsidebar
                    ? "font-fontspring transition-all opacity-100  "
                    : "opacity-0"
                }
              >
                Roadmap
              </span>
            </div>
            <div
              onClick={() => router.push("/lofi")}
              className={router.pathname == "/lofi" ? selected : normal}
            >
              <Image
                src="lofi.svg"
                width={55}
                height={55}
                alt={""}
                className=" p-2 rounded  "
              />
              <span
                className={
                  showsidebar
                    ? "font-fontspring transition-all opacity-100  "
                    : "opacity-0"
                }
              >
                Lofi
              </span>
            </div>
          </div>
          <div className={router.pathname == "/lofi" ? selected : normal}>
            <Image
              src="feedback.svg"
              width={55}
              height={55}
              alt={""}
              className=" p-2 rounded  "
            />
            <span
              className={
                showsidebar
                  ? "font-fontspring transition-all opacity-100  "
                  : "opacity-0"
              }
            >
              Feedback
            </span>
          </div>
        </div>
      </div>
      <Dialog isOpen={showBuddyModal} onClose={setShowBuddyModal}>
        <div className="rounded-xl bg-[#101010] p-16">
          <div className="flex items-center w-[30vw] h-full justify-center flex-col ">
            <div className="flex flex-col p-5 items-center justify-center">
              <h1 className="text-[3vw] my-2  text-white text-center ">
                Empowering Buddies
              </h1>
              <div className="w-44 h-[0px] border border-neutral-400"></div>
              <h2 className="text-[1vw] my-2  text-white text-center italic font-semibold">
                Find Your Self Development Buddy
              </h2>
            </div>
            <button className="py-2 px-4 my-2 bg-white rounded-3xl text-[0.9vw]">
              Coming Soon
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog isOpen={showSocialsModal} onClose={setShowSocialsModal}>
        <div className="rounded-xl bg-[#101010] p-16">
          <div className="flex items-center  w-[30vw] h-full justify-center flex-col ">
            <div className="flex flex-col p-5 items-center justify-center">
              <h1 className="text-[3vw] my-2  text-white text-center ">
                Healthy Social Media
              </h1>
              <div className="w-44 h-[0px] border border-neutral-400"></div>
              <h2 className="text-[1vw] my-2  text-white text-center italic font-semibold">
                The Only Healthy Social Media for your self improvement journey
                with the use of ai
              </h2>
            </div>
            <button className="py-2 px-4 my-2 bg-white rounded-3xl text-[0.9vw]">
              Coming Soon
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog isOpen={showChatsModal} onClose={setShowChatsModal}>
        <div className="rounded-xl bg-[#101010] p-16">
          <div className="flex items-center w-[30vw] h-full justify-center flex-col ">
            <div className="flex flex-col p-5 items-center justify-center">
              <h1 className="text-[3vw] my-2  text-white text-center ">
                Tailored Group Chats
              </h1>
              <div className="w-44 h-[0px] border border-neutral-400"></div>
              <h2 className="text-[1vw] my-2  text-white text-center italic font-semibold">
                Learn, Grow and Share your Experience with the world
              </h2>
            </div>
            <button className="py-2 px-4 my-2 bg-white rounded-3xl text-[0.9vw]">
              Coming Soon
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Sidebar;
