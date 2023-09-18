import React from "react";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface Props {
  icon: string;
  text: string;
  bgColor: string;
  border: string;
}

const Navbar = ({ icon, text, bgColor, border }: Props) => {
  const { user } = useUser();

  return (
    <div
      className={`w-[80vw] border-b-2 border-gray-700 flex items-center justify-between px-8 fixed z-50`}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className="flex items-center gap-2 text-white">
        <Image width={30} height={30} className="" src={icon} alt={text} />
        <span className="font-fontspring text-[20px]">{text}</span>
      </div>
      <div className="flex items-center gap-10 relative">
        <Image
          width={55}
          height={55}
          className=" p-2 rounded "
          src="search.svg"
          alt={"search"}
        />
        <Image
          width={70}
          height={70}
          className=" p-2 rounded "
          src="notification.svg"
          alt={"notification"}
        />
        <div className="flex items-center gap-2 text-[#DDDDDD] cursor-pointer">
          {user && <UserButton />}
          <span className="text-[15px]">{user?.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
