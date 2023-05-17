import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { GoalBody, Goals, User, UserBody } from "../../typings";
import { useSession } from "next-auth/react";
import { useUser } from "@clerk/nextjs";

interface Props {
  users: User[];
  goals: Goals[];
}
const LargeCard = ({ users, goals }: Props) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [Selected, SetSelected] = useState(false);
  const [title, setTitle] = useState("");
  const progress = 0;
  const userGoals = goals.filter((goal) => goal.username === user?.username);
  console.log(userGoals);
  const addGoalData = async () => {
    try {
      const postInfo: GoalBody = {
        // @ts-ignore
        _type: "goals",
        title: title,
        progress: progress,
        username: user?.username!,
      };
      const result = await fetch(`/api/addGoalData`, {
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

  const handlesubmit = (e: any) => {
    e.preventDefault();
    addGoalData();
    setTitle("");
  };

  return (
    <div className="flex gap-10 pl-3 items-center h-full w-full">
      {userGoals.map((goals) => (
        <div className="bg-[#71357c]  w-1/5 pr-10 py-8 h-full pl-3 rounded-lg text-white justify-start">
          <div className="flex justify-between items-center w-full">
            <p className="font-semibold">{goals.title}</p>
            <EllipsisVerticalIcon className="h-5 w-5" />
          </div>
          <div className="mt-5 text-sm space-y-1 text-white/60 pb-5 px-1">
            {goals.progress}%
            <div className="w-full bg-black/80 mt-1 rounded-md">
              <div
                className="bg-white rounded-md h-1"
                style={{ width: `${goals.progress}% ` }}
              ></div>
            </div>
          </div>
          {/* Main */}
        </div>
      ))}
      <div className="flex items-center h-full  gap-10">
        <div className="">
          <PlusIcon
            onClick={() => SetSelected(true)}
            className="h-6 cursor-pointer w-6 bg-black/5 text-black/60 rounded-full"
          />
        </div>
        {Selected && (
          <form
            onSubmit={handlesubmit}
            className="bg-[#71357c]/80  w-64  pr-10 py-6 h-full pl-3 rounded-lg text-white justify-start"
          >
            <div className="flex justify-between items-center w-full">
              <input
                placeholder="Enter your goal"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
                className="font-semibold bg-transparent placeholder-white/90 outline-none border-b-2 py-1 border-pink-200/20"
              />
              <EllipsisVerticalIcon className="h-5 w-5" />
            </div>
            <div className="mt-5 text-sm space-y-1 text-white/60 pb-5 px-1">
              {progress}
              <div className="w-full bg-black/80 mt-1 rounded-md">
                <div
                  className="bg-white rounded-md h-1"
                  style={{ width: `${progress}% ` }}
                ></div>
              </div>
            </div>
            {/* Main */}
          </form>
        )}
      </div>
    </div>
  );
};

export default LargeCard;
