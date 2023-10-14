import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { User } from "../../typings";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Spline from "@splinetool/react-spline";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Dialog from "../ChapterPopup/ChapterPopup";
interface Props {
  users: User[];
  setLoading?: (value: boolean) => void;
  setShowBoonIslandModal?: (value: boolean) => void;
}

const Island = ({ users, setLoading, setShowBoonIslandModal }: Props) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const match = users.filter(
    (usere) => usere.email === user?.emailAddresses[0].emailAddress
  );
  const router = useRouter();

  // const match = users.filter((user) => user.email == session?.user?.email);
  const focus = match[0]?.focus;
  const factor = 0.02;
  const focus_no = Number(focus);
  const level = Math.floor(focus_no! * factor);
  const barlevel = level * 10;
  const [showislandinfo, setShowislandinfo] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading ? setLoading(false) : "";
    }, 500);
  }, []);
  const productivity = Math.floor((focus_no * 10) / 60);

  return (
    <div className="h-[48vw] fade justify-center items-center sm:w-[94.3vw] flex relative w-fit ">
      {user ? (
        <>
          {level < 5 ? (
            <Spline
              className="sm:w-full w-fit"
              scene="https://prod.spline.design/TuCXoIsBkIk0WZMV/scene.splinecode"
            />
          ) : level < 10 ? (
            <div>
              <Spline
                className=""
                scene="https://prod.spline.design/YXg9FOeBh95j4Z8Q/scene.splinecode"
              />
            </div>
          ) : level < 21 ? (
            <Spline
              className=""
              scene="https://prod.spline.design/O0Sl4ywtz-muCqNC/scene.splinecode"
            />
          ) : level < 31 ? (
            <Spline
              className=""
              scene="https://prod.spline.design/q8RK-jgRIn6o4Muj/scene.splinecode"
            />
          ) : level < 41 ? (
            <Spline
              className=""
              scene="https://prod.spline.design/TuCXoIsBkIk0WZMV/scene.splinecode"
            />
          ) : level > 51 ? (
            <Spline
              className=""
              scene="https://prod.spline.design/HQk3zt1YEJNNpIMv/scene.splinecode"
            />
          ) : (
            <Image src={"/boonisland.png"} fill alt={""} />
          )}
          <div className="flex animate-floaty  items-center flex-row gap-y-4 gap-x-6 sm:gap-x-8 shadow-zinc-700 shadow-2xl py-4 sm:py-8 rounded-3xl px-8 sm:px-8 bg-[#191919a8] text-white absolute bottom-4">
            <div className="flex flex-col gap-y-2 justify-center items-center text-center">
              <h1 className="font-poppins text-sm sm:text-md">Current Level</h1>
              <h2 className="font-poppins text-lg sm:text-3xl">{level}</h2>
            </div>
            <div className="w-0 h-8 sm:h-16 border border-neutral-400"></div>
            <div className="flex flex-col gap-y-2 justify-center items-center text-center">
              <h1 className="font-poppins text-sm sm:text-md">Points</h1>
              <h2 className="font-poppins text-lg sm:text-3xl">{focus}</h2>
            </div>
            <div className="w-0 h-8 sm:h-16 border border-neutral-400"></div>
            <div className="flex flex-col gap-y-2 justify-center items-center text-center">
              <h1 className="font-poppins text-sm sm:text-md">Next Level</h1>
              <h2 className="font-poppins text-lg sm:text-3xl">{level + 1}</h2>
            </div>
          </div>
          <div
            onClick={() =>
              setShowBoonIslandModal ? setShowBoonIslandModal(false) : null
            }
            className="flex flex-col text-white rounded-xl fade cursor-pointer absolute shadow-2xl left-6 sm:left-8 top-1 sm:top-5 py-2 sm:py-3 px-4 sm:px-5 bg-[#191919a8] font-poppins text-xl sm:text-2xl"
          >
            {"<-"}
          </div>
          <div
            onClick={() => (setShowislandinfo ? setShowislandinfo(true) : null)}
            className="flex flex-col text-white rounded-xl fade cursor-pointer absolute shadow-2xl right-6 sm:right-8 top-1 sm:top-5 py-2 sm:py-3 px-4 sm:px-6 bg-[#191919a8] font-poppins text-xl sm:text-2xl"
          >
            {"i"}
          </div>
          <Dialog isOpen={showislandinfo} onClose={setShowislandinfo}>
          <div className="flex w-[60vw] sm:w-[40vw] md:w-[50vw] bg-[#191919a8] h-auto md:h-[auto] sm:h-[auto] items-center rounded-xl flex-col">
  <h1 className="font-poppins text-xl sm:text-2xl md:text-3xl mt-8 sm:mt-12">
    Level Name
  </h1>
  <div className="flex flex-col my-3 items-center space-y-2">
    {/* Display the image of the current level of boon island, static image to avoid long loading */}
    <div className="flex flex-col px-4 sm:px-8 space-y-2 text-start items-start">
      <li className="text-sm sm:text-xl md:text-2xl text-white font-poppins">
        You've spent more than {productivity} hours on your productivity
      </li>
      <li className="text-sm sm:text-xl md:text-2xl text-white font-poppins">
        You're a {level < 11 ? "Newbie" : null} because you've solved more than problems on ownboon
      </li>
      <li className="text-sm sm:text-xl md:text-2xl text-white font-poppins">
        You're in one of the top 1% users
      </li>
      <li className="text-sm sm:text-xl md:text-2xl text-white font-poppins">
        You've explored 30% potential of ownboon
      </li>
    </div>
  </div>
</div>

          </Dialog>
        </>
      ) : (
        <Image src={"/boonisland.png"} fill alt={""} />
      )}
    </div>
  );
};

export default Island;
