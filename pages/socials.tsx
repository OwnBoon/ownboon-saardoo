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
import { categories } from "../utils/constants";
import {
  CheckBadgeIcon,
  HomeIcon,
  DocumentIcon as DocumentIcon2,
} from "@heroicons/react/24/solid";
import { DocumentIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

import { Dropdown } from "@nextui-org/react";

import { AiOutlineStar } from "react-icons/ai";
import PostCardMobile from "../components/PostCardMobile";

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
  const [categoryselected, setcategoryselected] = useState("");

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

  const dropdownLogic = (category: string) => {
    if (match[0] && match[0].categories) {
      const dynamicCategoriesArray = category;

      const filteredPosts = posts.filter((post) => {
        const postCategories = post.categories
          .split(",")
          .map((category) => category.trim().toLowerCase());
        return postCategories.includes(category);
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

  const dropDownBlogs = dropdownLogic(categoryselected);
  // @ts-ignore

  useEffect(() => {
    refreshComments();
  }, []);
  const [showVideo, setShowVideo] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [showdropfeed, setshowdropfeed] = useState(false);
  const [videos, setVideos] = useState<Video[]>();
  const [showpost, setShowPost] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [showBlog, setShowBlog] = useState(false);
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
          <div className="container overflow-y-hidden mx-auto col-span-11  w-full py-8">
            <div className="grid grid-cols-1 w-full lg:grid-cols-12 overflow-y-scroll h-screen  rounded-lg  gap-12">
              {dropdown && (
                <div
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                  className=" absolute  z-50 top-36 mt-2 w-56 rounded-md shadow-lg bg-[#303030]/10 backdrop-blur-lg text-white ring-1 ring-black ring-opacity-5"
                >
                  <div className="py-2 gap-4 flex items-start w-full flex-col">
                    {/* @ts-ignore */}

                    <div
                      onClick={() => {
                        setcategoryselected("Computer Science");
                        setshowdropfeed(true);
                      }}
                      className="z-50 cursor-pointer "
                    >
                      <h1 className=" gap-2 items-center justify-center px-4 flex  w-full py-2 text-sm text-neutral-300 p-1 backdrop-blur-lg hover:bg-[#101010]/20 hover:border hover:border-white/10 rounded-md hover:text-neutral-200">
                        <img
                          className="h-7 w-7 rounded-full object-contain"
                          loading="lazy"
                          src="https://s3-alpha-sig.figma.com/img/2908/cde5/81f997a886d8d28ce717453947292db6?Expires=1698019200&Signature=cLiWHu0AYaGBhA9m2D5d3araaP7~ce7JAP8mqwoHQ8tOC4vH5nnIuBNtMn85tu7kdqavSeJmr7-wLrOznIyySHNUm~9ag1imCOiYL31liU93D5Et41-1Xoe06dM9RJAbw21mytNgHLUg1lagLUs3LJ6Ol8yTWqmi7m-TFjRDx887SQpVEg95CaDD-cba0Wsk~1CTwIgpUJpz7oS5Kxi3fEaXpe4iaYT7v7I-vo4ZboKialyxUpxInuhvvMDB05MXxGIYEwaVkSMXB~RPlcqZBzUYXwPP8kohRIltiKBUS9dfodLlBkEpCAm0aWXuTBOvCjUk-TKf9gIwir6pLJQ1pw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        />
                        Computers
                        <span className="font-sans">-</span>{" "}
                        <span className="text-white/20 font-light">
                          science
                        </span>
                      </h1>
                    </div>
                    <div
                      onClick={() => {
                        setcategoryselected("Finance");
                        setshowdropfeed(true);
                      }}
                      className="z-50 cursor-pointer "
                    >
                      <h1 className=" gap-2 items-center justify-center px-4 flex w-full py-2 text-sm text-neutral-300 p-1 backdrop-blur-lg hover:bg-[#101010]/20 hover:border hover:border-white/10 rounded-md hover:text-neutral-200">
                        <img
                          className="h-7 w-7 rounded-full object-contain"
                          loading="lazy"
                          src="https://s3-alpha-sig.figma.com/img/2908/cde5/81f997a886d8d28ce717453947292db6?Expires=1698019200&Signature=cLiWHu0AYaGBhA9m2D5d3araaP7~ce7JAP8mqwoHQ8tOC4vH5nnIuBNtMn85tu7kdqavSeJmr7-wLrOznIyySHNUm~9ag1imCOiYL31liU93D5Et41-1Xoe06dM9RJAbw21mytNgHLUg1lagLUs3LJ6Ol8yTWqmi7m-TFjRDx887SQpVEg95CaDD-cba0Wsk~1CTwIgpUJpz7oS5Kxi3fEaXpe4iaYT7v7I-vo4ZboKialyxUpxInuhvvMDB05MXxGIYEwaVkSMXB~RPlcqZBzUYXwPP8kohRIltiKBUS9dfodLlBkEpCAm0aWXuTBOvCjUk-TKf9gIwir6pLJQ1pw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        />
                        Finance
                        <span className="font-sans">-</span>{" "}
                        <span className="text-white/20 font-light">
                          economy
                        </span>
                      </h1>
                    </div>
                    <div
                      onClick={() => {
                        setcategoryselected("Art");
                        setshowdropfeed(true);
                      }}
                      className="z-50 cursor-pointer "
                    >
                      <h1 className=" gap-2 items-center justify-center px-4 flex  py-2 text-sm text-neutral-300 p-1 backdrop-blur-lg hover:bg-[#101010]/20 hover:border hover:border-white/10 rounded-md hover:text-neutral-200">
                        <img
                          className="h-7 w-7 rounded-full object-contain"
                          loading="lazy"
                          src="https://s3-alpha-sig.figma.com/img/2908/cde5/81f997a886d8d28ce717453947292db6?Expires=1698019200&Signature=cLiWHu0AYaGBhA9m2D5d3araaP7~ce7JAP8mqwoHQ8tOC4vH5nnIuBNtMn85tu7kdqavSeJmr7-wLrOznIyySHNUm~9ag1imCOiYL31liU93D5Et41-1Xoe06dM9RJAbw21mytNgHLUg1lagLUs3LJ6Ol8yTWqmi7m-TFjRDx887SQpVEg95CaDD-cba0Wsk~1CTwIgpUJpz7oS5Kxi3fEaXpe4iaYT7v7I-vo4ZboKialyxUpxInuhvvMDB05MXxGIYEwaVkSMXB~RPlcqZBzUYXwPP8kohRIltiKBUS9dfodLlBkEpCAm0aWXuTBOvCjUk-TKf9gIwir6pLJQ1pw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        />
                        Arts
                        <span className="font-sans">-</span>{" "}
                        <span className="text-white/20 font-light">
                          creativity
                        </span>
                      </h1>
                    </div>
                    <div
                      onClick={() => {
                        setcategoryselected("Artificial Intelligence");
                        setshowdropfeed(true);
                      }}
                      className="z-50 cursor-pointer "
                    >
                      <h1 className=" gap-2 items-center justify-center px-4 flex  py-2 text-sm text-neutral-300 p-1 backdrop-blur-lg hover:bg-[#101010]/20 hover:border hover:border-white/10 rounded-md hover:text-neutral-200">
                        <img
                          className="h-7 w-7 rounded-full object-contain"
                          loading="lazy"
                          src="https://s3-alpha-sig.figma.com/img/2908/cde5/81f997a886d8d28ce717453947292db6?Expires=1698019200&Signature=cLiWHu0AYaGBhA9m2D5d3araaP7~ce7JAP8mqwoHQ8tOC4vH5nnIuBNtMn85tu7kdqavSeJmr7-wLrOznIyySHNUm~9ag1imCOiYL31liU93D5Et41-1Xoe06dM9RJAbw21mytNgHLUg1lagLUs3LJ6Ol8yTWqmi7m-TFjRDx887SQpVEg95CaDD-cba0Wsk~1CTwIgpUJpz7oS5Kxi3fEaXpe4iaYT7v7I-vo4ZboKialyxUpxInuhvvMDB05MXxGIYEwaVkSMXB~RPlcqZBzUYXwPP8kohRIltiKBUS9dfodLlBkEpCAm0aWXuTBOvCjUk-TKf9gIwir6pLJQ1pw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        />
                        AI
                        <span className="font-sans">-</span>{" "}
                        <span className="text-white/20 font-light">
                          comp.sci
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>
              )}
              <div className="lg:col-span-8 col-span-1  ">
                <div className="flex lg:text-md gap-10  justify-between w-[100vw] items-center">
                  <div className="flex justify-between overflow-x-scroll  w-full lg:overflow-hidden scrollbar-thin  mt-4 pt-5 pb-5 fixed  gap-10 items-center bg-[#121212] ">
                    <div className="flex justify-between    items-center gap-10">
                      <button
                        onMouseLeave={() => setDropdown(false)}
                        onClick={() => setDropdown(true)}
                        className={`bg-white bg-opacity-25 hover:text-gray-400  flex items-center justify-center w-32 h-8 rounded-[5px] border border-white border-opacity-50 
                        
                        `}
                      >
                        <HomeIcon className="w-4 mr-2 h-4" />
                        Home
                      </button>

                      <button
                        onClick={() => {
                          setShowVideo(false);
                          setShowPost(false);
                          setshowdropfeed(false);
                          setShowAll(true);
                        }}
                        className={`bg-white bg-opacity-25  flex items-center w-20 h-8 justify-center  rounded-[5px] border border-white border-opacity-50
                          hover:text-gray-400 ${
                            showAll
                              ? "bg-zinc-600 bg-opacity-10 rounded-[5px] border !border-zinc-700 border-opacity-50"
                              : "bg-white bg-opacity-25"
                          }`}
                      >
                        <CheckBadgeIcon className="w-5 h-5 mr-2" />
                        All
                      </button>
                      <button
                        onClick={() => {
                          setShowPost(false);
                          setShowVideo(false);
                          setShowBlog(true);
                          setShowAll(false);
                        }}
                        className={`cursor-pointer  flex items-center p-2 w-20 h-8 bg-zinc-600 bg-opacity-10 rounded-[5px] border border-zinc-700 border-opacity-50 ${
                          showBlog
                            ? "!bg-white !bg-opacity-25 !border-white !border-opacity-50"
                            : ""
                        } hover:text-gray-400 `}
                      >
                        {showBlog ? (
                          <DocumentIcon2 className="mr-2 h-4 w-4" />
                        ) : (
                          <DocumentIcon className="mr-2 h-4 w-4" />
                        )}
                        Blogs
                      </button>
                      <button
                        onClick={() => {
                          setShowVideo(true);
                          setShowBlog(false);
                          setShowAll(false);
                          setShowPost(false);
                        }}
                        className={`cursor-pointer  flex items-center  w-20 h-8 bg-zinc-600 bg-opacity-10 rounded-[5px] border border-zinc-700 border-opacity-50${
                          showVideo
                            ? "!bg-white !bg-opacity-50 !border-white !border-opacity-50"
                            : ""
                        } hover:text-gray-400`}
                      >
                        <VideoCameraIcon className="mr-2 h-4 w-4" />
                        Videos
                      </button>
                      <button
                        onClick={() => {
                          setShowVideo(false);
                          setShowPost(true);
                          setShowAll(false);
                          setShowBlog(false);
                        }}
                        className={`cursor-pointer  flex items-center p-2 w-20 h-8 bg-zinc-600 bg-opacity-10 rounded-[5px] border border-zinc-700 border-opacity-50 ${
                          showpost && !showVideo
                            ? "!bg-white !bg-opacity-25 !border-white !border-opacity-50"
                            : ""
                        } hover:text-gray-400 `}
                      >
                        <FaEdit className="mr-2" />
                        Posts
                      </button>
                      <div className="flex-grow"></div>
                      {showpost ? (
                        <div className="z-50 mr-20 right-8">
                          <Link href="/publishpost">
                            <Tooltip content="Publish a post">
                              <button className="bg-zinc-600 px-2 py-1 bg-opacity-10 rounded-[5px] border border-zinc-700 border-opacity-50">
                                Create
                              </button>
                            </Tooltip>
                          </Link>
                        </div>
                      ) : (
                        <div className="ml-[50vw] z-50 md:flex md:-ml-10 md:w-1 ">
                          <Link href="/publish-blog">
                            <Tooltip content="Publish a blog">
                              <div className=""></div>
                              <button className=" sm:bg-zinc-600 sm:px-2 sm:py-1 sm:bg-opacity-10 sm:rounded-[5px] sm:border sm:border-zinc-700 sm:border-opacity-50">
                                Create
                              </button>
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
                      {showAll && (
                        <>
                          {" "}
                          {
                            //@ts-ignore
                            filteredPosts?.length > 0
                              ? filteredPosts!.map((post, index) => (
                                  <div className="z-10">
                                    <PostCard
                                      match={match}
                                      users={users}
                                      key={index}
                                      post={post}
                                    />
                                    {/* @ts-ignore */}

                                    <PostCardMobile
                                      match={match}
                                      users={users}
                                      key={index}
                                      post={post}
                                    />
                                  </div>
                                ))
                              : posts!.map((post, index) => (
                                  <div className="z-10">
                                    <PostCard
                                      match={match}
                                      users={users}
                                      key={index}
                                      post={post}
                                    />
                                    {/* @ts-ignore */}

                                    <PostCardMobile
                                      match={match}
                                      users={users}
                                      key={index}
                                      post={post}
                                    />
                                  </div>
                                ))
                          }
                        </>
                      )}
                      {showpost ? (
                        <div className="p-5  space-y-4">
                          {feed.map((feeds, index) => (
                            <div className="z-10">
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
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="">
                          {!showdropfeed ? (
                            <div>
                              {
                                //@ts-ignore
                                filteredPosts?.length > 0
                                  ? filteredPosts!.map((post, index) => (
                                      <div className="z-10">
                                        <PostCard
                                          match={match}
                                          users={users}
                                          key={index}
                                          post={post}
                                        />
                                        {/* @ts-ignore */}
                                        <PostCardMobile
                                          match={match}
                                          users={users}
                                          key={index}
                                          post={post}
                                        />
                                      </div>
                                    ))
                                  : posts!.map((post, index) => (
                                      <div className="z-10">
                                        <PostCard
                                          match={match}
                                          users={users}
                                          key={index}
                                          post={post}
                                        />
                                        {/* @ts-ignore */}
                                        <PostCardMobile
                                          match={match}
                                          users={users}
                                          key={index}
                                          post={post}
                                        />
                                      </div>
                                    ))
                              }
                            </div>
                          ) : (
                            <div>
                              {dropDownBlogs!.map((post, index) => (
                                <div className="z-10">
                                  <PostCard
                                    match={match}
                                    users={users}
                                    key={index}
                                    post={post}
                                  />
                                  {/* @ts-ignore */}

                                  <PostCardMobile
                                    match={match}
                                    users={users}
                                    key={index}
                                    post={post}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="col-span-3 hidden w-full  h-fit lg:inline z-50 text-white mt-14">
                <div className=" bg-zinc-600 p-3 py-5 mr-3 flex h-fit flex-col items-center gap-5 justify-center w-full bg-opacity-20 rounded-[10px] border border-zinc-700 border-opacity-50">
                  <h1>Top Interests</h1>
                  <div className="flex flex-col gap-3 items-start">
                    {//@ts-ignore
                      filteredPosts?.length > 0 ? filteredPosts?.map((blogs) => (
                      <Link
                        href={`/user/${blogs.author}`}
                        className="gap-3 flex items-center"
                      >
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={blogs.profileImage}
                        />
                        <h1>{blogs.author}</h1>
                      </Link>
                    )) : posts?.map((blogs) => (
                      <Link
                        href={`/user/${blogs.author}`}
                        className="gap-3 flex items-center"
                      >
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={blogs.profileImage}
                        />
                        <h1>{blogs.author}</h1>
                      </Link>
                    ))
                    
                    
                    }
                  </div>
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
