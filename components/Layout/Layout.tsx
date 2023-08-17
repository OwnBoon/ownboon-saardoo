import React, { ReactNode, useState } from "react";
import Head from "next/head";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useUser } from "@clerk/nextjs";

interface Props {
  children?: ReactNode;
  bgColor: string;
  icon: string;
  text: string;
  border: string;
  hasBg: Boolean;
}

const Layout = ({ children, bgColor, icon, text, border, hasBg }: Props) => {
  const [showsidebar, setShowsidebar] = useState(false);
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
        className={`${showsidebar ? "w-[89vw]" : "w-[94vw]"
          }  ml-auto transition-all`}
      >
        <Navbar
          showsidebar={showsidebar}
          icon={icon}
          text={text}
          bgColor={bgColor}
          border={border}
        />
        <div
          className={`text-[#DDDDDD] py-20 ${!showsidebar ? "pl-5" : "pl-11"} max-h-full`}
          style={{
            backgroundImage: hasBg ? "url(lofi.svg)" : "none",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
