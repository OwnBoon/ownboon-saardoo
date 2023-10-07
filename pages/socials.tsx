import Link from "next/link";
import groq from "groq";
import { sanityClient } from "../sanity";
import { Comment, CommentBody, Posts, User, Videos } from "../typings";
import Sidebar from "../components/dashboard/Sidebar";
import Progress from "../components/dashboard/Progress";
import { useSession } from "next-auth/react";
import { FaVideo, FaBlogger, FaEdit, FaList, FaFilter } from "react-icons/fa";
import { GetServerSideProps } from "next";
import { fecthBlogs } from "../utils/fetchBlogs";
import dynamic from "next/dynamic";
import { UserButton, useUser } from "@clerk/nextjs";
import { FaSearchengin } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchUsers } from "../utils/fetchUsers";
import { fetchFromAPI } from "../utils/fetchVideo";
import ReactPlayer from "react-player";
import {
  Button,
  Container,
  Grid,
  Input,
  Loading,
  Spacer,
  Text,
  Tooltip,
  User as Users,
} from "@nextui-org/react";
import { fetchVideos } from "../utils/fetchPosts";
import TimeAgo from "react-timeago";
import { fetchComments } from "../utils/fetchComments";
import FeedCard from "../components/FeedCard";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
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
  feed: Videos[];
}

