import Link from "next/link";
import groq from "groq";
import { sanityClient } from "../sanity";
import { Comment, CommentBody, Goals, Posts, User, Videos } from "../typings";
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
  Modal,
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
import { fetchGoals } from "../utils/fetchGoals";
import {
  CheckBadgeIcon,
  HomeIcon,
  DocumentIcon as DocumentIcon2,
} from "@heroicons/react/24/solid";
import { DocumentIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

import { Dropdown } from "@nextui-org/react";

import { AiOutlineStar } from "react-icons/ai";

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
  goals: Goals[];
}

function Socials({ posts, users, videoData, feed, goals }: Props) {
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
  const [videoName, setVideoName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [videoId, setVideoId] = useState("");
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
        goals={goals}
        border="gray-500"
        children={
          <div className="container overflow-y-hidden mx-auto col-span-11 w-full py-8">
            <div className="grid grid-cols-1 w-full lg:grid-cols-12 overflow-y-scroll h-screen  rounded-lg  gap-12">
              <div className="lg:col-span-8 col-span-1">
                <div className="flex lg:text-md gap-10 justify-between w-[100vw] items-center">
                  <div className="flex justify-between overflow-x-scroll w-full lg:overflow-hidden scrollbar-thin w-fit mt-4 pt-5 pb-5 fixed z-10 gap-10 items-center bg-[#121212] ">
                    <div className="lg:hidden  items-center">
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
                    <div className="flex justify-between   items-center gap-10">
                      <Dropdown placement="bottom-left">
                        <Dropdown.Trigger>
                          <button
                            onClick={() => {
                              setShowVideo(true);
                              setShowPost(true);
                            }}
                            className={`bg-white bg-opacity-25 hover:text-gray-400  flex items-center justify-center w-32 h-8 rounded-[5px] border border-white border-opacity-50 
                        
                        `}
                          >
                            <HomeIcon className="w-4 mr-2 h-4" />
                            Home
                          </button>
                        </Dropdown.Trigger>
                        <Dropdown.Menu
                          aria-label="Avatar Actions"
                          css={{ background: "Black" }}
                          className="flex flex-col gap-1"
                        >
                          <Dropdown.Item
                            css={{ height: "$18" }}
                            className="relative bg-black hover:bg-black flex flex-col justify-between items-center"
                          >
                            <div className="w-fit absolute left-0 top-5 ">
                              <Text
                                css={{
                                  d: "flex",
                                  color: "White",
                                  width: "fit-content",
                                }}
                              >
                                Computers{" "}
                              </Text>
                            </div>

                            <div className="w-fit absolute right-0 top-5 ">
                              <AiOutlineStar className=" text-white h-5 w-5" />
                            </div>
                          </Dropdown.Item>

                          <Dropdown.Item
                            css={{ height: "$18" }}
                            className="relative bg-black hover:bg-black flex flex-col justify-between items-center"
                          >
                            <div className="w-fit absolute left-0 top-5 ">
                              <Text
                                css={{
                                  d: "flex",
                                  color: "White",
                                  width: "fit-content",
                                }}
                              >
                                Design{" "}
                              </Text>
                            </div>

                            <div className="w-fit absolute right-0 top-5 ">
                              <AiOutlineStar className=" text-white h-5 w-5" />
                            </div>
                          </Dropdown.Item>

                          <Dropdown.Item
                            css={{ height: "$18" }}
                            className="relative bg-black hover:bg-black flex flex-col justify-between items-center"
                          >
                            <div className="w-fit absolute left-0 top-5 ">
                              <Text
                                css={{
                                  d: "flex",
                                  color: "White",
                                  width: "fit-content",
                                }}
                              >
                                Finance{" "}
                              </Text>
                            </div>

                            <div className="w-fit absolute right-0 top-5 ">
                              <AiOutlineStar className=" text-white h-5 w-5" />
                            </div>
                          </Dropdown.Item>
                          
                          <Dropdown.Item
                            css={{ height: "$18" }}
                            className="relative bg-black hover:bg-black flex flex-col justify-between items-center"
                          >
                            <div className="w-fit absolute left-0 top-5 ">
                              <Text
                                css={{
                                  d: "flex",
                                  color: "White",
                                  width: "fit-content",
                                }}
                              >
                                Economist{" "}
                              </Text>
                            </div>

                            <div className="w-fit absolute right-0 top-5 ">
                              <AiOutlineStar className=" text-white h-5 w-5" />
                            </div>
                          </Dropdown.Item>

                          <Dropdown.Item
                            css={{ height: "$18" }}
                            className="relative bg-black hover:bg-black flex flex-col justify-between items-center"
                          >
                            <div className="w-fit absolute left-0 top-5 ">
                              <Text
                                css={{
                                  d: "flex",
                                  color: "White",
                                  width: "fit-content",
                                }}
                              >
                                Business{" "}
                              </Text>
                            </div>

                            <div className="w-fit absolute right-0 top-5 ">
                              <AiOutlineStar className=" text-white h-5 w-5" />
                            </div>
                          </Dropdown.Item>

                          <Dropdown.Item
                            css={{ height: "$18" }}
                            className="relative bg-black hover:bg-black flex flex-col justify-between items-center"
                          >
                            <div className="w-fit absolute left-0 top-5 ">
                              <Text
                                css={{
                                  d: "flex",
                                  color: "White",
                                  width: "fit-content",
                                }}
                              >
                                Marketing{" "}
                              </Text>
                            </div>

                            <div className="w-fit absolute right-0 top-5 ">
                              <AiOutlineStar className=" text-white h-5 w-5" />
                            </div>
                          </Dropdown.Item>
                          
                        </Dropdown.Menu>
                      </Dropdown>
                      <button
                        onClick={() => {
                          setShowVideo(true);
                          setShowPost(true);
                        }}
                        className={`bg-white bg-opacity-25  flex items-center w-20 h-8 justify-center  rounded-[5px] border border-white border-opacity-50
                          hover:text-gray-400 ${
                            !showpost && showVideo
                              ? "bg-zinc-600 bg-opacity-10 rounded-[5px] border border-zinc-700 border-opacity-50"
                              : ""
                          }`}
                      >
                        <CheckBadgeIcon className="w-5 h-5 mr-2" />
                        All
                      </button>
                      <button
                        onClick={() => {
                          setShowPost(false);
                          setShowVideo(false);
                        }}
                        className={`cursor-pointer  flex items-center p-2 w-20 h-8 bg-zinc-600 bg-opacity-10 rounded-[5px] border border-zinc-700 border-opacity-50 ${
                          !showpost && !showVideo
                            ? "!bg-white !bg-opacity-25 !border-white !border-opacity-50"
                            : ""
                        } hover:text-gray-400 `}
                      >
                        {!showpost && !showVideo ? (
                          <DocumentIcon2 className="mr-2 h-4 w-4" />
                        ) : (
                          <DocumentIcon className="mr-2 h-4 w-4" />
                        )}
                        Blogs
                      </button>
                      <button
                        onClick={() => setShowVideo(true)}
                        className={`cursor-pointer  flex items-center  w-20 h-8 bg-zinc-600 bg-opacity-10 rounded-[5px] border border-zinc-700 border-opacity-50${
                          showVideo ? "" : ""
                        } hover:text-gray-400`}
                      >
                        <VideoCameraIcon className="mr-2 h-4 w-4" />
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
                        <div className="z-50 mr-20 right-8">
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
                        <div className="ml-[50vw] z-50 md:flex md:-ml-10 md:w-1 ">
                          <Link href="/publish-blog">
                            <Tooltip content="Publish a blog">
                              <div className="hidden lg:flex"></div>
                              <button className="hidden sm:bg-zinc-600 sm:px-2 sm:py-1 sm:bg-opacity-10 sm:rounded-[5px] sm:border sm:border-zinc-700 sm:border-opacity-50">
                                Create
                              </button>
                              <div className="mr-20">
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
                            <div
                              onClick={() => {
                                setShowModal(true);

                                setVideoName(video.snippet.title);
                                setVideoId(video.id.videoId);
                              }}
                            >
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
                            </div>
                          </div>
                        ))}
                      </div>
                      <Modal
                        closeButton
                        aria-labelledby="modal-title"
                        className="!bg-[#191919]/40 z-50 h-[70vh] flex justify-center items-center ml-10 backdrop-blur-md fixed top-0 left-0 right-0  w-full overflow-x-hidden overflow-y-auto md:inset-0"
                        width="80%"
                        // onClose={}
                        open={showModal}
                      >
                        <Modal.Header className="text-neutral-400">
                          <p className="text-neutral-400">{videoName}</p>
                        </Modal.Header>
                        <Modal.Body className="flex justify-center items-center h-full w-full">
                          {" "}
                          <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${videoId}`}
                            className="mr-20"
                            controls
                            width={960}
                            height={540}
                          />
                        </Modal.Body>
                      </Modal>
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
                  {/* <PostWidget />

                  <Categories /> */}
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
  const goals = await fetchGoals();
  const feed = await fetchVideos();

  return {
    props: {
      posts,
      users,
      feed,
      goals,
    },
  };
};
export default Socials;
