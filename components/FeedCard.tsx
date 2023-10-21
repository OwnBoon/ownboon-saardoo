import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Comment,
  CommentBody,
  FeedComment,
  FeedCommentBody,
  Posts,
  Videos,
} from "../typings";
import ReactTimeago from "react-timeago";
import { fetchComments } from "../utils/fetchComments";
import { Button, Grid, Input, Text, User } from "@nextui-org/react";
import { BsSend } from "react-icons/bs";
import { useUser } from "@clerk/nextjs";
import ReactPlayer from "react-player";
import { fetchFeedComments } from "../utils/fetchFeedComments";
import { SendIcon } from "./Postcard/SendIcon";
import {
  FaComments,
  FaInfoCircle,
  FaShareAlt,
  FaThumbsUp,
} from "react-icons/fa";

interface Props {
  feeds: Videos;
}

const FeedCard = ({ feeds }: Props) => {
  const [comments, setComments] = useState<FeedComment[]>([]);
  const [loading, setLoading] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();
  const refreshComments = async () => {
    // @ts-ignore

    const comments: FeedComment[] = await fetchFeedComments(feeds._id);
    setComments(comments);
  };

  useEffect(() => {
    console.log(feeds)
    refreshComments();
  }, []);

  const [input, setInput] = useState("");

  const handleSubmit = async (id: string) => {
    setLoading(true);
    // Comment logic
    const comment: FeedCommentBody = {
      _type: "feedcomment",
      comment: input,
      tweetId: id,
      username: user?.username || "unknown user",
      profileImg: user?.profileImageUrl || "https://links.papareact.com/gll",
    };

    const result = await fetch(`/api/addFeedComments`, {
      body: JSON.stringify(comment),
      method: "POST",
    });

    setInput("");
    refreshComments();
    setLoading(false);
  };
  // const like = async (id: string) => {
  //   const liked = post.liked!.map((follows) => ({
  //     _key: random2,
  //     _ref: follows._id,
  //     _type: "reference",
  //   }));
  //   const mutation = {
  //     _id: id,
  //     like: post.like! + 1,
  //     liked: [
  //       ...liked, // previously liked
  //       {
  //         _key: random,
  //         _ref: match[0]._id,
  //         _type: "reference",
  //       },
  //     ],
  //   };
  //   const result = await fetch(`/api/setBlog`, {
  //     body: JSON.stringify(mutation),
  //     method: "POST",
  //   });

  //   const json = result.json();
  //   // console.log(json);
  //   router.replace(router.pathname);
  //   return json;
  // };
  return (
    <div className=" hidden lg:inline-grid   bg-zinc-600 bg-opacity-10 rounded-[10px] border border-zinc-700 border-opacity-50  text-white shadow-lg h-auto  z-10   gap-2 p-0 lg:p-8 pb-12 mb-8 grid-cols-6">
      <div className="  col-span-1 lg:col-span-4 flex flex-col justify-end  rounded-lg ">
        <div className="h-full">
          <div className=" h-fit ">

            {feeds.video ? (
              <img
                src={feeds.image}
                className="h-96 object-cover w-56 rounded-md" style={{ width: "100%" }}
              />
            ) : (
              <>
                <ReactPlayer height={500} controls url={feeds.video} />
              </>
            )}
            <div className="space-y-5 pl-2 pt-4">
              <h1 className="text-neutral-200 text-base font-semibold">
                {feeds.title}
              </h1>

            </div>
          </div>

        </div>
        <div className="flex justify-center mt-2 h-full">
          <Link
            href={`javascript:void(0)`}
            className="flex h-fit w-full  cursor-pointer hover:backdrop-blur-md mt-4 px-4 py-3 justify-center items-center bg-zinc-700 bg-opacity-50 rounded-[5px] border border-zinc-700"
          >
            <h1>Read Article</h1>
          </Link>
        </div>
      </div>
      <div className="col-span-2  px-2 py-1 overflow-hidden">
        <div className="flex items-center gap-5 p-2  border-b border-white/20 py-3 ">
          <Link
            href={`/user/${feeds.author}`}
            className="flex gap-2 font-sans items-center"
          >
            <img
              className="w-[33px] h-[33px] rounded-full object-contain hover:cursor-pointer hover:border-2 hover:border-white/50 transition-all duration-100 border-white/30 hover:scale-110"
              src={feeds.profileImage}
            />
            <p className="text-neutral-200 text-base font-normal">
              {feeds.author}
            </p>
          </Link>




        </div>
        <div className="p-2 ">
          <div className="flex gap-4">
            <h1 className="font-poppins font-[450] text-sm">
              {feeds.author}:
            </h1>
            <h2 className="font-poppins text-xs font-light text-neutral-200">
              {feeds.title}
            </h2>
          </div>
        </div>
        <div className="space-y-4 mt-3 overflow-y-scroll h-80 scrollbar-none   shadow-lg rounded-lg p-2 mb-1 border-b-2 rounded-b-none border-white/20">
          {loading && <div aria-label="Loading..." role="status" className="ml-[6vw] md:ml-[8vw] lg:ml-[6vw]">
            <svg
              className="animate-spin w-6 h-6 fill-blue-500"
              viewBox="3 3 18 18"
            >
              <path
                className="opacity-20"
                d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
              ></path>
              <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
            </svg>
          </div>}

          {comments.map((comment) => (
            <Grid className="flex items-center gap-4 ">
              <div className="flex justify-center items-center gap-2">
                <img
                  className="h-8 object-cover rounded-full w-8"
                  src={comment.profileImg}
                />
                <h1 className="font-poppins text-sm text-neutral-200">
                  {comment.username}
                </h1>
              </div>
              <h1 className="!font-extralight font-poppins text-xs">
                {comment.comment}
              </h1>
            </Grid>
          ))}
        </div>
        <div className="p-2 outline-none border-none w-full">
          <div className="flex justify-between items-center p-2 pb-0 mt-1">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="text-gray-500 hover:text-pink-500 cursor-pointer">
                  <FaThumbsUp size={22} />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-gray-500 hover:text-gray-100 cursor-pointer">
                  <FaComments size={22} />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-gray-500 hover:text-blue-500 cursor-pointer">
                  <FaShareAlt size={22} />
                </div>
              </div>
            </div>
            <div className="text-gray-500 hover:text-red-500 cursor-pointer lg:ml-4">
              <FaInfoCircle size={22} />
            </div>
          </div>

          <div className=" flex justify-center gap-1 items-center w-full mt-0 py-3 px-0 mx-1">
            <div className="w-full md:w-[50vw] lg:w-[60vw] flex justify-center bg-zinc-700  h-fit py-2 bg-opacity-20 rounded-[5px] border border-zinc-700 border-opacity-50 items-center">
              <input
                placeholder="Write your comment.."
                value={input}
                // aria-placeholder="looks good"
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent focus:outline-none ml-2 md:ml-6 lg:px-0 px-2 focus:border-white/0 focus:ring-0 text-neutral-200 "
              />
              <div className="rotate-45 cursor-pointer text-neutral-300 md:mr-10">
                <SendIcon onClick={() => handleSubmit(feeds._id!)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="lg:w-[60vw] grid bg-zinc-600 bg-opacity-10 rounded-[10px] border border-zinc-700 border-opacity-50 h-full   gap-2 p-0 lg:p-4 pb-12 mb-8 grid-cols-1 md:grid-cols-6">
    //   <div className=" col-span-4  rounded-lg ">
    //     <div className=" overflow-hidden  ">
    //       {feeds.video ? (
    //         <img
    //           src={feeds.image}
    //           className=" h-96 w-96  object-cover  shadow-lg rounded-t-lg lg:rounded-lg" style={{ width: "100%" }}
    //         />
    //       ) : (
    //         <>
    //           <ReactPlayer height={500} controls url={feeds.video} />
    //         </>
    //       )}
    //     </div>
    //     <div className="space-y-2 flex flex-col items-start pt-4 ">
    //       <div className="pl-3">
    //         <h1 className="font-semibold">
    //           {feeds.title}
    //         </h1>
    //       </div>

    //     </div>

    //     <div className="flex justify-center mt-10 h-full">
    //       <Link
    //         href={`javascript:void(0)`}
    //         className="flex h-fit w-full  cursor-pointer hover:backdrop-blur-md mt-4 px-4 py-3 justify-center items-center bg-zinc-700 bg-opacity-50 rounded-[5px] border border-zinc-700"
    //       >
    //         <h1>Read Article</h1>
    //       </Link>
    //     </div>
    //   </div>
    //   <div className="col-span-2 flex flex-col  w-full h-full   px-2 py-1 overflow-hidden">
    //     <div className="flex flex-col  gap-5 p-2  border-b border-white/40 py-3 ">
    //       <Link
    //         href={`/user/${feeds.author}`}
    //         className="flex gap-2 font-sans items-center"
    //       >
    //         <img
    //           className="w-[33px] h-[33px] rounded-full object-contain hover:cursor-pointer hover:border-2 hover:border-white/50 transition-all duration-100 border-white/30 hover:scale-110"
    //           src={feeds.profileImage}
    //         />
    //         <p className="text-neutral-200 text-base font-normal">
    //           {feeds.author}
    //         </p>
    //       </Link>

    //       <div className="p-2 ">
    //         <div className="flex gap-4">
    //           <h1 className="font-poppins font-[450] text-sm">
    //             {feeds.author}:
    //           </h1>
    //           <h2 className="font-poppins text-sm text-neutral-200">
    //             {feeds.title}
    //           </h2>
    //         </div>
    //       </div>


    //       <div className="space-y-4 mt-3 overflow-y-scroll h-80 scrollbar-none  shadow-lg rounded-lg p-2 border-b-2 border-t-2 border-white/10">

    //         {loading && <div aria-label="Loading..." role="status" className="ml-[6vw] md:ml-[8vw] lg:ml-[6vw]">
    //           <svg
    //             className="animate-spin w-6 h-6 fill-blue-500"
    //             viewBox="3 3 18 18"
    //           >
    //             <path
    //               className="opacity-20"
    //               d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
    //             ></path>
    //             <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
    //           </svg>
    //         </div>}

    //         {comments.map((comment) => (
    //           <Grid className="flex items-center gap-4 ">
    //             <div className="flex justify-center items-center gap-2">
    //               <img
    //                 className="h-8 object-cover rounded-full w-8"
    //                 src={comment.profileImg}
    //               />
    //               <h1 className="font-poppins text-sm text-neutral-200">
    //                 {comment.username}
    //               </h1>
    //             </div>
    //             <h1 className="!font-extralight font-poppins text-xs">
    //               {comment.comment}
    //             </h1>
    //           </Grid>
    //         ))}
    //       </div>
    //       <div className="p-1 outline-none border-none w-full">
    //         <div className="flex justify-between items-center p-2 pb-0 mt-1">
    //           <div className="flex items-center space-x-4">
    //             <div className="flex items-center space-x-2">
    //               <div className="text-gray-500 hover:text-pink-500 cursor-pointer">
    //                 <FaThumbsUp size={22} />
    //               </div>
    //             </div>
    //             <div className="flex items-center space-x-2">
    //               <div className="text-gray-500 hover:text-gray-100 cursor-pointer">
    //                 <FaComments size={22} />
    //               </div>
    //             </div>
    //             <div className="flex items-center space-x-2">
    //               <div className="text-gray-500 hover:text-blue-500 cursor-pointer">
    //                 <FaShareAlt size={22} />
    //               </div>
    //             </div>
    //           </div>
    //           <div className="text-gray-500 hover:text-red-500 cursor-pointer lg:ml-4">
    //             <FaInfoCircle size={22} />
    //           </div>
    //         </div>

    //         <div className=" flex justify-center gap-1 items-center w-full mt-0 py-3 px-0 mx-1">
    //           <div className="w-full md:w-[50vw] lg:w-[60vw] flex justify-center bg-zinc-700  h-fit py-2 bg-opacity-20 rounded-[5px] border border-zinc-700 border-opacity-50 items-center">
    //             <input
    //               placeholder="Write your comment.."
    //               value={input}
    //               // aria-placeholder="looks good"
    //               onChange={(e) => setInput(e.target.value)}
    //               className="bg-transparent focus:outline-none ml-2 md:ml-6 lg:px-0 px-2 focus:border-white/0 focus:ring-0 text-neutral-200 "
    //             />
    //             <div className="rotate-45 cursor-pointer text-neutral-300 md:mr-10">
    //               <SendIcon onClick={() => handleSubmit(feeds._id!)} />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default FeedCard;
