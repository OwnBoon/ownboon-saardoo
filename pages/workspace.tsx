import React, { useEffect } from "react";
import Main from "../components/dashboard/Main";
import Header from "../components/dashboard/Main";
import Progress from "../components/dashboard/Progress";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/Navbar";
import { GetServerSideProps } from "next";
import { fetchUsers } from "../utils/fetchUsers";
import { Goals, Notes, User } from "../typings";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { fetchGoals } from "../utils/fetchGoals";
import { fetchNotes } from "../utils/fetchNotes";
import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import { Grid } from "@nextui-org/react";
import Planet from "./tracker";
interface Props {
  users: User[];
  goals: Goals[];
  notes: Notes[];
}

const Home = ({ users, goals, notes }: Props) => {
  const { activeSong } = useSelector((state: any) => state.player);
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const match = users.filter(
    (userss) => userss.email == user?.emailAddresses[0].emailAddress
  );
  useEffect(() => {
    if (user && !match[0].categories) {
      router.push("/categories");
    } else {
      null;
    }
  }, []);

  return (
    <div className="grid grid-cols-12 bg-[#f4f1eb]/50">
      <Head>
        <title> Dashboard @ {user?.firstName || user?.username} </title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Sidebar />
      <div className="col-span-10">
        <Grid.Container gap={2} justify="space-between">
          <Grid xs={6}></Grid>
          <Grid xs={6}>
            <Planet users={users} />
          </Grid>
          <Grid xs={6}></Grid>
          <Grid xs={6}></Grid>
        </Grid.Container>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const users = await fetchUsers();
  const goals = await fetchGoals();
  const notes = await fetchNotes();

  return {
    props: {
      users,
      goals,
      notes,
    },
  };
};
export default Home;
