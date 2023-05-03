import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { GoalBody, Goals, User, UserBody } from "../../typings";
import { useSession } from "next-auth/react";

interface Props {
  user: User[];
}
const LargeCard = ({ user }: Props) => {
  console.log(user);
  const { data: session } = useSession();
  const pob = user.map((user) => user.goals.map((goals) => goals.progress));
  const [Selected, SetSelected] = useState(false);
  const percent = pob;
  const [title, setTitle] = useState("");
  const progress = 0;

  const goals: GoalBody[] = [
    {
      // _type: "goals",
      title: title,
      progress: progress,
    },
  ];
  console.log(user);
  const addGoalData = async () => {
    try {
      const postInfo: GoalBody = {
        // @ts-ignore
        _type: "goals",
        title: title,
        progress: progress,
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
  const addGoal = async () => {
    try {
      const postInfo: UserBody = {
        id: user[0]._id,
        // @ts-ignore
        goals: goals,
      };
      const result = await fetch(`/api/addGoals`, {
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
    addGoal();
    setTitle("");
  };

  return (
    <>
      {user.map((users) => (
        <div className="flex gap-10 pl-3 items-center h-full w-full">
          {users.goals.map((goals) => (
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
                className="bg-[#71357c]/80  w-64  pr-10 py-10 h-full pl-3 rounded-lg text-white justify-start"
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
      ))}
    </>
  );
};

export default LargeCard;
