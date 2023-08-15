import React from 'react';
import Image from 'next/image';
import { useUser, UserButton } from '@clerk/nextjs';
import {
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

interface Props {
  icon: string,
  text: string;
  bgColor: string;
  border: string;
}

const Navbar = ({ icon, text, bgColor, border }: Props) => {

  const { user } = useUser();

  return (
    <div
      className={`w-4/5 border-b-2 border-[#${border}] flex items-center justify-between px-8 py-2 fixed z-50`}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className="flex items-center gap-2 text-white">
        <Image
          width={20}
          height={20}
          className=""
          src={icon}
          alt={text}
        />
        <span>{text}</span>
      </div>
      <div className="flex items-center gap-10 relative">
        <Image
          width={35}
          height={35}
          className="bg-[#1B1F3A] p-2 rounded border-2 border-[#333858]"
          src='search.svg'
          alt={'search'}
        />
        <Image
          width={35}
          height={35}
          className="bg-[#1B1F3A] p-2 rounded border-2 border-[#333858]"
          src='notification.svg'
          alt={'notification'}
        />
        <div className="flex items-center gap-2 text-[#DDDDDD] cursor-pointer">
          {user && <UserButton />} 
          <span>{user?.username}</span>
          <ChevronDownIcon className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;