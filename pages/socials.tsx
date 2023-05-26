import Link from "next/link";
import groq from "groq";
import { sanityClient } from "../sanity";
import { Posts, User } from "../typings";
import Sidebar from "../components/dashboard/Sidebar";
import Progress from "../components/dashboard/Progress";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { fecthBlogs } from "../utils/fetchBlogs";
import dynamic from "next/dynamic";
import { UserButton, useUser } from "@clerk/nextjs";
import { FaSearchengin } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchUsers } from "../utils/fetchUsers";
import { fetchFromAPI } from "../utils/fetchVideo";
import ReactPlayer from "react-player";
interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    description: string;
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}
interface Props {
  posts: Posts[];
  users: User[];
  videoData: Video[];
}

function Home({ posts, users, videoData }: Props) {
  const { isLoaded, isSignedIn, user } = useUser();
  const today = new Date();
  const match = users.filter(
    (userss) => userss.email == user?.emailAddresses[0].emailAddress
  );
  const [showVideo, setShowVideo] = useState(false);
  const [videos, setVideos] = useState<Video[]>();
  const options = { month: "long", day: "numeric", year: "numeric" };
  // @ts-ignore
  const formattedDate = today.toLocaleDateString("en-US", options);
  const PostCard = dynamic(() => import("../components/PostCard"), {
    ssr: false,
  });

  useEffect(() => {
    const categoriesArray = match[0].categories
      ?.split(",")
      .map((category) => category.trim());
    fetchFromAPI(`search?part=snippet&q=${categoriesArray}`).then((data) =>
      setVideos(data.items)
    );
  }, []);
  return (
    <div className="grid h-screen  grid-cols-12 bg-[#f4f1eb]/50">
      <Sidebar />
      <div className="container overflow-y-hidden mx-auto col-span-9  py-5 ">
        {/* <FeaturedPosts /> */}
        <div className="flex px-5  justify-between items-center">
          {/* <div className="flex gap-4 font-bold text-lg">
            <UserButton />
            <p>Hi {user?.firstName || user?.username}, welcome Back!</p>
          </div> */}
          <div className="font-semibold text-xl">Socials</div>
          <div className="items-center flex gap-5">
            {/* <p className="text-sm font-semibold text-black/50">
              {formattedDate}
            </p>
            <div className="bg-black/5 p-2 text-black/80 cursor-pointer hover:text-black hover:bg-black/30 transition-all duration-150  rounded-lg">
              <p>Add New Goal</p>
            </div> */}
            <div className="flex gap-5 items-center ">
              <FaSearchengin className="h-5 w-5" />
              <div className="flex items-center justify-center gap-2">
                <p>{user?.firstName || user?.username}</p>
                <UserButton />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 mt-10 lg:grid-cols-12 overflow-y-scroll h-screen bg-white/70 rounded-lg p-5 gap-12">
          <div className="lg:col-span-8  col-span-1">
            <div className="flex gap-10">
              <div
                onClick={() => setShowVideo(false)}
                className="text-black cursor-pointer bg-black/5 w-fit rounded-lg  px-2 py-1 mb-3 "
              >
                Blogs
              </div>
              <div
                onClick={() => setShowVideo(true)}
                className="text-black bg-black/5 w-fit  cursor-pointer rounded-lg  px-2 py-1 mb-3 "
              >
                Videos
              </div>
              <div>
                <Link href={`/blogpost`}>
                  <p className="transition duration-200 ease transform  inline-block hover:bg-pink-600 hover:text-white text-black bg-black/5 w-fit  cursor-pointer rounded-lg  px-2 py-1 mb-3 ">
                    Post
                  </p>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-8 transition-all duration-500 flex flex-col-reverse col-span-1">
              {showVideo ? (
                <>
                  <div className="justify-center flex flex-col items-center gap-5 ">
                    {/* @ts-ignore */}
                    {videos.map((video: Video) => (
                      <div className="bg-black/5 border-b p-5 px-10 rounded-lg">
                        {/* <Link
                          href={
                            video.id.videoId
                              ? `/video/${video.id.videoId}`
                              : `/video/cV2gBU6hKfY`
                          }
                        > */}
                        <Link href={`/videos/${video.id.videoId}`}>
                          <div className="space-y-2 flex flex-col items-start  ">
                            <img
                              className=" rounded-xl"
                              src={
                                video.snippet.thumbnails.high.url ||
                                "https://images5.alphacoders.com/587/thumbbig-587597.webp"
                              }
                            />
                            <div className="pl-3">
                              <h1 className="font-semibold">
                                {video.snippet?.title.slice(0, 60)}
                              </h1>
                              {/* </Link> */}
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  {posts.map((post, index) => (
                    <PostCard key={index} post={post} />
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              {/* <PostWidget /> */}
              {/* <Categories /> */}
            </div>
          </div>
        </div>
      </div>
      <Progress />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const posts = await fecthBlogs();
  const users = await fetchUsers();

  return {
    props: {
      posts,
      users,
    },
  };
};
export default Home;
