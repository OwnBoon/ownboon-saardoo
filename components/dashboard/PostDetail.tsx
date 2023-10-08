import { PortableText } from "@portabletext/react";
import React from "react";
import { Posts } from "../../typings";
import Script from "next/script";
import { Editor } from "@tinymce/tinymce-react";
import Link from "next/link";
import TimeAgo from "react-timeago";
interface Props {
  post: Posts;
}

const PostDetail = ({ post }: Props) => {
  console.log(post.mainImage);
  return (
    <div className="bg-[#101010] shadow-lg rounded-lg  h-screen  overflow-y-scroll lg:p-8 pb-12 mb-8">
      <div className="flex overflow-hidden justify-center items-center   mb-6">
        <img
          src={
            post.mainImage ||
            "https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw4NjU4Mzk3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
          className="object-top w-1/4 h-1/4 object-contain  shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <Link
            href={`/user/${post.author}`}
            className="hidden md:flex justify-center lg:mb-0 lg:w-auto mr-8 items-center"
          >
            {/* <img
                height="30px"
                width="30px"
                className="align-middle rounded-full"
                src={post.author.map((author) => author.name) || ""}
              /> */}
            <p className=" align-middle flex items-center gap-5 text-gray-700 ml-2 font-medium text-lg">
              <img
                className="h-10 w-10 object-cover rounded-full"
                src={post.profileImage}
              />
            </p>
            <span className="ml-2">{post.author}</span>{" "}
          </Link>
          <div className="font-medium text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-cyan-400"
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
            <TimeAgo date={post._createdAt!} />
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        <div>
          {/* <div
            className="blog"
            dangerouslySetInnerHTML={{ __html: post.body }}
          /> */}
          <Editor
            id="Editor"
            disabled
            init={{
              height: 500,
              menubar: false,
              toolbar: false,
              statusbar: false,
              skin: "oxide-dark",
              content_css: "dark",
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
              setup: function (editor) {
                editor.on("init", function () {
                  var doc = editor.getDoc();
                  var head = doc.head;
                  var style = doc.createElement("style");
                  style.innerHTML = `
                      body {
                        background-color: #191919 !important;
                        color: white !important;
                      }
                    `;
                  head.appendChild(style);
                });
              },
            }}
            apiKey={process.env.NEXT_PUBLIC_TINY}
            value={post.body}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
