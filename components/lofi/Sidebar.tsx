import Link from "next/link";
import React, { useState } from "react";
import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

const links = [{ name: "Discover", to: "/focus/lofi", icon: HiOutlineHome }];

const NavLinks = ({ handleClick }: any) => (
  <div className="mt-10">
    {links.map((item) => (
      <Link
        key={item.name}
        href={item.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </Link>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col  w-[240px] py-10 px-4 bg-gradient-to-b from-[#191624] to-[#85050c]">
        <img
          src="https://ownboon-practice.vercel.app/_next/image?url=%2Flogo.png&w=64&q=75"
          alt="logo"
          className="w-full h-14 object-contain rounded-full"
        />
        <NavLinks />
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className="w-6 h-6 cursor-pointer mr-2 text-white"
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img
          src="https://ownboon-practice.vercel.app/_next/image?url=%2Flogo.png&w=64&q=75"
          alt="logo"
          className="w-full h-14 object-contain"
        />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
