import React, { ReactNode, useState } from "react";
import Head from "next/head";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Goals, User } from "../../typings";
interface Props {
  children?: ReactNode;
  bgColor: string;
  users?: User[];
  goals?: Goals[];
  icon: string;
  text: string;
  border: string;
  hasBg: Boolean;
  setLoading?: (value: boolean) => void;
}

const Layout = ({
  children,
  bgColor,
  icon,
  text,
  border,
  hasBg,
  users,
  goals,
  setLoading,
}: Props) => {
  const [showsidebar, setShowsidebar] = useState(false);

  const selectRandomBg = () => {
    const bgImages = ["lofi_1.png", "lofi_2.png", "lofi_3.png", "lofi_4.png"];
    const random = Math.floor(Math.random() * bgImages.length);
    return bgImages[random];
  };

  return (
    <div
      className={`w-full flex h-screen`}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <Head>
        <title>{text} | OwnBoon</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <Sidebar
        showsidebar={showsidebar}
        setShowsidebar={setShowsidebar}
        border={border}
      />
      <div
        className={`${
          showsidebar ? "w-[86vw]" : "w-[92vw]"
        }  ml-auto transition-all`}
      >
        <Navbar
          goals={goals}
          users={users}
          setLoading={setLoading}
          showsidebar={showsidebar}
          icon={icon}
          text={text}
          bgColor={bgColor}
          border={border}
        />
        <div
          className={`text-[#DDDDDD] py-24 pb-24 pr-4 ${
            !showsidebar ? "" : ""
          }`}
          style={{
            backgroundImage: hasBg ? `url(${selectRandomBg()})` : "none",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
