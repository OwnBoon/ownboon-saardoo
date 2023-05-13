import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import LargeCard from "./LargeCard";
import { Goals, User, UserBody } from "../../typings";
import { PlusIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
interface Props {
  users: User[];
  goals: Goals[];
}
const Main = ({ users, goals }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const today = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  // @ts-ignore
  const formattedDate = today.toLocaleDateString("en-US", options);
  const match = users.filter((user) => user.email === session?.user?.email);
  const [notes, setNotes] = useState("");
  const addUser = async () => {
    try {
      const postInfo: UserBody = {
        id: users[0]._id,
        // @ts-ignore
        notes: notes,
      };
      const result = await fetch(`/api/addNotes`, {
        body: JSON.stringify(postInfo),
        method: "POST",
      });
      const json = await result.json();
      console.log(json);
      return json;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="col-span-9 py-8  space-y-16 bg-white/40 rounded-lg rounded-r-2xl">
      {/* Header */}
      <div className="flex px-5  justify-between items-center">
        <div className="flex gap-4 font-bold text-lg">
          <img
            onClick={() => signOut()}
            className="h-8 w-8 object-cover  rounded-full"
            src={session?.user?.image || ""}
          />
          <p>Hi {session?.user?.name}, welcome Back!</p>
        </div>
        <div className="items-center flex gap-5">
          <p className="text-sm font-semibold text-black/50">{formattedDate}</p>
          <div className="bg-black/5 p-2 text-black/80 cursor-pointer hover:text-black hover:bg-black/30 transition-all duration-150  rounded-lg">
            <p>Add New Goal</p>
          </div>
        </div>
      </div>
      {/* Progress */}
      <div className="px-5 py-2 rounded-lg  bg-white">
        {session ? (
          <>
            <LargeCard user={users} goals={goals} />
          </>
        ) : null}
      </div>
      {/* Taks for today */}
      <div className="grid grid-cols-7 px-2 py-2 rounded-lg   bg-white/80 text-lg font-[500] ">
        <div className="space-y-5 col-span-4  ">
          <h1>Notes For Today</h1>
          <div
            onClick={addUser}
            className="bg-black/5 w-fit p-2 mt-12 rounded-lg cursor-pointer text-sm "
          >
            Save
          </div>
          <div className=" overflow-y-scroll    h-fit ">
            <ReactQuill
              theme="snow"
              className="h-full scrollbar scrollbar-track-white scrollbar-thumb-blue-50"
              value={notes || match[0].notes}
              onChange={setNotes}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-8 justify-start col-span-3 w-full px-10">
          <p className="font-semibold">Statistics</p>
          <div className="flex gap-10 ">
            <div
              onClick={() => router.push("/focus/lofi")}
              className="bg-black/5 px-3 rounded-lg py-5 w-fit"
            >
              <h1>28 h</h1>
              <p className="text-sm font-[450] text-black/40 mt-3 ">
                Focus Time
              </p>
            </div>
            <div className="bg-black/5 px-3 rounded-lg py-5 w-fit">
              <h1>69</h1>
              <p className="text-sm font-[450] text-black/40 mt-3 ">
                Finished Goals
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
};

export default Main;
