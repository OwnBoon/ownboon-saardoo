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
    <div className="grid bg-white shadow-lg h-full  rounded-lg gap-2 p-0 lg:p-8 pb-12 mb-8 grid-cols-6">
      <div className=" col-span-4  rounded-lg ">
        <div className="relative overflow-hidden shadow-md pb-80 mb-6">
          {feeds.video ? (
            <ReactPlayer height={500} controls url={feeds.video} />
          ) : (
            <>
              <img
                src={feeds.image}
                className="object-top absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
              />
            </>
          )}
        </div>

        <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
          <div className="flex  justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
            <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
              {feeds.author}
            </p>
          </div>
          <div className="font-medium text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="align-middle">
              {/* @ts-ignore */}
              <ReactTimeago date={feeds._createdAt} />
            </span>
          </div>
        </div>
        <div className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
          {feeds.desc}
        </div>
      </div>
      <div className="col-span-2 border-l px-2">
        <div className="flex items-center border-b py-1">
          <User name={feeds.author} src={feeds.profileImage} />
          <Button size={"xs"} bordered shadow auto>
            Follow
          </Button>
        </div>
        <div className="p-2">
          <Text h2 size={15} className="font-semibold">
            {feeds.author}: <Text className="font-medium">{feeds.title}</Text>
          </Text>
        </div>
        <div className="space-y-4 mt-5 overflow-y-scroll h-72  shadow-lg rounded-lg p-2">
          {comments.map((comment) => (
            <Grid className="flex items-center ">
              <User
                name={comment.username}
                src={comment.profileImg}
                size={"sm"}
              />
              <Text className="text-sm">{comment.comment}</Text>
            </Grid>
          ))}
        </div>
        <div className="p-2 outline-none border-none w-full">
          <div className=" flex justify-center gap-2  items-center w-full ">
            <Input
              clearable
              label="Comment"
              // @ts-ignore
              width={900}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write your comment"
            />
            <div
              // @ts-ignore
              onClick={() => handleSubmit(feeds._id)}
              className="border rounded-full p-2 mt-5 cursor-pointer flex justify-center items-center"
            >
              <BsSend className=" w-4 h-4 " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
