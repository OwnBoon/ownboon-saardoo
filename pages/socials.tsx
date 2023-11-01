import Link from "next/link";
import { Comment, CommentBody, Goals, Posts, User, Videos } from "../typings";
import { GetServerSideProps, GetStaticProps } from "next";
// import { fecthBlogs } from "../utils/fetchBlogs";
import { useUser } from "@clerk/nextjs";
import { Suspense, useEffect, useState } from "react";
import { fetchUsers } from "../utils/fetchUsers";
import { fetchFromAPI } from "../utils/fetchVideo";
// import ReactPlayer from "react-player";
import { FiFilter } from "react-icons/fi";
// import {
//   Button,
//   Container,
//   Grid,
//   Input,
//   Loading,
//   Modal,
//   Spacer,
//   Text,
//   Tooltip,
//   User as Users,
// } from "@nextui-org/react";
import { fetchVideos } from "../utils/fetchPosts";
// import TimeAgo from "react-timeago";
import { fetchComments } from "../utils/fetchComments";
import FeedCard from "../components/FeedCard";
import Layout from "../components/Layout/Layout";
// import { useRouter } from "next/router";
import { fetchGoals } from "../utils/fetchGoals";
import { categories } from "../utils/constants";

import { Skeleton, Stack } from "@mui/material";
import { Loading } from "@nextui-org/react";

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
  users: User[];
  videoData: Video[];
  feed: Videos[];
  goals: Goals[];
}

