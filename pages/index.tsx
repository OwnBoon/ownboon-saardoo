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

interface Props {
  users: User[];
}
const Home = ({ users }: Props) => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [isNewUser, setIsNewUser] = useState(false);
  console.log(user?.emailAddresses[0].emailAddress);
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
  useEffect(() => {
    if (user) {
      const match = users.find(
        (userss) => userss.email === user.emailAddresses[0].emailAddress
      );
      if (!match) {
        setIsNewUser(true);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (isNewUser) {
        const createUser = async () => {
          postUser();
        };
        createUser();
      }
    } else null;
  }, [isNewUser]);

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
        <Hero />
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
