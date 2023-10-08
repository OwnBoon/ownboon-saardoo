import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Avatar, Badge, Loading } from "@nextui-org/react";
import Notification from "../Notification";
import { GetServerSideProps } from "next";
import { fetchUsers } from "../../utils/fetchUsers";
import { fetchGoals } from "../../utils/fetchGoals";
import { fetchNotes } from "../../utils/fetchNotes";
import { Goals, User } from "../../typings";
import Link from "next/link";

interface Props {
  icon: string;
  text: string;
  bgColor: string;
  border: string;
  showsidebar: boolean;
  setLoading?: (value: boolean) => void;
  users?: User[];
  todo?: Goals[];
  goals?: Goals[];
}

const Navbar = ({
  users,
  goals,
  icon,
  text,
  bgColor,
  border,
  showsidebar,
  setLoading,
}: Props) => {
  const { user, isSignedIn, isLoaded } = useUser();
  const match = users?.filter(
    (userss) => userss.email == user?.emailAddresses[0].emailAddress
  );

  const [showsearch, setshowsearch] = useState(false);
  const [shownotifications, setShownotifications] = useState(false);
  const [search, setSearch] = useState("");
  // @ts-ignore
  const [todolist, setTodoList] = useState<any[]>([]);

  const todos = goals?.filter((goal) => goal.username == user?.username);
  const filteredTodos =
    search === "todos" ||
    search === "goals" ||
    search === "tod" ||
    search === "todo" ||
    search === "todos" ||
    search === "goa" ||
    search === "goal" ||
    search === "goals"
      ? todos
      : // @ts-ignore
        todos.filter((todos) =>
          todos.title?.toLowerCase().includes(search.toLowerCase())
        );
  const now = new Date();
  useEffect(() => {
    if (isLoaded) {
      const now = new Date();
      const checkTodos = todos?.filter((todo) => {
        // @ts-ignore
        const dueDate = new Date(todo.due);
        const day = new Date(todo.duration!);
        const diffHour = Math.abs(dueDate.getHours() - now.getHours());
        return diffHour <= 2 && day.getDay() == now.getDay();
      });
      // @ts-ignore
      setTodoList(checkTodos);
    } else null;

    // Run checkTodos every hour

    // Clear interval on component unmount
  }, [isLoaded]);
  const togglenotification = () => {
    if (shownotifications) {
      setShownotifications(false);
    } else {
      setShownotifications(true);
    }
  };
  const handlesearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading ? setLoading(true) : "";
    setshowsearch(false);
    setShownotifications(false);
    setSearch("");
  };
  useEffect(() => {
    setLoading ? setLoading(false) : "";
    setShownotifications(false);
    setSearch("");
  }, []);

  return (
    <>
      {isSignedIn ? (
        <Notification
          match={match}
          shownotifications={shownotifications}
          setShownotifications={setShownotifications}
          notifications={todolist}
        />
      ) : null}
      <div
        className={`  w-full  max-w-full  border-b-2 border-gray-700 flex items-center transition-all  justify-center   pl-8 pr-12 py-1 fixed z-40`}
        style={{
          backgroundColor: bgColor,
        }}
      >
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2 text-white">
            <Image width={30} height={30} className="" src={icon} alt={text} />
            <span className="font-fontspring text-[20px]">{text}</span>
          </div>
          <div
            className={` ${
              showsidebar ? "translate-x-[0vw]" : "translate-x-0"
            } flex md:mr-20  mr-10 items-center transition-all gap-5 md:gap-10 relative`}
          >
            <Image
              width={55}
              height={55}
              onClick={() => setshowsearch(true)}
              className={`p-2 ${
                showsearch ? "hidden" : ""
              } rounded hover:brightness-150 fade hidden md:inline transition-all cursor-pointer`}
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

                {search.length > 1 && (
                  <div className=" absolute top-14 mt-2 w-56 rounded-md shadow-lg bg-[#303030]/10 backdrop-blur-lg text-white ring-1 ring-black ring-opacity-5">
                    <div className="py-2 gap-4 flex flex-col">
                      {/* @ts-ignore */}
                      {filteredTodos.map((todo, index) => (
                        <Link href={"/workspace"}>
                          <h1
                            key={index}
                            className="block px-4  py-2 text-sm text-neutral-300 p-1 backdrop-blur-lg hover:bg-[#101010]/20 hover:border hover:border-white/10 rounded-md hover:text-neutral-200"
                          >
                            {todo.title} <span className="font-sans">-</span>{" "}
                            <span className="text-white/20 font-light">
                              todos
                            </span>
                          </h1>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
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
            {todolist ? (
              <>
                {todolist.length > 0 ? (
                  <Badge
                    variant={"dot"}
                    content=""
                    isSquared
                    className=""
                    placement={"top-right"}
                    size={"xs"}
                  >
                    <Image
                      width={70}
                      onClick={() => togglenotification()}
                      height={70}
                      className=" p-2 rounded hover:brightness-150 transition-all cursor-pointer"
                      src="notification.svg"
                      alt={"notification"}
                    />
                  </Badge>
                ) : (
                  <Image
                    width={70}
                    onClick={() => togglenotification()}
                    height={70}
                    className=" p-2 rounded hover:brightness-150 transition-all cursor-pointer"
                    src="notification.svg"
                    alt={"notification"}
                  />
                )}
              </>
            ) : (
              <Image
                width={70}
                onClick={() => togglenotification()}
                height={70}
                className=" p-2 rounded hover:brightness-150 transition-all cursor-pointer"
                src="notification.svg"
                alt={"notification"}
              />
            )}

            <div className="flex items-center gap-2 text-[#DDDDDD] cursor-pointer">
              {user && <UserButton />}
              <span className="text-[15px] hidden md:inline font-sans font-[500]">
                {user?.username}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
