import {
  EllipsisVerticalIcon,
  MinusCircleIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { GoalBody, Goals, User, UserBody } from "../../typings";
import { useSession } from "next-auth/react";
import { useUser } from "@clerk/nextjs";
import { MdCancel } from "react-icons/md";
import { Button, Checkbox, Collapse, Input, Tooltip } from "@nextui-org/react";

interface Props {
  users: User[];
  goals: Goals[];
}
const LargeCard = ({ users, goals }: Props) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [Selected, SetSelected] = useState(false);
  const progress = 0;
  const userGoals = goals.filter((goal) => goal.username === user?.username);

  const [showtask, setShowTask] = useState(false);
  const [title, setTitle] = useState("");

  const addGoalData = async () => {
    try {
      const postInfo: GoalBody = {
        // @ts-ignore
        _type: "goals",
        title: title,
        progress: 0,
        username: user?.username!,
        completed: false,
        delete: false,
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
  const addGoalDataSchedule = async (title: string) => {
    try {
      const postInfo: GoalBody = {
        // @ts-ignore
        _type: "goals",
        title: title,
        progress: 0,
        username: user?.username!,
        completed: false,
        delete: false,
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
    if (!title) {
      setShowTask(false);
    } else {
      e.preventDefault();
      addGoalData();
      setShowTask(false);
      setTitle("");
    }
  };
  const [text, setText] = useState("");

  const addCompleted = async (id: string | undefined) => {
    try {
      const postInfo: Goals = {
        // @ts-ignore
        _id: id,
        completed: true,
      };
      const result = await fetch(`/api/setGoals`, {
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
  const addDeleted = async (id: string | undefined) => {
    try {
      const postInfo: Goals = {
        // @ts-ignore
        _id: id,
        completed: true,
        delete: true,
      };
      const result = await fetch(`/api/setGoals`, {
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
    <div className="flex gap-10 pl-3 items-center h-full w-full">
      <div className="border rounded-lg space-y-5 bg-white/70  h-full    w-full px-10 py-2">
        <h1 className="border-b sticky top-0 bg-white z-20 font-semibold ">
          Todo List
        </h1>
        <div className="flex overflow-x-scroll items-center justify-start">
          {userGoals.map((todo) => (
            <div className="flex px-2 bg-white  items-center space-x-5 rounded-lg">
              {/* @ts-ignore */}
              <Tooltip content="complete todos">
                {todo.completed ? (
                  <Checkbox isSelected={true} color="primary" />
                ) : (
                  <Checkbox
                    onChange={() => addCompleted(todo._id)}
                    color="primary"
                  />
                )}
              </Tooltip>
              <Collapse
                className="w-full flex flex-col items-end"
                title={todo.title}
              >
                <Button
                  onPress={() => addDeleted(todo._id)}
                  bordered
                  shadow
                  auto
                  size={"md"}
                >
                  Delete Todo
                </Button>
              </Collapse>
            </div>
          ))}
          <button
            className="border  p-2  inline ml-5   rounded-full  "
            onClick={(e) => {
              showtask ? handlesubmit(e) : setShowTask(true);
            }}
          >
            {showtask ? (
              <MinusIcon className="w-5 h-5 rounded-full  flex items-center justify-center " />
            ) : (
              <PlusIcon className="w-5 h-5 rounded-full  flex items-center justify-center " />
            )}
          </button>
          {showtask ? (
            <div className="px-5">
              <Input
                clearable
                value={title}
                size="xl"
                underlined
                onChange={(e) => setTitle(e.target.value)}
                labelPlaceholder="Title"
                className="!outline-none !border-none"
                initialValue="eg. Add hydration state error handling"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LargeCard;
