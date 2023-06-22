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
import dynamic from "next/dynamic";
const ChatEngine = dynamic(() =>
  // @ts-ignore
  import("react-chat-engine").then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
  // @ts-ignore
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

interface Props {
  users: User[];
}
const Home = ({ users }: Props) => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  const [isNewUser, setIsNewUser] = useState(false);
  const postUser = async () => {
    const userInfo: UserBody = {
      name: user?.firstName || user?.username!,
      email: user?.emailAddresses[0].emailAddress,
      focus: "0",
      leaderboard: users.length + 1,
    };
    const result = await fetch(`/api/addUser`, {
      body: JSON.stringify(userInfo),
      method: "POST",
    });

    const json = await result.json();
    return json;
  };

  const match = users.filter(
    (userss) => userss.email === user?.emailAddresses[0].emailAddress
  );

  // if (session) {
  //   router.push("/dashboard");
  // } else
  return (
    <div className="background">
      <Head>
        <title>Buddies</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="shadow">
        {isLoaded ? (
          <ChatEngine
            // @ts-ignore
            height="99vh"
            projectID="fac12ef2-5467-4203-ac68-33cea25d76a2"
            userName={match[0].name}
            userSecret={match[0].secret}
            renderNewMessageForm={() => <MessageFormSocial />}
          />
        ) : (
          <div>hello</div>
        )}
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
