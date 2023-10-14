// [slug].tsx

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "../../sanity";
import { Category, Goals, Posts, User, UserBody } from "../../typings";
import Sidebar from "../../components/dashboard/Sidebar";
import Progress from "../../components/dashboard/Progress";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { fecthBlogs } from "../../utils/fetchBlogs";
import { GetServerSideProps } from "next";
import PostCard from "../../components/PostCard";
import { useUser } from "@clerk/nextjs";
import { fetchUsers } from "../../utils/fetchUsers";
import Layout from "../../components/Layout/Layout";
import { fetchGoals } from "../../utils/fetchGoals";

interface Props {
  user: User;
  posts: Posts[];
  users: User[];
  goals: Goals[];
}

// const ptComponents = {
//   types: {
//     image: ({ value }) => {
//       if (!value?.asset?._ref) {
//         return null;
//       }
//       return (
//         <img
//           alt={value.alt || " "}
//           loading="lazy"
//           src={urlFor(value).width(320).height(240).fit("max").auto("format")}
//         />
//       );
//     },
//   },
// };

const User = ({ user, posts, users, goals }: Props) => {
  const blog = posts.filter((post) => post.email === user.email);
  const userss = useUser();
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
const random2 = generateString(9);

  const matchuser = userss.user;
  if (userss.user) {
    const match = users.filter(
      (userssss) => userssss.email === matchuser?.emailAddresses[0].emailAddress
    );
    const focus = Number(user.focus);
    const level = Math.round(focus * 0.02);
    const addCategory = async () => {
      try {
        const postInfo: UserBody = {
          id: match[0]._id,
          follow: [
            {
              _key: "5t632xwqeqx",
              _ref: user._id!,
              _type: "reference",
            },
          ],
        };
        const result = await fetch(`/api/addFollow`, {
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

    if (match[0].follow == null) {
      return (
        <Layout
          hasBg={false}
          bgColor={"#121212"}
          icon="chat.svg"
          text="Chats"
          border="gray-500"
          goals={goals}
          children={
            <div className="">
              <div className="">
                <Head>
                  <title> {user.name} </title>
                  <meta name="description" content="" />
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
                        className="w-full h-full absolute opacity-50 bg-[#101010]"
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
                      <div className="relative flex flex-col min-w-0 break-words bg-[#212121]/80 backdrop-blur-2xl w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6">
                          <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                              <div className="relative">
                                <img
                                  alt="..."
                                  src={user?.profileImage}
                                  className="shadow-xl  brightness-105 border-2 border-white/40 cursor-pointer select-none rounded-full h-auto align-middle  absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                />
                              </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                              <div className="py-6 px-3 mt-32 sm:mt-0"></div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4 lg:order-1">
                              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                <div className="mr-4 p-3 text-center">
                                  <span className="text-xl font-bold cursor-pointer text-neutral-400 block uppercase tracking-wide ">
                                    {user.follow?.length || 0}
                                  </span>
                                  <span className="text-sm cursor-pointer text-neutral-300">
                                    Following
                                  </span>
                                </div>
                                <div className="mr-4 p-3 text-center">
                                  <span className="text-xl font-bold block uppercase tracking-wide text-neutral-400">
                                    {blog.length}
                                  </span>
                                  <span className="text-sm text-neutral-300 cursor-pointer">
                                    Blogs
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-center    mt-5">
                            <h3 className="text-4xl text-neutral-300 flex flex-col font-semibold leading-normal   mb-2">
                              {user.name}
                            </h3>
                            <div className="text-sm  leading-normal mt-0 mb-2 text-neutral-200 font-bold uppercase">
                              <span className="font-sans">{level}</span> Points
                            </div>
                            <div className="flex flex-col">
                              <h1 className="">Categories followed:</h1>
                              <div className="">
                                <p>{user.categories}</p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-10 py-10 border-t border-blueGray-200 overflow-y-scroll h-[30rem] text-center">
                            <div className="max-w-5xl mx-auto w-full flex   justify-start">
                              <div className="flex flex-col">
                                {blog.map((post, index) => (
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
                            <div className="text-sm font-sans text-blueGray-500 font-semibold py-1">
                              @ownboon
                            </div>
                          </div>
                        </div>
                      </div>
                    </footer>
                  </section>
                </main>
              </div>
            </div>
          }
        />
      );
    } else {
      const follows = match[0].follow!.map((follows) => ({
        _key: random2,
        _ref: follows._id,
        _type: "reference",
      }));
     
      const addCategory = async () => {
        try {
          const postInfo: UserBody = {
            id: match[0]._id,
            follow: [
              ...follows,
              {
                _key: random,
                _ref: user._id,
                _type: "reference",
              },
            ],
          };
          const result = await fetch(`/api/addFollow`, {
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
      }
      return (
        <Layout
          hasBg={false}
          bgColor={"#121212"}
          icon="chat.svg"
          text="Chats"
          border="gray-500"
          goals={goals}
          children={
            <div className="">
              <div className="">
                <Head>
                  <title> {user.name} </title>
                  <meta name="description" content="" />
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
                        className="w-full h-full absolute opacity-50 bg-[#101010]"
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
                      <div className="relative flex flex-col min-w-0 break-words bg-[#212121]/80 backdrop-blur-2xl w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6">
                          <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                              <div className="relative">
                                <img
                                  alt="..."
                                  src={user?.profileImage}
                                  className="shadow-xl  brightness-105 border-2 border-white/40 cursor-pointer select-none rounded-full h-auto align-middle  absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                />
                              </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                              <div className="py-6 px-3 mt-32 sm:mt-0"></div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4 lg:order-1">
                              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                <div className="mr-4 p-3 text-center">
                                  <span className="text-xl font-bold cursor-pointer text-neutral-400 block uppercase tracking-wide ">
                                    {user.follow?.length || 0}
                                  </span>
                                  <span className="text-sm cursor-pointer text-neutral-300">
                                    Following
                                  </span>
                                </div>
                                <div className="mr-4 p-3 text-center">
                                  <span className="text-xl font-bold block uppercase tracking-wide text-neutral-400">
                                    {blog.length}
                                  </span>
                                  <span className="text-sm text-neutral-300 cursor-pointer">
                                    Blogs
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-center    mt-5">
                            <h3 className="text-4xl text-neutral-300 flex flex-col font-semibold leading-normal   mb-2">
                              {user.name}
                            </h3>
                            <div className="text-sm  leading-normal mt-0 mb-2 text-neutral-200 font-bold uppercase">
                              <span className="font-sans">{level}</span> Points
                            </div>
                            <div className="flex flex-col">
                              <h1 className="">Categories followed:</h1>
                              <div className="">
                                <p>{user.categories}</p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-10 py-10 border-t border-blueGray-200 overflow-y-scroll h-[30rem] text-center">
                            <div className="max-w-5xl mx-auto w-full flex   justify-start">
                              <div className="flex flex-col">
                                {blog.map((post, index) => (
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
                            <div className="text-sm font-sans text-blueGray-500 font-semibold py-1">
                              @ownboon
                            </div>
                          </div>
                        </div>
                      </div>
                    </footer>
                  </section>
                </main>
              </div>
            </div>
          }
        />
      );
    }
  }
};

const query = groq`*[_type == "user" && slug.current == $slug][0]{
  ...,    


}`;
export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    groq`*[_type == "user" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const user = await sanityClient.fetch(query, { slug });
  const users = await fetchUsers();
  const posts = await fecthBlogs();
  const goals = await fetchGoals();
  return {
    props: {
      user,
      users,
      goals,
      posts,
    },
  };
}
export default User;
