import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Goals, User } from "../typings";
import { useUser } from "@clerk/nextjs";
interface Props {
  shownotifications: boolean;
  setShownotifications?: (value: boolean) => void;
  notifications: Goals[];
  match?: User[];
}

export default function Notification({
  setShownotifications,
  shownotifications,
  notifications,
  match,
}: Props) {
  const now = new Date();
  const { user, isLoaded, isSignedIn } = useUser();
  const [boonNoti, setBoonNoti] = useState("");

  useEffect(() => {
    if (match) {
      if (Number(match[0].focus) < 250) {
        if (Number(match[0].focus) > 200) {
          setBoonNoti("You are 50 points from level 5");
        }
      }
    }
  }, [match]);

  return (
    <div
      className={`flex flex-col fade fixed right-3 rounded-b-2xl  w-[300px] max-h-[90vh] transition-all duration-[2000] overflow-y-scroll ${
        shownotifications ? "translate-y-0 top-24" : "-translate-y-[100vh] "
      } shadow-2xl  p-1  z-30 items-center bg-[#101010]`}
    >
      <div className="flex flex-col  items-center justify-center">
        <h1 className=" cursor-pointer my-2 tracking-tight  text-white text-center ">
          Notifications
        </h1>
        <div className="w-44 h-[0px] border border-neutral-400 mb-1"></div>
      </div>
      <div className="flex flex-col w-full justify-center space-y-6 my-2 text-white">
        <div className="space-y-1 flex flex-col  items-center p-2 w-full h-full">
          {notifications && notifications.length ? (
            <>
              {notifications.map((notification, index) => (
                <div
                  className={
                    index === 0
                      ? "flex p-2 bg-[#212121] cursor-pointer border-b hover:border-b-2 hover:border-b-white/20 rounded-t-2xl w-full flex-row px-5  transition-all duration-50 space-x-4"
                      : "flex p-2 bg-[#212121] cursor-pointer rounded-lg w-full hover:border-b-2 transition-all duration-50 flex-row px-5   space-x-4"
                  }
                >
                  <div className="flex flex-col">
                    <h2 className="text-gray-400 font-extralight font-poppins text-md">
                      Task Due in a while
                    </h2>
                    <Link
                      href={"/workspace"}
                      className="text-white hover:underline-offset-4 font-extralight font-poppins text-lg md:text-lg"
                    >
                      {notification.title}
                    </Link>
                  </div>
                </div>
              ))}
            </>
          ) : null}

          <div
            className={
              "flex p-2 bg-[#212121] cursor-pointer rounded-lg w-full hover:border-b-2 transition-all duration-50 flex-row px-5   space-x-4"
            }
          >
            {boonNoti ? (
              <div className="flex flex-col">
                <h2 className="text-gray-400 font-extralight font-poppins text-md">
                  Congratulations
                </h2>
                <Link
                  href={"/workspace"}
                  className="text-white hover:underline-offset-4 font-extralight font-poppins text-lg md:text-lg"
                >
                  {boonNoti}
                </Link>
              </div>
            ) : (
              <div className="flex flex-col bg-cover p-2 bg-[#212121] cursor-pointer rounded-t-2xl w-full flex-row px-5  transition-all duration-50 space-x-4">
                <img
                  className=""
                  src="https://cdn.sanity.io/images/mrfd4see/production/a94ecfa3fd0cf934272fc5cfaa83beeffc358235-500x394.png?w=2000&fit=max&auto=format"
                />
                <div className="text-white">Nothing to show here</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
