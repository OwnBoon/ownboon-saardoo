// [slug].tsx

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "../../sanity";
import { Category, Goals, Posts, User, UserBody, Videos } from "../../typings";
import Sidebar from "../../components/dashboard/Sidebar";
import Progress from "../../components/dashboard/Progress";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { fecthBlogs } from "../../utils/fetchBlogs";
import { GetServerSideProps } from "next";
import PostCard from "../../components/PostCard";
import Categories from "../select-categories";
import { useUser } from "@clerk/nextjs";
import { fetchUsers } from "../../utils/fetchUsers";
import Layout from "../../components/Layout/Layout";
import { fetchGoals } from "../../utils/fetchGoals";
import { fetchVideos } from "../../utils/fetchPosts";
import FeedCard from "../../components/FeedCard";
import { Modal } from "@nextui-org/react";
import { useState } from "react";

interface Props {
  user: User;
  posts: Videos[];
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
  const userss = useUser();
  const blog = posts.filter((post) => post.author === user.slug!.current);
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
  const [showProfile, setShowProfile] = useState(false);

  const random = generateString(8);
  const random2 = generateString(9);

  const categoriesArray = user.categories!.split(",");
  const filteredArr = categoriesArray!.filter((item) => item !== "undefined");
  // @ts-ignore
  const uniqueArr = [...new Set(filteredArr)];
  console.log(uniqueArr);
  const level = Number(user.focus) * 0.02;

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

