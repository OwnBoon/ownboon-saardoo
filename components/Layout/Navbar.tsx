import React from 'react';
import Image from 'next/image';

interface Props {
  icon: string,
  text: string;
}

const Navbar = ({ icon, text }: Props) => {
  return (
    <div
      className='w-full border-b-2 border-[#1B1F3A] flex items-center justify-between px-6 py-2'
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
      <div className="flex items-center gap-10">
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
      </div>
    </div>
  );
};

export default Navbar;