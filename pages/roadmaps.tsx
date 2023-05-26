import React, { useEffect, useState } from "react";
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
import axios from "axios";
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
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = axios.get(
      "https://ai-roadmap.com/api/roadmap/generate?title=%22math%20exam%20preparation%20%22?token=%22h2759%22"
    );

    const json = await result;
    console.log(json);
    return json;
  };

  return (
    <div className="grid grid-cols-12 bg-[#f4f1eb]/50">
      <Sidebar />
      <div className="col-span-9">
        {" "}
        <div>
          <div className="card">
            <p>Enter description for your roadmap in details</p>
            <div className="formContainer">
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={6}
                cols={40}
                placeholder="BRUH"
              />
            </div>
            <button onClick={handleSubmit} className="" type="submit">
              Submit
            </button>
            <div></div>
          </div>
        </div>
      </div>{" "}
      <Progress />
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
