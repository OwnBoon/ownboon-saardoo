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
import { FaThumbsUp, FaShareAlt, FaExclamationCircle, FaComment } from "react-icons/fa";

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
    <div className="grid blogweekly  rounded-lg gap-2 p-0 lg:p-8 pb-12 mb-8 grid-cols-6">
      <div className=" col-span-4  rounded-lg ">
        <div className="relative overflow-hidden shadow-md  mb-6">
          {feeds.video ? (
            <ReactPlayer height={500} controls url={feeds.video} />
          ) : (
            <>
              <img
                src={"/postimage.png"}
                className="img-fluid w-full  object-cover" style={{ height: "70vh", borderRadius: "10px" }}
              />
            </>
          )}
        </div>

        {/* <div className="block lg:flex text-center items-center justify-center mb-8 w-full"> */}
        {/* <div className="flex  justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
            <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
              {feeds.author}
            </p>
          </div> */}
        {/* <div className="font-medium text-gray-700"> */}
        {/* <svg
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
            </svg> */}
        {/* <span className="align-middle"> */}
        {/* @ts-ignore */}
        {/* <ReactTimeago date={feeds._createdAt} /> */}
        {/* </span> */}
        {/* </div> */}
        {/* </div> */}

      </div>
      <div className="col-span-2  " style={{ borderLeft: "1px solid rgba(71, 71, 71, 0.50)" }}>
        <div className="flex items-center  py-1 pb-3" style={{ borderBottom: "1px solid rgba(71, 71, 71, 0.50)" }}>
          <div className="postprofile pl-2 ">
            <img src={feeds.profileImage} className="img-fluid" />
            <span>{feeds.author}</span>

          </div>
          <Button size={"xs"} className="postfollow">
            Follow
          </Button>
        </div>
        <div className="postdescription mt-2 pl-2">
          {feeds.desc === undefined ? <><b>codehecker</b> : Lorem ipsum dolor sit amet dolo psum dolo Lorem  adipisc   ipsum dolor... more</> : feeds.desc}
        </div>
        {/* <div className="p-2 text-white">
          <Text h2 size={13} className="font-normal " style={{ color: "white" }}>
            {feeds.author}.{feeds.title}
          </Text>
        </div> */}
        <div className=" overflow-y-auto  shadow-lg rounded-lg p-2 mt-2" style={{ height: "50vh" }} >
          {comments.length > 0 ? <>{comments.map((comment) => (

            <div className="postdescriptioncomment  pl-2">
              <span className="postprofile"><img src={comment.profileImg} className="img-fluid" /></span> <span><b>{comment.username}</b> : {comment.comment}</span>
            </div>
          ))}</> : <>
            <div className="postdescriptioncomment  pl-2">
              <span className="imagespan"><img src="/commentuser.png" className="img-fluid" />&nbsp;</span> <span><b>Som.Ceo</b> : Lorem ipsum dolor sit amet, elit consectetur adipiscing elit, sed do eiusmod tempor i</span>
            </div>


          </>}
        </div>
        <div className="alignbetween pl-3 pt-4">
          <span><FaThumbsUp className="mr-3 iconsize" /> <FaComment className="mr-3 iconsize" /> <FaShareAlt className="mr-3 iconsize" /></span>
          <FaExclamationCircle className="iconsize" />
        </div>
        <div className="p-2 outline-none border-none w-full">
          <div className=" flex justify-center gap-2  items-center w-full ">
            <input

              className="commentinput"
              // @ts-ignore
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write your comment..."
            />
            <div
              // @ts-ignore
              onClick={() => handleSubmit(feeds._id)}
              className="border rounded-full p-2  cursor-pointer flex justify-center items-center"
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
