import Link from "next/link";
import React, { DOMAttributes, MouseEventHandler, useState } from "react";
import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useGetSongsByGenreQuery } from "../../redux/services/shazamCore";
import Loader from "./components/Loader";
import Error from "./components/Error";
import { genres } from "../../assets/constants";
import SongCard from "./components/SongCard";
import { GetServerSideProps } from "next";
import { fetchUsers } from "../../utils/fetchUsers";
import { fetchGoals } from "../../utils/fetchGoals";
import { Goals, Notes, User, UserBody } from "../../typings";
import Draggable, { DraggableCore } from "react-draggable";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import LargeCard from "../dashboard/LargeCard";
import { useUser } from "@clerk/nextjs";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });
interface Props {
  users: User[];
  goals: Goals[];
  notes: Notes[];
}

interface Types {
  handleSubmit: MouseEventHandler<HTMLDivElement>;
  text: string;
  match: Notes[];
  setText: React.Dispatch<React.SetStateAction<string>>;
}
const links = [{ name: "Discover", to: "/focus/lofi", icon: HiOutlineHome }];

const Notemenu = ({ handleSubmit, text, match, setText }: Types) => {
  return (
    <div className="relative">
      <div className="space-y-10 w-80 absolute   col-span-4 cursor-pointer bg-black/10 outline-none px-2  ">
        <h1 className="text-white cursor-pointers">Notes For Today</h1>
        <div className="     h-60">
          {/* <textarea
      rows={8}
      onChange={(e) => setNotes(e.target.value)}
      value={notes || match[0].notes}
      className="w-full pr-5 text-sm bg-black text-white outline-none border-none rounded-lg "
    /> */}
          <div
            onClick={handleSubmit}
            className="bg-black/10 text-white hover:scale-110 z-50 w-fit p-2 rounded-lg cursor-pointer text-sm "
          >
            Save
          </div>
          <ReactQuill
            theme="snow"
            className="h-60 w-72 !bg-black/30 rounded-lg outline-none !border-none text-white"
            value={text || match[0]?.note}
            onChange={setText}
          />
        </div>
      </div>
    </div>
  );
};

const NavLinks = ({ handleClick }: any) => {
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state: any) => state.player);
  const { activeSong, isPlaying } = useSelector((state: any) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "544711374"
  );

  const genreTitle = genres.find(
    ({ value }: any) => value === genreListId
  )?.title;
  return (
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
};

const Sidebar = ({ users, goals, notes }: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const [note, setNote] = useState(false);
  const [todo, setTodo] = useState(false);
  const [text, SetText] = useState("");
  const match = notes.filter(
    (note) => note.email === user?.emailAddresses[0].emailAddress
  );
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const mutations: Notes = {
      _type: "notes",
      note: text,
      email: user?.emailAddresses[0].emailAddress!,
      topic: ""
    };

    const result = await fetch(`/api/addNotes`, {
      body: JSON.stringify(mutations),
      method: "POST",
    });

    const json = await result.json();
    return json;
  };
  return (
    <>
      <div className="md:flex hidden flex-col  w-[240px] py-10 px-4 ">
        <div className="flex justify-center ">
          <img
            src={user?.profileImageUrl}
            alt="logo"
            className="w-20 h-20 rounded-full ring "
          />
        </div>
        <NavLinks />
        <div className="flex flex-col  justify-center space-y-5 items-start my-8 text-sm font-medium ">
          {" "}
          <div
            onClick={() => {
              note ? setNote(false) : setNote(true);
            }}
            className="flex text-gray-400 hover:text-cyan-400 items-center  w-full cursor-pointer"
          >
            <HiOutlineHashtag className="w-6 h-6 mr-2" />
            <p className="flex justify-between w-full items-center">
              Notes
              <span className="text-gray-600 text-3xl hover:text-black/50 hover:scale-125 z-50">
                +
              </span>
            </p>
          </div>
          <div
            onClick={() => {
              todo ? setTodo(false) : setTodo(true);
            }}
            className="flex text-gray-400 hover:text-cyan-400 cursor-pointer"
          >
            <HiOutlineHashtag className="w-6 h-6 mr-2" />
            Todos
          </div>
        </div>
        {note ? (
          <Draggable>
            <div>
              <Notemenu
                handleSubmit={handleSubmit}
                match={match}
                text={text}
                setText={SetText}
              />
            </div>
          </Draggable>
        ) : null}
        {todo ? (
          <Draggable>
            <div className=" relative    w-full">
              <div className="absolute p-5 col z-50  bg-black/30 rounded-lg">
                <p className="text-2xl text-white">
                  Today's <span className="font-semibold">Todos</span>
                </p>
                {/* @ts-ignore */}
                <LargeCard user={users} goals={goals} />
              </div>
            </div>
          </Draggable>
        ) : null}
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