function Socials({ posts, users, videoData, feed }: Props) {
  const { isLoaded, isSignedIn, user } = useUser();

  const today = new Date();
  const match = users.filter(
    (userss) => userss.email == user?.emailAddresses[0].emailAddress
  );

  const id = posts.map((post) => post._id);
  const [comments, setComments] = useState<Comment[]>([]);
  console.log(comments);

  const refreshComments = async () => {
    // @ts-ignore

    const comments: Comment[] = await fetchComments(id);
    setComments(comments);
  };

  const logic = () => {
    if (match[0] && match[0].categories) {
      const dynamicCategoriesArray = match[0]
        .categories!.split(",")
        .map((category) => category.trim().toLowerCase());

      const filteredPosts = posts.filter((post) => {
        if (!post.categories) return false; // Skip posts with no categories
        const postCategories = post.categories
          .split(",")
          .map((category) => category.trim().toLowerCase());
        return dynamicCategoriesArray.some((category) =>
          postCategories.includes(category)
        );
      });

      filteredPosts.sort((a, b) => {
        const dateA = a._createdAt ? new Date(a._createdAt) : null;
        const dateB = b._createdAt ? new Date(b._createdAt) : null;

        if (dateA && dateB) {
          // @ts-ignore
          return dateB - dateA; // Sort in descending order
        } else if (dateA) {
          return -1; // DateB is undefined or invalid, so dateA should come first
        } else if (dateB) {
          return 1; // DateA is undefined or invalid, so dateB should come first
        } else {
          return 0; // Both dates are undefined or invalid, no change in order
        }
      });

      return filteredPosts;
    } else {
      // Handle the case where match[0] or match[0].categories is undefined
      console.error("match[0] or match[0].categories is undefined");
    }
  };

  const filteredPosts = logic();
  console.log(filteredPosts);

  useEffect(() => {
    refreshComments();
  }, []);
  const [showVideo, setShowVideo] = useState(false);
  const [videos, setVideos] = useState<Video[]>();
  const [showpost, setShowPost] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const options = { month: "long", day: "numeric", year: "numeric" };
  // @ts-ignore
  const formattedDate = today.toLocaleDateString("en-US", options);
  // @ts-ignore
  const PostCard = dynamic(() => import("../components/PostCard"), {
    ssr: false,
  });

  const [input, setInput] = useState("");

  const handleSubmit = async (id: string) => {
    // Comment logic
    const comment: CommentBody = {
      _type: "comment",
      comment: input,
      tweetId: id,
      username: user?.username || "unknown user",
      profileImg: user?.profileImageUrl || "https://links.papareact.com/gll",
    };

    const result = await fetch(`/api/addComments`, {
      body: JSON.stringify(comment),
      method: "POST",
    });

    setInput("");
    refreshComments();
  };

  useEffect(() => {
    if (isLoaded) {
      console.log("feetched");
      const categoriesArray = match[0].about
        ?.split(",")
        .map((category) => category.trim());
      fetchFromAPI(`search?part=snippet&q=${categoriesArray}`).then((data) =>
        setVideos(data.items)
      );
    } else {
      console.log("not feetched");
    }
  }, [isLoaded]);

  if (!isSignedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <Layout
        hasBg={false}
        bgColor={"#121212"}
        icon="socials.svg"
        text="Socials"
        border="gray-500"
        children={
          <div className="container overflow-y-hidden mx-auto col-span-11 w-full py-8  ">
            <div className="grid grid-cols-1 w-full  lg:grid-cols-12 overflow-y-scroll h-screen  rounded-lg  gap-12">
              <div className="lg:col-span-8 col-span-1 ">
                <div className="flex  lg:text-md  gap-10 justify-between w-full items-center">
                  <div className="flex justify-between w-auto mt-4 pt-5 pb-5 fixed z-10 gap-10 items-center bg-[#121212] ">
                    <div className="lg:hidden items-center">
                      <button
                        onClick={() => setShowFilter(!showFilter)}
                        className={`cursor-pointer rounded-lg flex items-center p-2 ${
                          showFilter
                            ? " text-blue-500 bg-blue-300"
                            : " text-white bg-black/5"
                        }
                        hover:bg-blue-500 hover:text-gray-50
                      `}
                      >
                        <FaFilter className="mr-2" />
                        Filter
                      </button>
                    </div>
                    <div className="hidden lg:flex justify-between items-center gap-10">
                      <button
                        onClick={() => {
                          setShowVideo(true);
                          setShowPost(true);
                        }}
                        className={`cursor-pointer rounded-lg flex items-center p-2 ${
                          showVideo && showpost
                            ? "text-blue-500 bg-blue-800"
                            : "text-white bg-black/5"
                        }hover:bg-blue-500 hover:text-gray-400`}
                      >
                        <FaList className="mr-2" />
                        All
                      </button>
                      <button
                        onClick={() => {
                          setShowPost(false);
                          setShowVideo(false);
                        }}
                        className={`cursor-pointer rounded-lg flex items-center p-2 ${
                          !showpost && !showVideo
                            ? "text-blue-500 bg-blue-100"
                            : "text-white bg-black/5"
                        }hover:bg-blue-500 hover:text-gray-400`}
                      >
                        <FaBlogger className="mr-2" />
                        Blogs
                      </button>
                      <button
                        onClick={() => setShowVideo(true)}
                        className={`cursor-pointer rounded-lg flex items-center p-2${
                          showVideo
                            ? "text-blue-500 bg-blue-100"
                            : "text-white bg-black/5"
                        }hover:bg-blue-500 hover:text-gray-400`}
                      >
                        <FaVideo className="mr-2" />
                        Videos
                      </button>
                      <button
                        onClick={() => {
                          setShowVideo(false);
                          setShowPost(true);
                        }}
                        className={`cursor-pointer rounded-lg flex items-center p-2 ${
                          showpost
                            ? "text-blue-500 bg-blue-100"
                            : "text-white bg-black/5"
                        }hover:bg-blue-500 hover:text-gray-400`}
                      >
                        <FaEdit className="mr-2" />
                        Posts
                      </button>
                      <div className="flex-grow"></div>
                      {showpost ? (
                        <div className="z-50 ml-10 right-8">
                          <Link href="/publishpost">
                            <Tooltip content="Publish a post">
                              <Button
                                shadow
                                bordered
                                borderWeight="bold"
                                size="md"
                                color="gradient"
                              >
                                Create
                              </Button>
                            </Tooltip>
                          </Link>
                        </div>
                      ) : (
                        <div className=" z-50 ml-56 lg-flex lg:justify-items-end px-2 ">
                          <Link href="/blogpost">
                            <Tooltip content="Publish a blog">
                              <div className="hidden lg:flex"></div>
                              <Button
                                shadow
                                bordered
                                borderWeight="bold"
                                size="md"
                                color="gradient"
                                className="hidden lg:inline-block"
                              >
                                Create
                              </Button>
                              <div className="lg:hidden flex justify-items-end">
                                <Button
                                  shadow
                                  bordered
                                  borderWeight="bold"
                                  size="sm"
                                  color="gradient"
                                >
                                  Create
                                </Button>
                              </div>
                            </Tooltip>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-8 sm:col-span-12 transition-all w-auto duration-500 flex flex-col-reverse mt-12 col-span-1 z-5">
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
                      {showpost ? (
                        <div className="p-5  space-y-4">
                          {feed.map((feeds, index) => (
                            <>
                              {/* <>
                              <div className="grid bg-white shadow-lg h-full  rounded-lg gap-2 p-0 lg:p-8 pb-12 mb-8 grid-cols-6">
                              <div className="flex items-center justify-between w-full  gap-10">
                              <div className="flex items-center ">
                              <Users
                              src={feeds.profileImage}
                              name={feeds.author}
                              />
                              
                                    <Text>
                                    -{" "}
                                    <TimeAgo
                                    // @ts-ignore
                                    date={feeds._createdAt}
                                    />{" "}
                                    ago
                                    </Text>
                                    </div>
                                  <Text h1 size={20} className="font-semibold">
                                    {feeds.title}
                                  </Text>
                                </div>
                                <div className="flex rounded-lg justify-center p-5">
                                  {feeds.video ? (
                                    <ReactPlayer controls url={feeds.video} />
                                  ) : (
                                    <>
                                    <img src={feeds.image} />
                                    </>
                                    )}
                                    </div>
                              </div>
                            </> */}
                              <FeedCard feeds={feeds} key={index} />
                            </>
                          ))}
                        </div>
                      ) : (
                        <div className="">
                          {filteredPosts!.map((post, index) => (
                            <div className="">
                              <PostCard
                                match={match}
                                users={users}
                                key={index}
                                post={post}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className=" border-r-2 border-gray-600 h-full mt-0 py-0 mr-20 "></div>
              <div className="lg:col-span-4 col-span-1">
                <div className="lg:sticky relative top-8">
                  {/* <PostWidget /> */}

                  {/* <Categories /> */}
                </div>
              </div>
            </div>
          </div>
        }
      />
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const posts = await fecthBlogs();
  const users = await fetchUsers();
  const feed = await fetchVideos();

  return {
    props: {
      posts,
      users,
      feed,
    },
  };
};
export default Socials;
