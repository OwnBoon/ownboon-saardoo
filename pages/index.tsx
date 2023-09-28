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
import CryptoJS from "crypto-js";
import axios from "axios";

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
      chatid: slug.current,
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

  const sendbirdUser = async (slug: { type: string; current: string }) => {
    const userInfo = {
      user_id: slug.current,
      nickname: user?.username,
      profile_url: user?.profileImageUrl,
    };
    const result = await fetch(
      `https://api-7FB154A3-C967-45D0-90B7-6A63E5F0E3EB.sendbird.com/v3/users`,
      {
        method: "POST",
        headers: {
          "Api-Token": "41d1f2713e9ae9eae6144731df5c5d84e2392124",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      }
    );
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
          sendbirdUser(slugtype);
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
