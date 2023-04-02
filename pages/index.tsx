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

interface Props {
  users: User[];
}
const Home = ({ users }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/dashboard");
  } else
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

export default Home;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const users = await fetchUsers();

  return {
    props: {
      users,
    },
  };
};
