import React, { useEffect } from "react";
import Main from "../components/dashboard/Main";
import Header from "../components/dashboard/Main";
import Progress from "../components/dashboard/Progress";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/Navbar";
import { GetServerSideProps } from "next";
import { fetchUsers } from "../utils/fetchUsers";
import { Goals, Notes, Posts, User } from "../typings";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { fetchGoals } from "../utils/fetchGoals";
import { fetchNotes } from "../utils/fetchNotes";
import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import { fecthBlogs } from "../utils/fetchBlogs";
import PostCard from "../components/PostCard";
import Link from "next/link";
interface Props {
  users: User[];
  goals: Goals[];
  notes: Notes[];
  posts: Posts[];
}

const Home = ({ users, goals, notes, posts }: Props) => {
  // const { activeSong } = useSelector((state: any) => state.player);
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

  if (isLoaded) {
    const match = users.filter(
      (userss) => userss.email == user?.emailAddresses[0].emailAddress
    );
    console.log(match);
    const blogs = posts.filter((blog) => blog.author === user?.username);
    return (
      <div className="">
        <Head>
          <title> Dashboard @ {user?.firstName || user?.username} </title>
          <link rel="icon" href="/logo.png" />
        </Head>

        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
        />
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
        ></link>

        <main className="profile-page">
          <section className="relative block h-500-px">
            <div className="absolute top-0 w-full h-full bg-center bg-cover">
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px">
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-blueGray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img
                          alt="..."
                          src={user?.profileImageUrl}
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        {match[0].verified ? (
                          <button
                            className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            Add Buddies
                          </button>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            22
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Friends
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {blogs.length}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Blogs
                          </span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            89
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Comments
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center    mt-5">
                    <h3 className="text-4xl flex flex-col font-semibold leading-normal  text-blueGray-700 mb-2">
                      {user?.firstName} {user?.lastName}
                      <span className="font-light text-lg mb-2 text-gray-500">
                        {user?.username}
                      </span>
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-600 font-bold uppercase">
                      {match[0].focus} Points . Rank {match[0].leaderboard}
                    </div>
                    <div className="flex flex-col">
                      <h2>
                        <Link href="/categories" className="underline">
                          Categories
                        </Link>{" "}
                        followed:
                      </h2>
                      <div className="">
                        <p>{match[0].categories}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 overflow-y-scroll h-[30rem] text-center">
                    <div className="max-w-5xl mx-auto w-full flex   justify-start">
                      <div className="flex flex-col">
                        {blogs.map((post, index) => (
                          <div className="">
                            {/* @ts-ignore */}
                            <PostCard
                              match={match}
                              users={users}
                              key={index}
                              post={post}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                  <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                    <div className="text-sm text-blueGray-500 font-semibold py-1">
                      @ownboon
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </section>
        </main>
      </div>
    );
  } else {
    const { isLoaded, isSignedIn, user } = useUser();

    return (
      <div className="">
        <Head>
          <title> Dashboard @ {user?.firstName || user?.username} </title>
          <link rel="icon" href="/logo.png" />
        </Head>

        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
        />
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
        ></link>

        <main className="profile-page">
          <section className="relative block h-500-px">
            <div className="absolute top-0 w-full h-full bg-center bg-cover">
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px">
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-blueGray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img
                          alt="..."
                          src={user?.profileImageUrl}
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button
                          className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Follow
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            22
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Friends
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            10
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Photos
                          </span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            89
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Comments
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center    mt-5">
                    <h3 className="text-4xl flex flex-col font-semibold leading-normal  text-blueGray-700 mb-2">
                      user not loaded
                      <span className="font-light text-lg mb-2 text-gray-500">
                        nbruh
                      </span>
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      Los Angeles, California
                    </div>
                    <div className="mb-2 text-blueGray-600 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                      Solution Manager - Creative Tim Officer
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                      University of Computer Science
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          An artist of considerable range, Jenna the name taken
                          by Melbourne-raised, Brooklyn-based Nick Murphy
                          writes, performs and records all of his own music,
                          giving it a warm, intimate feel with a solid groove
                          structure. An artist of considerable range.
                        </p>
                        <a href="#pablo" className="font-normal text-pink-500">
                          Show more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                  <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                    <div className="text-sm text-blueGray-500 font-semibold py-1">
                      Made with{" "}
                      <a
                        href="https://www.creative-tim.com/product/notus-js"
                        className="text-blueGray-500 hover:text-gray-800"
                        target="_blank"
                      >
                        Notus JS
                      </a>{" "}
                      by{" "}
                      <a
                        href="https://www.creative-tim.com"
                        className="text-blueGray-500 hover:text-blueGray-800"
                        target="_blank"
                      >
                        {" "}
                        Creative Tim
                      </a>
                      .
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </section>
        </main>
      </div>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const users = await fetchUsers();
  const goals = await fetchGoals();
  const notes = await fetchNotes();
  const posts = await fecthBlogs();

  return {
    props: {
      users,
      goals,
      posts,
      notes,
    },
  };
};
export default Home;
