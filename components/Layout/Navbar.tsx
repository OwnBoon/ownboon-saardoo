import React from 'react';
import Image from 'next/image';
import { useUser, UserButton } from '@clerk/nextjs';


interface Props {
  icon: string,
  text: string;
  bgColor: string;
}

const Navbar = ({ icon, text, bgColor }: Props) => {

  const { user } = useUser();

  return (
    <div
      className={`w-4/5 border-b-2 border-[#1B1F3A] flex items-center justify-between px-6 py-2 fixed bg-[#${bgColor}]`}
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
        {user && <UserButton />}
      </div>
    </div>
  );
};

export default Navbar;