function Socials({ users, videoData, feed, goals }: Props) {
  const { isLoaded, isSignedIn, user } = useUser();

  const today = new Date();
  const match = users.filter(
    (userss) => userss.email == user?.emailAddresses[0].emailAddress
  );

  const [selectedTool, setSelectedTool] = useState("All");
  const id = feed.map((post) => post._id);
  const [comments, setComments] = useState<Comment[]>([]);
  const [categoryselected, setcategoryselected] = useState("");

  const refreshComments = async () => {
    // @ts-ignore

    const comments: Comment[] = await fetchComments(id);
    setComments(comments);
  };

  // const logic = () => {
  //   if (match[0] && match[0].categories) {
  //     const dynamicCategoriesArray = match[0]
  //       .categories!.split(",")
  //       .map((category) => category.trim().toLowerCase());

  //     const filteredPosts = posts.filter((post) => {
  //       if (!post.categories) return false; // Skip posts with no categories
  //       const postCategories = post.categories
  //         .split(",")
  //         .map((category) => category.trim().toLowerCase());
  //       return dynamicCategoriesArray.some((category) =>
  //         postCategories.includes(category)
  //       );
  //     });

  //     filteredPosts.sort((a, b) => {
  //       const dateA = a._createdAt ? new Date(a._createdAt) : null;
  //       const dateB = b._createdAt ? new Date(b._createdAt) : null;

  //       if (dateA && dateB) {
  //         // @ts-ignore
  //         return dateB - dateA; // Sort in descending order
  //       } else if (dateA) {
  //         return -1; // DateB is undefined or invalid, so dateA should come first
  //       } else if (dateB) {
  //         return 1; // DateA is undefined or invalid, so dateB should come first
  //       } else {
  //         return 0; // Both dates are undefined or invalid, no change in order
  //       }
  //     });

  //     return filteredPosts;
  //   } else {
  //     // Handle the case where match[0] or match[0].categories is undefined
  //     console.error("match[0] or match[0].categories is undefined");
  //   }
  // };

  // const dropdownLogic = (category: string) => {
  //   if (match[0] && match[0].categories) {
  //     const dynamicCategoriesArray = category;

  //     const filteredPosts = posts.filter((post) => {
  //       const postCategories = post.categories
  //         .split(",")
  //         .map((category) => category.trim().toLowerCase());
  //       return postCategories.includes(category.toLocaleLowerCase());
  //     });

  //     console.log("filtered", filteredPosts);

  //     filteredPosts.sort((a, b) => {
  //       const dateA = a._createdAt ? new Date(a._createdAt) : null;
  //       const dateB = b._createdAt ? new Date(b._createdAt) : null;

  //       if (dateA && dateB) {
  //         // @ts-ignore
  //         return dateB - dateA; // Sort in descending order
  //       } else if (dateA) {
  //         return -1; // DateB is undefined or invalid, so dateA should come first
  //       } else if (dateB) {
  //         return 1; // DateA is undefined or invalid, so dateB should come first
  //       } else {
  //         return 0; // Both dates are undefined or invalid, no change in order
  //       }
  //     });

  //     return filteredPosts;
  //   } else {
  //     // Handle the case where match[0] or match[0].categories is undefined
  //     console.error("match[0] or match[0].categories is undefined");
  //   }
  // };

  // const filteredPosts = logic();

  // const dropDownBlogs = dropdownLogic(categoryselected);
  // @ts-ignore

  useEffect(() => {
    refreshComments();
  }, []);

  const [create, SetCreate] = useState(false);

  // const [dropdown, setDropdown] = useState(false);
  // const [filter, setFilter] = useState(false);
  const [videos, setVideos] = useState<Video[]>();
  const [showFilter, setShowFilter] = useState(false);
  const [videoName, setVideoName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [videoId, setVideoId] = useState("");
  const options = { month: "long", day: "numeric", year: "numeric" };
  // @ts-ignore
  // const formattedDate = today.toLocaleDateString("en-US", options);
  // @ts-ignore
  // const PostCard = dynamic(() => import("../components/PostCard"), {
  //   ssr: false,
  // });

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

  // useEffect(() => {
  //   if (isLoaded) {
  //     console.log("feetched");
  //     const categoriesArray = match[0].about
  //       ?.split(",")
  //       .map((category) => category.trim());
  //     fetchFromAPI(`search?part=snippet&q=${categoriesArray}`).then((data) =>
  //       setVideos(data.items)
  //     );
  //   } else {
  //     console.log("not feetched");
  //   }
  // }, [isLoaded]);
  // @ts-ignore

  if (!isSignedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  const handleCreate = () => {
    SetCreate(!create);
  };

  const interest = [
    {
      id: 1,
      name: "Computer Science",
      link: "",
    },
  ];

  const filterFeed = feed.filter((feeds) =>
    feeds.categories.split(",").includes(selectedTool)
  );

  const categories = ["Computer", "Science", "Arts", "AI"];

  const categoriesArray = match[0].categories?.split(",");
  const filteredArr = categoriesArray!.filter((item) => item !== "undefined");
  // @ts-ignore
  const uniqueArr = [...new Set(filteredArr)];
  // const res = categories.filter((item) => !categoriesArray?.includes(item));

  const selected =
    "bg-white bg-opacity-30 self-stretch hidden  md:flex w-fit max-w-full  items-center cursor-pointer shine-button justify-between gap-1 pl-3.5 pr-5 py-2 rounded-md border-[0.75px] border-solid border-white border-opacity-50";
  const normal =
    "bg-zinc-600 bg-opacity-10 hidden  shine-button self-stretch md:flex w-fit max-w-full items-center justify-between gap-1 pl-3.5 pr-5 py-2 rounded-md border-[0.75px] border-solid border-zinc-700 border-opacity-50";

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
          <div className="flex justify-start md:justify-between p-5 w-full">
            {/* right part */}
            <div className="md:px-10  w-full">
              {/* top bar */}
              <div>
                <div className="md:self-stretch flex w-full items-start justify-between gap-5 ">
                  <div className="md:self-stretch hidden md:flex items-start justify-between gap-5 max-md:max-w-full  max-md:justify-center">
                    <div
                      onClick={() => setSelectedTool("All")}
                      className={selectedTool == "All" ? selected : normal}
                    >
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/22d570a0-c3d6-4f60-aae7-202eb8950e53?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/22d570a0-c3d6-4f60-aae7-202eb8950e53?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/22d570a0-c3d6-4f60-aae7-202eb8950e53?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/22d570a0-c3d6-4f60-aae7-202eb8950e53?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/22d570a0-c3d6-4f60-aae7-202eb8950e53?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/22d570a0-c3d6-4f60-aae7-202eb8950e53?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/22d570a0-c3d6-4f60-aae7-202eb8950e53?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/22d570a0-c3d6-4f60-aae7-202eb8950e53?apiKey=8d19dab166a647fb9eff6738dee1ce62&"
                        className="   w-4 h-4  overflow-hidden "
                      />
                      <div className="text-white font-sans text-sm font-medium  my-auto">
                        All
                      </div>
                    </div>
                    {uniqueArr?.map((categories) => (
                      <div
                        onClick={() => setSelectedTool(categories)}
                        className={
                          selectedTool == categories ? selected : normal
                        }
                      >
                        {/* <img
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/39d9d9f4-feff-4084-ab5b-072fbad19ab0?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/39d9d9f4-feff-4084-ab5b-072fbad19ab0?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/39d9d9f4-feff-4084-ab5b-072fbad19ab0?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/39d9d9f4-feff-4084-ab5b-072fbad19ab0?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/39d9d9f4-feff-4084-ab5b-072fbad19ab0?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/39d9d9f4-feff-4084-ab5b-072fbad19ab0?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/39d9d9f4-feff-4084-ab5b-072fbad19ab0?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/39d9d9f4-feff-4084-ab5b-072fbad19ab0?apiKey=8d19dab166a647fb9eff6738dee1ce62&"
                          className="aspect-square object-cover object-center h-4 w-4 overflow-hidden "
                        /> */}
                        <div className="text-zinc-300 text-sm font-medium self-center my-auto">
                          {categories}
                        </div>
                      </div>
                    ))}

                    {/* <div
                      onClick={() => setSelectedTool("Blog")}
                      className={selectedTool == "Blog" ? selected : normal}
                    >
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/57c3ad86-6ed0-4f9e-b582-88843bff8240?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/57c3ad86-6ed0-4f9e-b582-88843bff8240?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/57c3ad86-6ed0-4f9e-b582-88843bff8240?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/57c3ad86-6ed0-4f9e-b582-88843bff8240?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/57c3ad86-6ed0-4f9e-b582-88843bff8240?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/57c3ad86-6ed0-4f9e-b582-88843bff8240?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/57c3ad86-6ed0-4f9e-b582-88843bff8240?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/57c3ad86-6ed0-4f9e-b582-88843bff8240?apiKey=8d19dab166a647fb9eff6738dee1ce62&"
                        className="aspect-square object-cover object-center w-4 h-4 overflow-hidden "
                      />
                      <div className="text-zinc-300 text-sm font-medium mt-1">
                        Blog
                      </div>
                    </div> */}
                    {/* <div
                      onClick={() => setSelectedTool("Video")}
                      className={selectedTool == "Video" ? selected : normal}
                    >
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/dc0e0c6d-5099-4f58-9b95-e657148b1d80?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc0e0c6d-5099-4f58-9b95-e657148b1d80?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc0e0c6d-5099-4f58-9b95-e657148b1d80?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc0e0c6d-5099-4f58-9b95-e657148b1d80?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc0e0c6d-5099-4f58-9b95-e657148b1d80?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc0e0c6d-5099-4f58-9b95-e657148b1d80?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc0e0c6d-5099-4f58-9b95-e657148b1d80?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc0e0c6d-5099-4f58-9b95-e657148b1d80?apiKey=8d19dab166a647fb9eff6738dee1ce62&"
                        className="aspect-square object-cover object-center w-4 h-4 overflow-hidden "
                      />
                      <div className="text-zinc-300 text-sm font-medium self-center my-auto">
                        Video
                      </div>
                    </div> */}
                  </div>
                  <div
                    onClick={() => {
                      showFilter ? setShowFilter(false) : setShowFilter(true);
                    }}
                    className="bg-zinc-600 md:hidden bg-opacity-10   shine-button  flex w-fit  items-center justify-between gap-1 pl-3.5 pr-5 py-2 rounded-md border-[0.75px] border-solid border-zinc-700 border-opacity-50"
                  >
                    <FiFilter />
                    <h1>Filter</h1>
                  </div>
                  <div
                    className={` absolute ${showFilter
                        ? "absolute h-fit transition-all duration-100"
                        : "hidden h-0 transition-all duration-100"
                      } md:hidden top-[9.5rem] z-50 mt-2 w-56 rounded-md shadow-lg bg-[#303030]/10 backdrop-blur-lg text-white ring-1 ring-black ring-opacity-5`}
                  >
                    <div className="py-2 gap-4 flex flex-col">
                      {/* @ts-ignore */}
                      {uniqueArr.map((categories, index) => (
                        <div>
                          <h1
                            key={index}
                            className="block px-4  py-2 text-sm text-neutral-300 p-1 backdrop-blur-lg hover:bg-[#101010]/20 hover:border hover:border-white/10 rounded-md hover:text-neutral-200"
                          >
                            {categories}
                          </h1>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-zinc-600 bg-opacity-10 self-stretch flex w-20 max-w-full items-center justify-between gap-1 pl-1.5 pr-4 py-2 rounded-md border-[0.75px] border-solid border-zinc-700 border-opacity-50">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0bbaafe2-c126-4056-b171-3b54bd7051a8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bbaafe2-c126-4056-b171-3b54bd7051a8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bbaafe2-c126-4056-b171-3b54bd7051a8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bbaafe2-c126-4056-b171-3b54bd7051a8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bbaafe2-c126-4056-b171-3b54bd7051a8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bbaafe2-c126-4056-b171-3b54bd7051a8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bbaafe2-c126-4056-b171-3b54bd7051a8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0bbaafe2-c126-4056-b171-3b54bd7051a8?apiKey=8d19dab166a647fb9eff6738dee1ce62&"
                      className=" w-4 h-4 "
                    />
                    <Link
                      href={"/publishpost"}
                      className="text-zinc-300 text-sm self-center my-auto"
                    >
                      Create
                    </Link>
                  </div>
                </div>
              </div>
              {/* posts */}
              <Suspense>
                <div className="h-screen overflow-y-scroll mt-2 rounded-lg">
                  {selectedTool !== "All" ? (
                    <>
                      {filterFeed.map((feeds) => (
                        <section id={feeds.title}>
                          <FeedCard feeds={feeds} match={match} users={users} />
                        </section>
                      ))}
                    </>
                  ) : (
                    <>
                      {feed.map((feeds) => (
                        <FeedCard feeds={feeds} match={match} users={users} />
                      ))}
                    </>
                  )}
                  {!feed ? (
                    <Stack spacing={1}>
                      {/* For variant="text", adjust the height via font-size */}
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

                      {/* For other variants, adjust the size with `width` and `height` */}
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="rectangular" width={210} height={60} />
                      <Skeleton variant="rounded" width={210} height={60} />
                    </Stack>
                  ) : null}
                </div>
              </Suspense>
            </div>
            <div className="p-5 hidden lg:inline">
              {/* below part */}
              <div className="bg-zinc-600 bg-opacity-10 flex w-full pl-9 pr-3 max-w-full flex-col  mx-auto mt-11 pt-7 pb-16 mr-20 ml-1 rounded-xl border-[0.75px] border-solid border-zinc-700 border-opacity-50 ">
                <div className="flex w-[137px] max-w-full flex-col ml-6 max-md:ml-2.5">
                  <div className="text-zinc-300 text-center text-base max-md:mr-px">
                    Top Interests
                  </div>
                  <div className="items-start flex w-full gap-2.5 mt-6">
                    <div className="self-stretch flex">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&"
                        className="aspect-square object-cover object-center w-full overflow-hidden self-stretch"
                      />
                      <div className="ml-2">
                        <div className="text-zinc-300 text-sm">Community </div>
                        <div className="text-stone-300 text-xs mt-1">
                          123k Posts
                          <br />
                          50k followers
                        </div>
                      </div>
                      
                    </div>
                    
                    
                  </div>
                  <div className="items-start flex w-full gap-2.5 mt-6">
                    <div className="self-stretch flex">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&"
                        className="aspect-square object-cover object-center w-full overflow-hidden self-stretch"
                      />
                      <div className="ml-2">
                        <div className="text-zinc-300 text-sm">Community </div>
                        <div className="text-stone-300 text-xs mt-1">
                          123k Posts
                          <br />
                          50k followers
                        </div>
                      </div>
                      
                    </div>
                    
                    
                  </div><div className="items-start flex w-full gap-2.5 mt-6">
                    <div className="self-stretch flex">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&"
                        className="aspect-square object-cover object-center w-full overflow-hidden self-stretch"
                      />
                      <div className="ml-2">
                        <div className="text-zinc-300 text-sm">Community </div>
                        <div className="text-stone-300 text-xs mt-1">
                          123k Posts
                          <br />
                          50k followers
                        </div>
                      </div>
                      
                    </div>
                    
                    
                  </div>
                  <div className="items-start flex w-full gap-2.5 mt-6">
                    <div className="self-stretch flex">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/cd676620-55f7-42c5-8a12-8710abc528f8?apiKey=8d19dab166a647fb9eff6738dee1ce62&"
                        className="aspect-square object-cover object-center w-full overflow-hidden self-stretch"
                      />
                      <div className="ml-2">
                        <div className="text-zinc-300 text-sm">Community </div>
                        <div className="text-stone-300 text-xs mt-1">
                          123k Posts
                          <br />
                          50k followers
                        </div>
                      </div>
                      
                    </div>
                    
                    
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

export const getStaticProps: GetStaticProps = async (context) => {
  // const posts = await fecthBlogs();
  const users = await fetchUsers();
  const goals = await fetchGoals();
  const feed = await fetchVideos();

  return {
    props: {
      // posts,
      users,
      feed,
      goals,
    },
    revalidate: 40,
  };
};
export default Socials;
