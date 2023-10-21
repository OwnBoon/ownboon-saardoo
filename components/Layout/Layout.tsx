import React, { ReactNode, useState } from "react";
import Head from "next/head";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Goals, User } from "../../typings";
import SidebarMobile from "./SidebarMobile";
import Sidebarfix from "./Sidebarfix";
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


  return (
    <div
      className={`w-full overflow-hidden flex min-h-screen`}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <Head>
        <title>{text.charAt(0).toUpperCase() + text.slice(1)} | OwnBoon</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      {text == "Users" ? (
        <div className="!md:inline-flex  ">
          <Sidebarfix
            showsidebar={showsidebar}
            setShowsidebar={setShowsidebar}
            border={border}
          />
        </div>
      ) : (
        <Sidebar
          showsidebar={showsidebar}
          setShowsidebar={setShowsidebar}
          border={border}
        />
      )}

      <SidebarMobile />
      <div className="h-screen w-full md:ml-[94px]">
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
          className={`text-[#DDDDDD] ${
            text == "lofi" ? "overflow-hidden " : "overflow-y-scroll"
          }  h-full   pt-24 pb-2    ${!showsidebar ? "" : ""}`}
        >
          {hasBg && (
            <div className="fixed top-0 left-0 w-full h-screen overflow-hidden">
            <video autoPlay loop muted className="object-cover w-full h-full">
              <source src="/lofi.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
