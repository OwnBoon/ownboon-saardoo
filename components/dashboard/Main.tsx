import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import LargeCard from "./LargeCard";
import { Goals, Notes as Note, User, UserBody } from "../../typings";
import { PlusIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { UserButton, useUser } from "@clerk/nextjs";
import { Loading } from "@nextui-org/react";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
const Notes = dynamic(import("../Notes/Notes"), { ssr: false });
interface Props {
  users: User[];
  goals: Goals[];
  notes: Note[];
}
const Main = ({ users, goals, notes }: Props) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const today = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const [text, setText] = useState("");
  // @ts-ignore
  const formattedDate = today.toLocaleDateString("en-US", options);
  // @ts-ignore
  const match = notes.filter(
    (note) => note.email === user?.emailAddresses[0].emailAddress
  );

  const usermatch = users.filter(
    (userss) => userss.email === user?.emailAddresses[0].emailAddress
  );
  const handleSubmit = async (id: string) => {
    // e.preventDefault();
    const mutations: Note = {
      _type: "notes",
      note: text,
      email: user?.emailAddresses[0].emailAddress!,
    };
    const mutation = {
      _id: id,
    };

    const result = await fetch(`/api/addNotes`, {
      body: JSON.stringify(mutations),
      method: "POST",
    });

    const result2 = await fetch(`/api/deleteNote`, {
      body: JSON.stringify(mutation),
      method: "POST",
    });

    const json = await result.json();
    const json2 = await result2.json();
    return json;
  };

  if (!isSignedIn) {
    return (
      <div className="col-span-9 flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  if (isSignedIn) {
    return (
      <div className="col-span-9 py-8  space-y-16 bg-white/40 overflow-hidden h-screen rounded-lg rounded-r-2xl">
        {/* Header */}
        <div className="flex px-5  justify-between items-center">
          <div className="flex gap-4 font-bold text-lg">
            <UserButton />
            <h1>Hi {user?.firstName || user?.username}, welcome Back!</h1>
          </div>
          <div className="items-center flex gap-5">
            <p className="text-sm font-semibold text-black/50">
              {formattedDate}
            </p>
            <div
              onClick={() => router.push("/focus/lofi/")}
              className="bg-black/5 p-2 text-black/80 cursor-pointer hover:text-black hover:bg-black/30 transition-all duration-150  rounded-lg"
            >
              <h2>Lofi App</h2>
            </div>
          </div>
        </div>
        {/* Progress */}
        <div className="px-5 py-2 rounded-lg  bg-white">
          {user ? (
            <>
              {/* @ts-ignore */}
              <LargeCard user={users} goals={goals} />
            </>
          ) : null}
        </div>
        {/* Taks for today */}
        <div className="grid grid-cols-7 px-2 py-2 rounded-lg    bg-white/80 text-lg h-screen  font-[500] ">
          <div className=" col-span-4  ">
            <div className="flex items-center justify-center">
              <h1>Notes For Today</h1>
              <PlusIcon className="h-5 w-5 cursor-pointer" />
            </div>
            <Notes
              handleSubmit={() => handleSubmit(match[0]._id!)}
              match={match}
              setText={setText}
              text={text}
            />
          </div>
          <div className="flex flex-col space-y-8 justify-start col-span-3 w-full px-10">
            <p className="font-semibold">Statistics</p>
            <div className="flex gap-10 ">
              <div
                onClick={() => router.push("")}
                className="bg-black/5 px-3 rounded-lg py-5 w-fit"
              >
                {/* @ts-ignore */}
                {usermatch ? <h1>{usermatch[0].focus} P</h1> : null}
                <p className="text-sm font-[450] text-black/40 mt-3 ">
                  Focus Points
                </p>
              </div>
              <div
                onClick={() => router.push("/vent-choose")}
                className="bg-black/5 px-3 rounded-lg py-5 w-fit"
              >
                <h1>Vent Chat</h1>
                <p className="text-sm font-[450] text-black/40 mt-3 ">2 h</p>
              </div>
            </div>
            <div className="flex gap-10 ">
              <div
                onClick={() => {
                  router.push("/blogs");
                }}
                className="bg-black/5 px-3 cursor-pointer rounded-lg py-5 w-fit"
              >
                <h1>Blogs</h1>
                <p className="text-sm font-[450] text-black/40 mt-3 ">0 post</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Main;
