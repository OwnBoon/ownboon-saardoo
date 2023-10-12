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
  const { isLoaded, isSignedIn, user } = useUser();
  const refreshComments = async () => {
    // @ts-ignore

    const comments: FeedComment[] = await fetchFeedComments(feeds._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const [input, setInput] = useState("");

  const handleSubmit = async (id: string) => {
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
  };
  return (
    <div className="grid bg-zinc-600 bg-opacity-10 rounded-[10px] border border-zinc-700 border-opacity-50 h-full   gap-2 p-0 lg:p-4 pb-12 mb-8 grid-cols-6">
      <div className=" col-span-4  rounded-lg ">
        <div className=" overflow-hidden  ">
          {feeds.video ? (
            <ReactPlayer height={500} controls url={feeds.video} />
          ) : (
            <>
              <img
                src={feeds.image}
                className=" h-96 w-96  object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
              />
            </>
          )}
        </div>
      </div>
      <div className="col-span-2 flex flex-col  w-full h-full   px-2 py-1 overflow-hidden">
        <div className="flex flex-col  gap-5 p-2  border-b border-white/40 py-3 ">
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

          <div className="p-2 ">
            <div className="flex gap-4">
              <h1 className="font-poppins font-[450] text-sm">
                {feeds.author}:
              </h1>
              <h2 className="font-poppins text-sm text-neutral-200">
                {feeds.title}
              </h2>
            </div>
          </div>
          <div className="space-y-4 mt-3 overflow-y-scroll h-80 scrollbar-none   shadow-lg rounded-lg p-2 mb-1 border-b-2 border-t-2 border-white/10">
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
              <div className="text-gray-500 hover:text-red-500 cursor-pointer">
                <FaInfoCircle size={22} />
              </div>
            </div>

            <div className=" flex justify-center gap-1  items-center w-full mt-0 py-3 px-0 mx-1">
              <div className="w-full flex justify-center bg-zinc-700  h-fit px-4 py-2 bg-opacity-20 rounded-[5px] border border-zinc-700 border-opacity-50 items-center">
                <input
                  placeholder="Write your comment.."
                  value={input}
                  // aria-placeholder="looks good"
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-transparent focus:outline-none px-2 focus:border-white/0 focus:ring-0 text-neutral-200 "
                />
                <div className="rotate-45 cursor-pointer text-neutral-300">
                  <SendIcon onClick={() => handleSubmit(feeds._id!)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
