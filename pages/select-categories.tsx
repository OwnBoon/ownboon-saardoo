import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Body from "../components/Home/Body";
import Spline from "@splinetool/react-spline";
import { fetchUsers } from "../utils/fetchUsers";
import { User, UserBody } from "../typings";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MouseEvent, useEffect, useState } from "react";
import { currentUser } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { categories } from "../utils/constants";
import useSWR, { mutate } from "swr";
import { Toaster, toast } from "react-hot-toast";
interface Props {
  users: User[];
}
const Home = ({ users, next, setNext }: any) => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const match = users.filter(
    (userss: any) => userss.email == user?.emailAddresses[0].emailAddress
  );
  const [isNewUser, setIsNewUser] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const fiveCate = categories.slice(0, 7);

  const addCategory = async (name: string, value: string, e: any) => {
    e.preventDefault();
    try {
      const postInfo: UserBody = {
        id: match[0]._id,
        categories: match[0].categories + "," + name,
        about: match[0].about + "," + value,
      };
      const result = await fetch(`/api/addCategory`, {
        body: JSON.stringify(postInfo),
        method: "POST",
      });

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://ownboon-practice.vercel.app/_next/image?url=%2Flogo.png&w=48&q=75"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {name} added to your categories
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Your feed will have a new life now {":)"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
      const json = await result.json();
      setSearchInput("");
      return json;
    } catch (err) {
      console.error(err);
    } 
  };

  // if (session) {
  //   router.push("/dashboard");
  // } else
  return (
    <div className="w-full h-full bg-transparent ">
      <Head>
        <title>Categories @ {user?.username || user?.firstName}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="h-full w-full p-2">
        <div className="flex justify-between">
          <div className="flex justify-center text-neutral-200   items-center gap-2">
            <img
              className="h-10 w-10"
              src="https://ownboon.com/_next/image?url=%2Flogo.png&w=48&q=75"
            />
            <h1 className="">OwnBoon</h1>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 justify-center ">
          <div className="flex border-b border-white/20 justify-center text-2xl  text-white">
            Categories
          </div>
          <div className="flex flex-col items-center justify-center w-fit ">
            {/* <div className="flex flex-col items-center">
                {searchInput.length < 1 ? null : (
                  <>
                    {filteredCategories.map((cateogry) => (
                      <div
                        onClick={() =>
                          addCategory(cateogry.name, cateogry.value!)
                        }
                        className="bg-blue-200/20  cursor-pointer px-1 rounded-lg "
                      >
                        <p className="text-xl">{cateogry.name}</p>
                      </div>
                    ))}
                  </>
                )}
              </div> */}
            <div className="flex flex-col mt-20  justify-center items-center gap-10 w-full">
              <div className="flex justify-center items-center gap-2 h-fit">
                {fiveCate.map((cateogry) => (
                  <div
                    onClick={(e) =>
                      addCategory(cateogry.name, cateogry.value!, e)
                    }
                    className="first w-full flex-col h-16  justify-center text-white/40 hover:text-white/70 text-sm bg-[#191919]/10 backdrop-blur-sm border-gray-400 hover:scale-105 transition-all duration-100 inline-block md:inline-flex items-center  p-4 rounded-md"
                  >
                    <p className="text-sm">{cateogry.name}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col mt-10 items-center">
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  className="px-2 py-1 border focus:ring-0 focus:outline-none focus:border-gray-400/10 rounded  text-md text-white bg-transparent backdrop-blur-3xl font-poppins pageentry   border-gray-400/20"
                />
                {searchInput.length < 1 ? null : (
                  <>
                    <div className=" absolute top-[23rem] mt-2 w-56 overflow-y-scroll  rounded-md shadow-lg bg-[#303030]/10 backdrop-blur-lg text-white ring-1 ring-black ring-opacity-5">
                      <div className="py-2 gap-4 flex flex-col ">
                        {/* @ts-ignore */}
                        {filteredCategories.map((cateogry, index) => (
                          <div
                            onClick={(e) =>
                              addCategory(cateogry.name, cateogry.value!, e)
                            }
                          >
                            <h1
                              key={index}
                              className="block px-4  py-2 text-sm text-neutral-300 p-1 backdrop-blur-lg hover:bg-[#101010]/20 hover:border hover:border-white/10 rounded-md hover:text-neutral-200"
                            >
                              {cateogry.name}{" "}
                              <span className="font-sans">-</span>{" "}
                              {/* <span className="text-white/20 font-light">
                                popular
                              </span> */}
                            </h1>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <footer className="mt-32">
          <div className="flex justify-center items-center">
            <button
              disabled={match[0].categories ? false : true}
              onClick={() => router.refresh()}
              className=" border-gray-500/30 disabled:text-black/40 hover:scale-105 bg-[#363636]/20 backdrop-blur-lg from-gray-300 w-fit flex flex-col justify-start relative hover:   items-center py-3 border rounded"
            >
              <div className="rounded-xl  z-50  cursor-pointer whitespace-nowrap md:text-lg  text-sm   text-[#dddddd] relative mx-24">
                Go to App
              </div>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const users = await fetchUsers();

  return {
    props: {
      users,
    },
  };
};
export default Home;
