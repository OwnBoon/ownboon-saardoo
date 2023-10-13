import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Comment, CommentBody, Posts, UserBody } from "../typings";
import ReactTimeago from "react-timeago";
import { fetchComments } from "../utils/fetchComments";
import { Avatar, Button, Grid, Input, Text, User } from "@nextui-org/react";
import { BsSend } from "react-icons/bs";
import { useUser } from "@clerk/nextjs";
import { User as Users } from "../typings";
import { FaPaperPlane } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "./dropdown/Dropdown";
import {
  FaThumbsUp,
  FaComments,
  FaShareAlt,
  FaInfoCircle,
  FaEllipsisV,
} from "react-icons/fa";
import { SendButton } from "./Postcard/SendButton";
import { SendIcon } from "./Postcard/SendIcon";

import css from "styled-jsx/css";

interface Props {
  post: Posts;
  match: Users[];
  users: Users[];
}

const PostCard = ({ post, match, users }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { isLoaded, isSignedIn, user } = useUser();
  const refreshComments = async () => {
    // @ts-ignore

    const comments: Comment[] = await fetchComments(post._id);
    setComments(comments);
  };
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  function generateString(length: number) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const random = generateString(8);
  const random2 = generateString(9);

  useEffect(() => {
    refreshComments();
  }, []);

  const like = async (id: string) => {
    const liked = post.liked!.map((follows) => ({
      _key: random2,
      _ref: follows._id,
      _type: "reference",
    }));
    const mutation = {
      id: id,
      like: post.like! + 1,
      liked: [
        // ...liked, // previously liked
        {
          _key: random,
          _ref: match[0]._id,
          _type: "reference",
        },
      ],
    };
    const result = await fetch(`/api/setBlog`, {
      body: JSON.stringify(mutation),
      method: "POST",
    });

    const json = result.json();
    console.log(json);
    return json;
  };

  const blogauthor = users.filter((userss) => userss.email === post.email);

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
  if (match[0].follow == null) {
    const addCategory = async () => {
      try {
        const postInfo: UserBody = {
          id: match[0]._id,
          follow: [
            {
              _key: "5t632xwqeqx",
              _ref: blogauthor[0]._id!,
              _type: "reference",
            },
          ],
        };
        const result = await fetch(`/api/addFollow`, {
          body: JSON.stringify(postInfo),
          method: "POST",
        });

        const json = await result.json();
        return json;
      } catch (err) {
        console.error(err);
      } finally {
        window.location.reload();
      }
    };
    return (
      <div className="grid   bg-zinc-600 bg-opacity-10 rounded-[10px] border border-zinc-700 border-opacity-50  text-white shadow-lg h-[400px]  z-10   gap-2 p-0 lg:p-8 pb-12 mb-8 grid-cols-6">
        <div className="  col-span-1 lg:col-span-4  rounded-lg ">
          <div>
            <div className="flex gap-6 ">
              <img
                className="h-56 object-cover w-56 rounded-md"
                src={post.mainImage}
              />
              <div className="space-y-5">
                <h1 className="text-neutral-200 text-base font-semibold">
                  {post.title}
                </h1>
                <p>
                  <div
                    className="!bg-transparent  text-neutral-300 font-sans  font-normal"
                    dangerouslySetInnerHTML={{
                      __html: post.body.replace(/<[^>]+>/g, "").slice(0, 280),
                    }}
                  />
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div
                className="!bg-transparent  text-neutral-300 font-sans  font-normal"
                dangerouslySetInnerHTML={{
                  __html: post.body.replace(/<[^>]+>/g, "").slice(280, 2000),
                }}
              />
            </div>
          </div>
          <div className="flex items-bottom h-full">
            <Link
              href={`/blogs/${post.slug}`}
              className="flex h-fit w-full  cursor-pointer hover:backdrop-blur-md mt-4 px-4 py-3 justify-center items-center bg-zinc-700 bg-opacity-50 rounded-[5px] border border-zinc-700"
            >
              <h1>Read Article</h1>
            </Link>
          </div>
        </div>
        <div className="col-span-2  px-2 py-1 overflow-hidden">
          <div className="flex items-center gap-5 p-2  border-b border-white/40 py-3 ">
            <Link
              href={`/user/${post.author}`}
              className="flex gap-2 font-sans items-center"
            >
              <img
                className="w-[33px] h-[33px] rounded-full object-contain hover:cursor-pointer hover:border-2 hover:border-white/50 transition-all duration-100 border-white/30 hover:scale-110"
                src={post.profileImage}
              />
              <p className="text-neutral-200 text-base font-normal">
                {post.author}
              </p>
            </Link>
            <div
              onClick={() => addCategory()}
              className=" border border-white/60 border-opacity-75 text-sm  px-2 py-0.5 bg-white bg-opacity-20 cursor-pointer rounded-[3px]"
            >
              Follow
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-6 h-6 flex items-center justify-center cursor-pointer mx-2 ">
                  <FaEllipsisV className="text-gray-400" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex flex-col bg-black ">
                  <div className="py-2">
                    <button className="text-gray-500 hover:text-gray-200 px-4 py-2 w-full text-left">
                      About
                    </button>
                  </div>
                  <div className="py-2">
                    <button className="text-gray-500 hover:text-gray-200 px-4 py-2 w-full text-left">
                      Report
                    </button>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="p-2 ">
            <div className="flex gap-4">
              <h1 className="font-poppins font-[450] text-sm">
                {post.author}:
              </h1>
              <h2 className="font-poppins text-sm text-neutral-200">
                {post.title}
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
                  <SendIcon onClick={() => handleSubmit(post._id!)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (match[0].follow?.length! > 0) {
    const follows = match[0].follow!.map((follows) => ({
      _key: random2,
      _ref: follows._id,
      _type: "reference",
    }));
    const addCategory = async () => {
      try {
        const postInfo: UserBody = {
          id: match[0]._id,
          follow: [
            ...follows,
            {
              _key: random,
              _ref: blogauthor[0]._id!,
              _type: "reference",
            },
          ],
        };
        const result = await fetch(`/api/addFollow`, {
          body: JSON.stringify(postInfo),
          method: "POST",
        });

        const json = await result.json();
        return json;
      } catch (err) {
        console.error(err);
      } finally {
        window.location.reload();
      }
    };
    return (
      <div className="grid   bg-zinc-600 bg-opacity-10 rounded-[10px] border border-zinc-700 border-opacity-50  text-white shadow-lg h-auto  z-10   gap-2 p-0 lg:p-8 pb-12 mb-8 grid-cols-6">
        <div className="  col-span-1 lg:col-span-4 flex flex-col justify-end  rounded-lg ">
          <div className="h-full">
            <div className="flex gap-6 h-fit ">
              <img
                className="h-56 object-cover w-56 rounded-md"
                src={post.mainImage}
              />
              <div className="space-y-5">
                <h1 className="text-neutral-200 text-base font-semibold">
                  {post.title}
                </h1>
                <p>
                  <div
                    className="!bg-transparent  text-neutral-300 font-sans  font-normal"
                    dangerouslySetInnerHTML={{
                      __html: post.body.replace(/<[^>]+>/g, "").slice(0, 280),
                    }}
                  />
                </p>
              </div>
            </div>
            <div className="mt-4 font-poppins font-light">
              <div
                className="!bg-transparent  text-neutral-300 font-sans  font-normal"
                dangerouslySetInnerHTML={{
                  __html: post.body.replace(/<[^>]+>/g, "").slice(280, 2000),
                }}
              />
              ...
            </div>
          </div>
          <div className="flex justify-center mt-9 h-full">
            <Link
              href={`/blogs/${post.slug.current}`}
              className="flex h-fit w-full  cursor-pointer hover:backdrop-blur-md mt-4 px-4 py-3 justify-center items-center bg-zinc-700 bg-opacity-50 rounded-[5px] border border-zinc-700"
            >
              <h1>Read Article</h1>
            </Link>
          </div>
        </div>
        <div className="col-span-2  px-2 py-1 overflow-hidden">
          <div className="flex items-center gap-5 p-2  border-b border-white/20 py-3 ">
            <Link
              href={`/user/${post.author}`}
              className="flex gap-2 font-sans items-center"
            >
              <img
                className="w-[33px] h-[33px] rounded-full object-contain hover:cursor-pointer hover:border-2 hover:border-white/50 transition-all duration-100 border-white/30 hover:scale-110"
                src={post.profileImage}
              />
              <p className="text-neutral-200 text-base font-normal">
                {post.author}
              </p>
            </Link>
            {match[0].follow.map(
              (follow) => follow.name == post.author
            ) ? null : (
              <div
                onClick={() => addCategory()}
                className=" border border-white/60 border-opacity-75 text-xs font-poppins  px-2 py-0.5 bg-white bg-opacity-20 cursor-pointer rounded-[3px]"
              >
                Follow
              </div>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-6 h-6 flex items-center justify-center cursor-pointer mx-2 ">
                  <FaEllipsisV className="text-gray-400" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex flex-col bg-black ">
                  <div className="py-2">
                    <button className="text-gray-500 hover:text-gray-200 px-4 py-2 w-full text-left">
                      About
                    </button>
                  </div>
                  <div className="py-2">
                    <button className="text-gray-500 hover:text-gray-200 px-4 py-2 w-full text-left">
                      Report
                    </button>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="p-2 ">
            <div className="flex gap-4">
              <h1 className="font-poppins font-[450] text-sm">
                {post.author}:
              </h1>
              <h2 className="font-poppins text-xs font-light text-neutral-200">
                {post.title}
              </h2>
            </div>
          </div>
          <div className="space-y-4 mt-3 overflow-y-scroll h-80 scrollbar-none   shadow-lg rounded-lg p-2 mb-1 border-b-2 rounded-b-none border-white/20">
            {comments.map((comment) => (
              <Grid className="flex items-center gap-4 ">
                <div className="flex justify-center items-center gap-2">
                  <img
                    className="h-7 object-cover rounded-full w-7"
                    src={comment.profileImg}
                  />
                  <h1 className="font-poppins text-xs text-neutral-200">
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
                  <div
                    onClick={() => like(post._id!)}
                    className="text-gray-500 hover:text-pink-500 cursor-pointer"
                  >
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
                  <SendIcon onClick={() => handleSubmit(post._id!)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PostCard;