    return (
      <Layout
        hasBg={false}
        bgColor={"#121212"}
        icon="/chat.svg"
        text="Users"
        goals={goals}
        border="gray-500"
        children={
          <div className="">
            {showProfile && (
              <Modal
                aria-labelledby="modal-title"
                className="!bg-[#191919]/40 h-[90%] w-[100vw] flex justify-center items-center backdrop-blur-md fixed top-0 left-0 right-0  overflow-x-scroll md:inset-0"
                open={true}
                closeButton
                onClose={() => setShowProfile(false)}
                width="100%"
              >
                <Categories users={users} />
              </Modal>
            )}
            <section className="flex flex-col h-screen w-full overflow-y-hidden  ">
              <div className="self-center w-full border-b border-b-white/10 pb-1 px-1 max-w-[1200px] mt-5 max-md:max-w-full">
                <div className="gap-2 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-[22%] max-md:w-full max-md:ml-0">
                    <img
                      src={user.profileImage}
                      className="bg-zinc-300 flex w-[190px] h-[190px] flex-col mx-auto rounded-[200px] max-md:mt-8"
                    />
                  </div>
                  <div className="flex flex-col items-stretch w-[50%] ml-5 max-md:w-full max-md:ml-0">
                    <div className="flex flex-col my-auto max-md:mt-10">
                      <div className="flex w-[319px] max-w-full items-start justify-between gap-5 self-start">
                        <h2 className="text-white text-xl font-semibold flex-1 my-auto">
                          {user.name}
                        </h2>
                        {user.name == match[0].name ? (
                          <div
                            onClick={() => setShowProfile(true)}
                            className="bg-zinc-800 bg-opacity-40 backdrop-blur-sm border border-white/30 flex flex-col flex-1 cursor-pointer px-4 py-2.5 rounded"
                          >
                            <div className="text-white text-md font-medium self-center whitespace-nowrap">
                              Edit Profile
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="flex w-[344px] max-w-full items-start justify-between gap-5 mt-6 self-start max-md:justify-center">
                        <div className="flex items-center  gap-1.5 self-center">
                          <h1 className="text-white text-lg font-semibold self-center">
                            {blog.length}
                          </h1>
                          <h2 className="text-white text-lg font-medium self-center whitespace-nowrap">
                            Posts
                          </h2>
                        </div>
                        <div className="flex items-center  gap-1.5 self-center">
                          <h1 className="text-white text-lg font-semibold self-center">
                            {user.follow?.length}
                          </h1>
                          <h2 className="text-white text-lg font-medium self-center whitespace-nowrap">
                            Followers
                          </h2>
                        </div>
                        <div className="flex items-start gap-2.5 self-start">
                          <div className="text-white text-lg font-semibold self-start">
                            {user.follow?.length}
                          </div>
                          <div className="text-white text-lg font-medium self-start whitespace-nowrap">
                            Following
                          </div>
                        </div>
                      </div>
                      <div className="text-white w-fit h-fit gap-3   flex font-medium mt-7">
                        {uniqueArr.slice(0, 3).map((category) => (
                          <div className="bg-zinc-600 bg-opacity-10 w-fit justify-center  shine-button self-stretch text-xs flex   items-center  gap-1 pl-3.5 pr-5 py-2 rounded-md border-[0.75px] border-solid border-zinc-700 border-opacity-50">
                            <h1>{category}</h1>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-[33%]  max-md:w-full max-md:ml-0">
                    {level < 5 ? (
                      <div className=" flex justify-center flex-col items-center  border border-white/30 rounded-lg scale-90 pb-3 pt-1 px-2">
                        <h1 className=" px-2 flex justify-between w-full py-1 self-center">
                          <span></span>Boon Island{" "}
                          <span className="bg-[#212121] px-2   text-sm flex justify-center items-center py-0.5 rounded-full">
                            {level}
                          </span>
                        </h1>

                        <img
                          className="group-hover:brightness-110   transition-all duration-150"
                          src="https://cdn.sanity.io/images/mrfd4see/production/d1bd6eff25b845c90126df595c24663cffcd9acf-3072x1414.png?w=2000&fit=max&auto=format"
                        />
                      </div>
                    ) : level < 10 ? (
                      <div className=" flex justify-center flex-col items-center  border border-white/30 rounded-lg scale-110 pb-3 pt-1 px-2">
                        <h1 className=" px-2 flex justify-between w-full py-1 self-center">
                          <span></span>Boon Island{" "}
                          <span className="bg-[#212121] px-2   text-sm flex justify-center items-center py-0.5 rounded-full">
                            {level}
                          </span>
                        </h1>

                        <img
                          className="group-hover:brightness-110 transition-all duration-150"
                          src="https://cdn.sanity.io/images/mrfd4see/production/d1bd6eff25b845c90126df595c24663cffcd9acf-3072x1414.png?w=2000&fit=max&auto=format"
                        />
                      </div>
                    ) : level < 21 ? (
                      <div className=" flex justify-center flex-col items-center  border border-white/30 rounded-lg scale-110 pb-3 pt-1 px-2">
                        <h1 className=" px-2 flex justify-between w-full py-1 self-center">
                          <span></span>Boon Island{" "}
                          <span className="bg-[#212121] px-2   text-sm flex justify-center items-center py-0.5 rounded-full">
                            {level}
                          </span>
                        </h1>

                        <img
                          className="group-hover:brightness-110 transition-all duration-150"
                          src="https://cdn.sanity.io/images/mrfd4see/production/996a064b91c927a0fceec73bc265112d1207822f-3072x1414.png?w=2000&fit=max&auto=format"
                        />
                      </div>
                    ) : level < 31 ? (
                      <div className=" flex justify-center flex-col items-center  border border-white/30 rounded-lg scale-110 pb-3 pt-1 px-2">
                        <h1 className=" px-2 flex justify-between w-full py-1 self-center">
                          <span></span>Boon Island{" "}
                          <span className="bg-[#212121] px-2   text-sm flex justify-center items-center py-0.5 rounded-full">
                            {level}
                          </span>
                        </h1>

                        <img
                          className="group-hover:brightness-110 transition-all duration-150"
                          src="https://cdn.sanity.io/images/mrfd4see/production/f8cf6a118ab5c937763289890beb462071486665-3072x1414.png?w=2000&fit=max&auto=format"
                        />
                      </div>
                    ) : level < 41 ? (
                      <div className=" flex justify-center flex-col items-center  border border-white/30 rounded-lg scale-110 pb-3 pt-1 px-2">
                        <h1 className=" px-2 flex justify-between w-full py-1 self-center">
                          <span></span>Boon Island{" "}
                          <span className="bg-[#212121] px-2   text-sm flex justify-center items-center py-0.5 rounded-full">
                            {level}
                          </span>
                        </h1>

                        <img
                          className="group-hover:brightness-110 transition-all duration-150"
                          src="https://cdn.sanity.io/images/mrfd4see/production/914f72baf217a69b15346c9ae10db7057b1d4d12-3072x1414.png?w=2000&fit=max&auto=format"
                        />
                      </div>
                    ) : level > 51 ? (
                      <div className=" flex justify-center flex-col items-center  border border-white/30 rounded-lg scale-90 pb-3 pt-1 px-2">
                        <h1 className=" px-2 flex justify-between w-full py-1 self-center">
                          <span></span>Boon Island{" "}
                          <span className="bg-[#212121] px-2   text-sm flex justify-center items-center py-0.5 rounded-full">
                            {level}
                          </span>
                        </h1>

                        <img
                          className="group-hover:brightness-110 transition-all duration-150"
                          src="https://cdn.sanity.io/images/mrfd4see/production/e600fb45845244fdce46b6e1bec2bff7d8631f5f-3360x1786.png?w=2000&fit=max&auto=format"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="self-center scale-90 w-full border-b border-b-white/10 pb-10 px-5 h-screen overflow-y-scroll max-w-[1200px] mt-5 max-md:max-w-full">
                {blog.map((feed) => (
                  <FeedCard feeds={feed} match={match} users={users} />
                ))}
              </div>
            </section>
          </div>
        }
      />
    );
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
  const posts = await fetchVideos();
  // const feed = await fetchVideos();
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
