import Link from "next/link";
import groq from "groq";
import { sanityClient } from "../sanity";
import { Comment, CommentBody, Goals, Posts, User, Videos } from "../typings";
import Sidebar from "../components/dashboard/Sidebar";
import Progress from "../components/dashboard/Progress";
import { useSession } from "next-auth/react";
import { FaVideo, FaBlogger, FaEdit, FaList, FaFilter, FaHome, FaPlus, FaThumbsUp, FaShareAlt, FaExclamationCircle } from "react-icons/fa";
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
import { fetchGoals } from "../utils/fetchGoals";
import PostCardDummy from "../components/PostCardDummy";
// import './styles.css'
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

const socialsPageTabs = {
  all: 'all',
  blogs: 'blogs',
  videos: 'videos',
  posts: 'posts'
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
    document.getElementById("postsection")?.scrollTo(0, 0)
    refreshComments();
  }, []);
  const [showVideo, setShowVideo] = useState(true);
  const [weeklydata, setweeklydata] = useState([
    {
      text: "Lorem ipsum dolor sit amet",
      image: "/icon.png",
      created: "Creator : Ut enim"
    },
    {
      text: "Lorem ipsum dolor sit amet",
      image: "/icon.png",
      created: "Creator : Ut enim"
    }, {
      text: "Lorem ipsum dolor sit amet",
      image: "/icon.png",
      created: "Creator : Ut enim"
    },
    {
      text: "Lorem ipsum dolor sit amet",
      image: "/icon.png",
      created: "Creator : Ut enim"
    },
    {
      text: "Lorem ipsum dolor sit amet",
      image: "/icon.png",
      created: "Creator : Ut enim"
    }, {
      text: "Lorem ipsum dolor sit amet",
      image: "/icon.png",
      created: "Creator : Ut enim"
    }
  ])
  const [followdata, setfollowdata] = useState([
    {
      text: "Lorem ipsum dolor...",
      image: "/followicon.png",
      created: "Ut enim"
    },
    {
      text: "Lorem ipsum dolor...",
      image: "/followicon.png",
      created: "Ut enim"
    }
    , {
      text: "Lorem ipsum dolor...",
      image: "/followicon.png",
      created: "Ut enim"
    }
  ])

  const [showall, setshowall] = useState(true)
  const [showblog, setshowblog] = useState(false)
  const [showposts, setshowposts] = useState(false)
  const [showvideos, setshowvideos] = useState(false)

  const [videos, setVideos] = useState<Video[]>();
  const [showpost, setShowPost] = useState(true);
  const [showFilter, setShowFilter] = useState(true);

  const [selectedTab, setSelectedTab] = useState(socialsPageTabs.all)

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
      console.log("feetched", match);

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
      >
        <div className="overflow-y-hidden w-full">
          <div className="flex flex-col w-full lg:flex-row overflow-y-hidden h-screen w-100">
            <div className="lg:w-3/4 w-100">
              <div className="flex lg:text-md h-fit overflow-y-auto  gap-10 justify-between w-full items-center w-100">
                <div className="flex justify-between w-auto gap-10 items-center bg-[#121212] m-3" style={{ width: "100%" }}>
                  <div className="lg:hidden items-center w-100">
                    <button
                      onClick={() => setShowFilter(!showFilter)}
                      className={`cursor-pointer rounded-lg flex items-center p-2 ${showFilter
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
                  <div className="hidden lg:flex justify-between items-center mt-2 gap-10" style={{ width: "100%" }}>

                    <button
                      onClick={() => {
                        setSelectedTab(socialsPageTabs.all)

                      }}
                      className={`cursor-pointer rounded-lg flex items-center p-2  ${selectedTab == socialsPageTabs.all
                        ? "blogfilteractive"
                        : "blogfilter"
                        } `}
                    >
                      <FaList className="mr-2" />
                      All
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTab(socialsPageTabs.blogs)
                      }}
                      className={`cursor-pointer rounded-lg flex items-center p-2  ${selectedTab == socialsPageTabs.blogs
                        ? "blogfilteractive"
                        : "blogfilter"
                        } `}
                    >
                      <FaBlogger className="mr-2" />
                      Blogs
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTab(socialsPageTabs.videos)
                      }}
                      className={`cursor-pointer rounded-lg flex items-center p-2  ${selectedTab == socialsPageTabs.videos
                        ? "blogfilteractive"
                        : "blogfilter"
                        }`}
                    >
                      <FaVideo className="mr-2" />
                      Videos
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTab(socialsPageTabs.posts)
                      }}
                      className={`cursor-pointer rounded-lg flex items-center p-2  ${selectedTab == socialsPageTabs.posts
                        ? "blogfilteractive"
                        : "blogfilter"
                        } `}
                    >
                      <FaEdit className="mr-2" />
                      Posts
                    </button>
                    <div className="flex-grow"></div>
                    {showpost ? (
                      <div className="z-50 ml-10 right-8">
                        <Link href="/publishpost">
                          <Tooltip content="Publish a post">
                            <button

                              className={`cursor-pointer rounded-lg flex items-center p-2 blogfilter`}
                            >
                              <FaPlus className="mr-2" />
                              Create
                            </button>
                          </Tooltip>
                        </Link>
                      </div>
                    ) : (
                      <div className=" z-50 ml-56 lg-flex lg:justify-items-end px-2 ">
                        <Link href="/publish-blog">
                          <Tooltip content="Publish a blog">
                            <div className="hidden lg:flex"></div>
                            <button

                              className={`cursor-pointer rounded-lg flex items-center p-2 blogfilter`}
                            >
                              <FaPlus className="mr-2" />
                              Create
                            </button>
                            <div className="lg:hidden flex justify-items-end">
                              <button

                                className={`cursor-pointer rounded-lg flex items-center p-2 blogfilter`}
                              >
                                <FaPlus className="mr-2" />
                                Create
                              </button>
                            </div>
                          </Tooltip>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedTab == socialsPageTabs.blogs ? <>
                <div className="m-5 scrollblogdata ">
                  <div className=" blogweekly p-4 mt-5">
                    <img src="/blogimage.png" className="img-fluid " style={{ width: "100vw", height: "22rem", borderRadius: "10px" }} />

                    <div className="alignbetween mt-4"> <p>The Theory of Time - Codehecker</p><FaExclamationCircle className="mr-2" /></div>

                    <p className="mt-3 mb-3">vitae tempus. Arcu felis bibendum ut tristique et egestas quis. Lectus urna duis convallis convallis tellus id interdum. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Ultrices sagittis orci a scelerisque purus. Posuere ac ut consequat semper viverra nam libero justo laoreet. Integer enim neque volutpat ac. Velit laoreet id donec ultrices tincidunt. In pellentesque massa placerat duis ultricies lacus sed. Tristique senectus et netus et malesuada. Gravida in fermentum et sollicitudin. Commodo ullamcorper a lacus vestibulum. In cursus turpis massa tincidunt dui ut ornare. Odio euismod lacinia at quis.Erat velit scelerisque in...</p>
                    <span><FaThumbsUp className="mr-2" /> <FaShareAlt className="mr-2" /></span>
                  </div>
                  <div className=" blogweekly p-4 mt-5">
                    <img src="/blogimage.png" className="img-fluid " style={{ width: "100vw", height: "22rem", borderRadius: "10px" }} />

                    <div className="alignbetween mt-4"> <p>The Theory of Time - Codehecker</p><FaExclamationCircle className="mr-2" /></div>

                    <p className="mt-3 mb-3">vitae tempus. Arcu felis bibendum ut tristique et egestas quis. Lectus urna duis convallis convallis tellus id interdum. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Ultrices sagittis orci a scelerisque purus. Posuere ac ut consequat semper viverra nam libero justo laoreet. Integer enim neque volutpat ac. Velit laoreet id donec ultrices tincidunt. In pellentesque massa placerat duis ultricies lacus sed. Tristique senectus et netus et malesuada. Gravida in fermentum et sollicitudin. Commodo ullamcorper a lacus vestibulum. In cursus turpis massa tincidunt dui ut ornare. Odio euismod lacinia at quis.Erat velit scelerisque in...</p>
                    <span><FaThumbsUp className="mr-2" /> <FaShareAlt className="mr-2" /></span>
                  </div><div className=" blogweekly p-4 mt-5">
                    <img src="/blogimage.png" className="img-fluid " style={{ width: "100vw", height: "22rem", borderRadius: "10px" }} />

                    <div className="alignbetween mt-4"> <p>The Theory of Time - Codehecker</p><FaExclamationCircle className="mr-2" /></div>

                    <p className="mt-3 mb-3">vitae tempus. Arcu felis bibendum ut tristique et egestas quis. Lectus urna duis convallis convallis tellus id interdum. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Ultrices sagittis orci a scelerisque purus. Posuere ac ut consequat semper viverra nam libero justo laoreet. Integer enim neque volutpat ac. Velit laoreet id donec ultrices tincidunt. In pellentesque massa placerat duis ultricies lacus sed. Tristique senectus et netus et malesuada. Gravida in fermentum et sollicitudin. Commodo ullamcorper a lacus vestibulum. In cursus turpis massa tincidunt dui ut ornare. Odio euismod lacinia at quis.Erat velit scelerisque in...</p>
                    <span><FaThumbsUp className="mr-2" /> <FaShareAlt className="mr-2" /></span>
                  </div>
                </div>

              </> : ""}

              <div className="transition-all w-auto duration-500 flex flex-col-reverse  h-[calc(100vh-80px)] overflow-y-auto no-scrollbar col-span-1" id="postsection">
                {selectedTab == socialsPageTabs.videos || selectedTab == socialsPageTabs.all ? (
                  <>
                    <div className="justify-center flex flex-col items-center gap-5 ">
                      {/* @ts-ignore */}
                      {videos?.length > 0 && videos.map((video: Video) => (
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
                    {/* {selectedTab == socialsPageTabs.posts || selectedTab == socialsPageTabs.all ? (
                      <div className="p-5">
                        {feed.map((feeds, index) => (
                          <>
                            <FeedCard feeds={feeds} key={index} />
                          </>
                        ))}
                      </div>
                    ) : (
                      <div className="">
                        {filteredPosts?.map((post, index) => (
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
                    )} */}

                    {(selectedTab == socialsPageTabs.posts || selectedTab == socialsPageTabs.all) && (
                      <PostCardDummy match={match}
                        users={users}
                        key={1}
                      />
                    )}
                  </>
                )}

              </div>
            </div>
            <div className="border-r-2 border-gray-600 mt-0 py-0 h-full"></div>
            <div className="h-[calc(100vh-80px)] w-1/4 overflow-y-auto no-scrollbar">
              <div className="md:flex flex-col m-5 p-4 pt-5">
                <div className="h-[400px] rounded-md border border-slate-500 m-5 p-5 blogweekly">Weekly Recommendation
                  <br />
                  <br />
                  <div className="scrollblog">
                    {weeklydata.map((data, index) => {
                      return (
                        <>
                          <div className="blogcard" key={index}>
                            <img src={data.image} className="img-fluid " />
                            <p><span>{data.text}</span>
                              <span>{data.created}</span>
                            </p>

                          </div>
                        </>

                      )
                    })}
                  </div>
                </div>
                <div className="h-[300px] rounded-md border border-slate-300 m-5 p-5 text-center blogweekly">Who to follow
                  <br />
                  <br />
                  <div className="scrollblog">
                    {followdata.map((data, index) => {
                      return (
                        <>
                          <div className="followcard" key={index}>
                            <img src={data.image} className="img-fluid " />
                            <p><span>{data.text}</span>
                              <span>{data.created}</span>
                            </p>

                          </div>
                        </>

                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Layout>
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
