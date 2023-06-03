import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Comment, CommentBody, Posts } from "../typings";
import ReactTimeago from "react-timeago";
import { fetchComments } from "../utils/fetchComments";
import { Button, Grid, Input, Text, User } from "@nextui-org/react";
import { BsSend } from "react-icons/bs";
import { useUser } from "@clerk/nextjs";

interface Props {
  post: Posts;
}

const PostCard = ({ post }: Props) => {
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
  return (
    <div className="grid bg-white shadow-lg rounded-lg gap-2 p-0 lg:p-8 pb-12 mb-8 grid-cols-6">
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
            <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
              {post.author}
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
              <ReactTimeago date={post._createdAt} />
            </span>
          </div>
        </div>
        <div className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
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
          <Button size={"xs"} bordered shadow auto>
            Follow
          </Button>
        </div>
        <div className="p-2">
          <Text h2 size={15} className="font-semibold">
            {post.author}: <Text className="font-medium">{post.title}</Text>
          </Text>
        </div>
        <div className="space-y-4 mt-5 shadow-lg rounded-lg p-2">
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
};

export default PostCard;
