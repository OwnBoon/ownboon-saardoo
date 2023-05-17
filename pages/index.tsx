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
const Home = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

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

export default Home;
