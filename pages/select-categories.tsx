import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Body from "../components/Home/Body";
import Spline from "@splinetool/react-spline";
import { fetchUsers } from "../utils/fetchUsers";
import { User, UserBody } from "../typings";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { currentUser } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { categories } from "../utils/constants";
import useSWR, { mutate } from "swr";
import { Toaster, toast } from "react-hot-toast";
interface Props {
  users: User[];
}
const Home = ({ users,next,setNext }: any) => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const match = users.filter(
    (userss:any) => userss.email == user?.emailAddresses[0].emailAddress
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

  const addCategory = async (name: string, value: string) => {
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
      return json;
    } catch (err) {
      console.error(err);
    } finally {
      window.location.reload();
    }
  };

  // if (session) {
  //   router.push("/dashboard");
  // } else
  return (
    <>
      <Head>
        <title>Categories @ {user?.username || user?.firstName}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mx-auto my-auto">
        <div className="  flex flex-col items-center gap-6   justify-center max-w-5xl mx-auto">
          <span className="flex font-semibold text-2xl">Hi There!</span>
          <span className="text-base w-full ">
            Before You continue your experience with{" "}
            <span className="font-semibold">Ownboon</span> , we would like you
            to follow some <span className="font-semibold">categories</span>{" "}
            regarding which we will update you with{" "}
            <span className="font-semibold">blogs</span> and{" "}
            <span className="font-semibold">videos</span>
          </span>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchInput}
            onChange={handleSearchInputChange}
            className="px-2 py-1 border border-gray-300 rounded"
          />
          <div className="">
            <div className="flex flex-col items-center">
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
            </div>
            <hr className="w-full"></hr>
            <div className="flex  flex-col items-center gap-5 ">
              <p>Some of our popular categories</p>
              <div className="flex  w-full  space-x-5">
                {fiveCate.map((cateogry) => (
                  <div
                    onClick={() => addCategory(cateogry.name, cateogry.value!)}
                    className="bg-blue-200/20  cursor-pointer px-1 rounded-lg "
                  >
                    <p className="text-xl">{cateogry.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            onClick={() => {router.push("/workspace"); setNext(!next)}}
            className="bg-cyan-500 p-3 text-white font-semibold rounded-lg mt-20 cursor-pointer"
          >
            <p>Return To User Dashboard</p>
          </div>
        </div>
      </div>
    </>
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
