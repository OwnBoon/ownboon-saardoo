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
interface Props {
  users: User[];
}
const Home = ({ users }: Props) => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const match = users.filter(
    (userss) => userss.email == user?.emailAddresses[0].emailAddress
  );
  const [isNewUser, setIsNewUser] = useState(false);
  const postUser = async () => {
    const userInfo: UserBody = {
      name: user?.firstName || user?.username!,
      email: user?.emailAddresses[0].emailAddress,
      focus: 0,
      leaderboard: users.length + 1,
    };
    const result = await fetch(`/api/addUser`, {
      body: JSON.stringify(userInfo),
      method: "POST",
    });

    const json = await result.json();
    return json;
  };
  const [searchInput, setSearchInput] = useState("");
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const fiveCate = categories.slice(0, 7);

  const addCategory = async (name: string) => {
    try {
      const postInfo: UserBody = {
        id: match[0]._id,
        categories: match[0].categories + "," + name,
      };
      const result = await fetch(`/api/addCategory`, {
        body: JSON.stringify(postInfo),
        method: "POST",
      });
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
        <title>OwnBoon</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Navbar />
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
                      onClick={() => addCategory(cateogry.name)}
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
                    onClick={() => addCategory(cateogry.value!)}
                    className="bg-blue-200/20  cursor-pointer px-1 rounded-lg "
                  >
                    <p className="text-xl">{cateogry.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            onClick={() => router.push("/dashboard")}
            className="bg-cyan-500 p-3 text-white font-semibold rounded-lg mt-20 cursor-pointer"
          >
            <p>Return To User Dashboard</p>
          </div>
        </div>
        <Body />
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
