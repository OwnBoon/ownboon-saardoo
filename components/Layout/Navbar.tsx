import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Loading } from "@nextui-org/react";

interface Props {
  icon: string;
  text: string;
  bgColor: string;
  border: string;
  showsidebar: boolean;
  setLoading?: (value: boolean) => void;
}

const Navbar = ({ icon, text, bgColor, border, showsidebar,setLoading }: Props) => {
  const { user } = useUser();
  const [showsearch, setshowsearch] = useState(false);
  const [search, setSearch] = useState("");
  const handlesearch = (e: React.FormEvent<HTMLFormElement>)  => {
    e.preventDefault();
    setLoading? setLoading(true): "";
    setshowsearch(false)
    setSearch("")
  };
  useEffect(() => {
    setLoading? setLoading(false): "";
    setSearch("")
  }, []);

  return (
    <>
      <div
        className={`${
          showsidebar ? "w-[89vw]" : "w-[95vw] ml-[-1vw]"
        } border-b-2 border-gray-700 flex items-center justify-between px-8 py-3 fixed z-50`}
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
            onClick={() => setshowsearch(true)}
            className={`p-2 ${
              showsearch ? "hidden" : ""
            } rounded hover:brightness-150 fade transition-all cursor-pointer`}
            src="search.svg"
            alt={"search"}
          />
          {showsearch && (
            <form
              onSubmit={(e) => handlesearch(e)}
              className="flex flex-row items-center justify-center"
            >
              <input
                type={"text"}
                value={search}
                name="search"
                aria-multiline={false}
                id="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-[10vw] h-[2vw] active:border-gray-400  text-md text-white bg-transparent backdrop-blur-3xl font-poppins pageentry  border-b border-t-0 border-r-0 border-l-0 border-gray-400 "
              ></input>
              <Image
                width={45}
                height={45}
                onClick={() => setshowsearch(false)}
                className={`p-2  fade rounded hover:brightness-150 transition-all cursor-pointer`}
                src="cancel.svg"
                alt={"cancel"}
              />
            </form>
          )}
          <Image
            width={70}
            height={70}
            className=" p-2 rounded hover:brightness-150 transition-all cursor-pointer"
            src="notification.svg"
            alt={"notification"}
          />
          <div className="flex items-center gap-2 text-[#DDDDDD] cursor-pointer">
            {user && <UserButton />}
            <span className="text-[15px]">{user?.username}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
