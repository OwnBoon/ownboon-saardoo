import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Body from "../components/Home/Body";
import Spline from "@splinetool/react-spline";
import { fetchUsers } from "../utils/fetchUsers";
import { User, UserBody } from "../typings";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { currentUser } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import CryptoJS from "crypto-js";
import axios from "axios";
import Hero from "../components/Home/Hero";
import { Balls, Skateboard } from "../components/ext";
import Benefits from "../components/Home/Benefits";

interface Props {
  users: User[];
}
const Home = ({ users }: Props) => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [encrypt, setEnCrpyt] = useState("");

  const secret =
    user?.username! +
    user?.firstName! +
    user?.lastName +
    user?.emailAddresses[0].emailAddress;
  const secretPass = "XkhZG4fW2t2W";
  const pass = CryptoJS.AES.encrypt(
    JSON.stringify(secret),
    secretPass
  ).toString();

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  function generateString(length: number) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const random = generateString(8);

  // console.log(pass);

  const [isNewUser, setIsNewUser] = useState(false);
  console.log(isNewUser);
  const postUser = async (slug: { type: string; current: string }) => {
    const userInfo: UserBody = {
      name: user?.firstName || user?.username!,
      email: user?.emailAddresses[0].emailAddress,
      focus: "0",
      leaderboard: users.length + 1,
      secret: secret,
      verified: false,
      profileImage: user?.profileImageUrl,
      slug: slug,
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
        const seoslug = user?.username!.toLocaleLowerCase();
        const slugtype = {
          type: "slug",
          current: `${seoslug!.replace(/\s+/g, "-")}`,
        };
        const createUser = async () => {
          console.log("posting user");
          postUser(slugtype);
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
      <section id="home" >
        <Balls />
        <div className="flex mt-[100px] min-h-screen justify-center flex-col">
        <Hero />
        <Skateboard/>
        </div>
        <Body />
      </section>
      <Benefits></Benefits>
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
