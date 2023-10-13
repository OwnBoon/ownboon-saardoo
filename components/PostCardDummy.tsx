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
  post?: Posts;
  match?: Users[];
  users?: Users[];
}

const PostCardDummy = ({ post, match, users }: Props) => {
  // const [comments, setComments] = useState<Comment[]>([]);
  // const { isLoaded, isSignedIn, user } = useUser();
  // const refreshComments = async () => {
  //   // @ts-ignore

  //   const comments: Comment[] = await fetchComments(post._id);
  //   setComments(comments);
  // };
  // const characters =
  //   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  // function generateString(length: number) {
  //   let result = " ";
  //   const charactersLength = characters.length;
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }

  //   return result;
  // }

  // const random = generateString(8);
  // const random2 = generateString(9);

  // useEffect(() => {
  //   refreshComments();
  // }, []);

  // const like = async (id: string) => {
  //   const liked = post.liked!.map((follows) => ({
  //     _key: random2,
  //     _ref: follows._id,
  //     _type: "reference",
  //   }));
  //   const mutation = {
  //     id: id,
  //     like: post.like! + 1,
  //     liked: [
  //       // ...liked, // previously liked
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
  //   console.log(json);
  //   return json;
  // };

  // const blogauthor = users.filter((userss) => userss.email === post.email);

  // const [input, setInput] = useState("");

  // const handleSubmit = async (id: string) => {
  //   // Comment logic
  //   const comment: CommentBody = {
  //     _type: "comment",
  //     comment: input,
  //     tweetId: id,
  //     username: user?.username || "unknown user",
  //     profileImg: user?.profileImageUrl || "https://links.papareact.com/gll",
  //   };

  //   const result = await fetch(`/api/addComments`, {
  //     body: JSON.stringify(comment),
  //     method: "POST",
  //   });

  //   setInput("");
  //   refreshComments();
  // };

  // const addCategory = async () => {
  //   try {
  //     const postInfo: UserBody = {
  //       id: match[0]._id,
  //       follow: [
  //         {
  //           _key: "5t632xwqeqx",
  //           _ref: blogauthor[0]._id!,
  //           _type: "reference",
  //         },
  //       ],
  //     };
  //     const result = await fetch(`/api/addFollow`, {
  //       body: JSON.stringify(postInfo),
  //       method: "POST",
  //     });

  //     const json = await result.json();
  //     return json;
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     window.location.reload();
  //   }
  // };
  return (
    <div className="grid   bg-zinc-600 bg-opacity-10 rounded-[10px] border border-zinc-700 border-opacity-50  text-white shadow-lg h-[400px]  z-10   gap-2 p-0 lg:p-8 pb-12 mb-8 grid-cols-6">
      dummy card
    </div>
  );

};

export default PostCardDummy;
