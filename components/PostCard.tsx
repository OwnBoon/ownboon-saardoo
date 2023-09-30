import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Comment, CommentBody, Posts, UserBody } from "../typings";
import ReactTimeago from "react-timeago";
import { fetchComments } from "../utils/fetchComments";
import { Button, Grid, Input, Text, User } from "@nextui-org/react";
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

  useEffect(() => {
    refreshComments();
  }, []);

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
      <div className="grid bg-[#121212] text-white shadow-lg h-auto border-2 z-10 border-gray-700 rounded-lg gap-2 p-0 lg:p-8 pb-12 mb-8 grid-cols-6">
        <div className="  col-span-1 lg:col-span-4  rounded-lg ">
          <div className="relative overflow-hidden shadow-md pb-80 mb-6">
            <img
              src={post.mainImage}
              className="object-top absolute h-80 w-screen object-cover border-2  border-gray-800 shadow-lg rounded-t-lg lg:rounded-lg"
            />
          </div>

          <h1 className="transition duration-700 text-center mb-6 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </h1>
          <div className="block lg:flex text-center items-center justify-center mb-5 w-full">
            <div className="flex  justify-center mb-2 lg:mb-0 w-full lg:w-auto mr-8 items-center">
              <Link
                href={`/user/${post.author}`}
                className="inline align-middle text-white ml-2 font-medium text-lg"
              >
                {post.author}
              </Link>
            </div>
            <div className="font-medium text-gray-300">
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
                <ReactTimeago date={post._createdAt} />
              </span>
            </div>
          </div>
          <div className="text-center text-lg text-gray-400 font-normal px-4 lg:px-20 mb-5">
            <div
              className="blog"
              dangerouslySetInnerHTML={{ __html: post.body.slice(0, 120) }}
            />
          </div>
          <div className="text-center">
            <Link href={`/blogs/${post.slug!.current}`}>
              <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-700 text-base font-medium rounded-3xl text-white px-8 py-3 cursor-pointer mt-0">
                Continue Reading
              </span>
            </Link>
          </div>
        </div>
        <div className="col-span-2 border-l px-2 overflow-hidden">
          <div className="flex items-center border-b py-1 ">
            <User
              name={post.author}
              src={post.profileImage}
              bordered
              color="primary"
              pointer
              zoomed
              css={{zIndex:0}}
            />
            <Button
              onPress={() => addCategory()}
              size={"sm"}
              bordered
              shadow
              auto
              ghost
              css={{ marginLeft: "$2" ,zIndex:0}}
            >
              Follow
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-6 h-6 flex items-center justify-center cursor-pointer mx-2 ">
                  <FaEllipsisV className="text-gray-400" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent >
                <DropdownMenuItem className='flex flex-col bg-black '>
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
            <Text
              h2
              size={18}
              className="font-semibold"
              weight={"bold"}
              css={{ color: "White" }}
            >
              {post.author}:{" "}
              <Text
                size={16}
                className="font-semibold"
                css={{
                  textGradient: "45deg, $gray400 -20%, $white 80%",
            
                }}
              >
                {post.title}
              </Text>
            </Text>
          </div>
          <div className="space-y-4 mt-3 overflow-y-scroll h-80  shadow-lg rounded-lg p-2 mb-1 border-2 border-gray-800">
            {comments.map((comment) => (
              <Grid className="flex items-center ">
                <User
                  name={comment.username}
                  src={comment.profileImg}
                  size={"sm"}
                  pointer
                  zoomed
                  css={{zIndex:0}}
                />
                <Text
                  className="font-normal"
                  css={{ color: "White" }}
                  size={13}
                >
                  {comment.comment}
                </Text>
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
              <Grid>
                <Input
                  clearable
                  contentRightStyling={false}
                  placeholder="Write your comment.."
                  // aria-placeholder="looks good"
                  size="lg"
                  onChange={(e) => setInput(e.target.value)}
                  color="primary"
                  bordered
                  borderWeight='bold'
                  css={{ background: "$gray50" ,color:'$gray50'}}
                  contentRight={
                    <SendButton  >
                      <SendIcon  onClick={() => handleSubmit(post._id)}/>
                    </SendButton>
                  }
                />
              </Grid>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (match[0].follow?.length! > 0) {
    const follows = match[0].follow!.map((follows) => ({
      _key: "56247242we",
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
              _key: "rahshasabbsaz",
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
      <div className="grid bg-white shadow-lg h-full  rounded-lg gap-2 p-0 lg:p-8 pb-12 mb-8 grid-cols-6">
        <div className=" col-span-4  rounded-lg ">
          <div className="relative overflow-hidden shadow-md pb-80 mb-6">
            <img
              src={post.mainImage}
              className="object-top absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
            />
          </div>

          <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </h1>
          <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
            <div className="flex  justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
              <Link
                href={`/user/${post.author}`}
                className="inline align-middle text-gray-700 ml-2 font-medium text-lg"
              >
                {post.author}
              </Link>
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
                <ReactTimeago date={post._createdAt} />
              </span>
            </div>
          </div>
          <div className="text-center text-lg text-sky-400 font-normal px-4 lg:px-20 mb-8">
            <div
              className="blog"
              dangerouslySetInnerHTML={{ __html: post.body.slice(0, 120) }}
            />
          </div>
          <div className="text-center">
            <Link href={`/blogs/${post.slug!.current}`}>
              <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
                Continue Reading
              </span>
            </Link>
          </div>
        </div>
        <div className="col-span-2 border-l px-2">
          <div className="flex items-center border-b py-1">
            <User name={post.author} src={post.profileImage} />
            <Button
              onPress={() => addCategory()}
              size={"xs"}
              bordered
              shadow
              auto
            >
              Follow
            </Button>
          </div>
          <div className="p-2">
            <Text h2 size={15} className="font-semibold">
              {post.author}: <Text className="font-medium">{post.title}</Text>
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
                aria-placeholder="Looks good"
                // @ts-ignore
                width={900}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write your comment"
              />
              <div
                // @ts-ignore
                onClick={() => handleSubmit(post._id)}
                className="border rounded-full p-2 mt-5 cursor-pointer flex justify-center items-center"
              >
                <BsSend className=" w-4 h-4 " />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PostCard;
