import Link from "next/link";
import groq from "groq";
import { sanityClient } from "../sanity";
import { Goals, Posts, User } from "../typings";
import PostCard from "../components/PostCard";
import Sidebar from "../components/dashboard/Sidebar";
import Progress from "../components/dashboard/Progress";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import { fetchUsers } from "../utils/fetchUsers";
import createSlug from "@sindresorhus/slugify";
import dynamic from "next/dynamic";
import { UserButton, auth, useUser } from "@clerk/nextjs";
import { Editor } from "@tinymce/tinymce-react";
import { FaSearchengin } from "react-icons/fa";
import { set } from "lodash";
import { BsImage } from "react-icons/bs";
import Head from "next/head";
import { categories } from "../utils/constants";
import Layout from "../components/Layout/Layout";
import { fetchGoals } from "../utils/fetchGoals";
import { useRouter } from "next/router";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
interface Props {
  users: User[];
  goals: Goals[];
}

function BlogPost({ users, goals }: Props) {
  const { isLoaded, isSignedIn, user } = useUser();
  const today = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
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

  // @ts-ignore
  const formattedDate = today.toLocaleDateString("en-US", options);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState("");
  const [uploadData, setUploadData] = useState();

  const seoslug = title.toLocaleLowerCase() + random.toString();
  function handleOnChange(changeEvent: any) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      // @ts-ignore
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event: any) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }: any) => name === "file"
    );

    const formData = new FormData();
    // @ts-ignore
    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "ownboon-uploads");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dwminkjmp/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const slugtype = {
    type: "slug",
    current: `${seoslug.replace(/\s+/g, "-")}`,
  };
  console.log(slugtype.current);
  const editorRef = useRef(null);

  // @ts-ignore
  // const text = editorRef.current.getContent() || "null";
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const mutations = {
      _type: "post",
      title: title,
      author: user?.username,
      profileImage: user?.profileImageUrl,
      mainImage: imageSrc,
      like: 0,
      categories: category,
      // @ts-ignore
      body: editorRef.current.getContent() || "null",
      slug: slugtype,
      email: user?.emailAddresses[0].emailAddress,
    };

    const result = await fetch(`/api/addBlog`, {
      body: JSON.stringify(mutations),
      method: "POST",
    });

    const json = await result.json();
    setTitle("");
    setImage("");
    setBody("");
    setCategory("");
    router.replace(router.pathname);
    return json;
  };
  const [filteredCategories, setFilteredCategories] = useState<
    { name: string; value?: string }[]
  >([]);

  const handleInputChange = (input: any) => {
    const userInput = input;
    setCategory(userInput);

    // Filter the categories based on the user input
    const words = userInput.split(" ");
    const filtered = [];

    // Filter the categories for each word and concatenate with commas
    for (let word of words) {
      const filteredForWord = categories
        .filter(
          (category) =>
            category.name.toLowerCase().indexOf(word.toLowerCase()) !== -1
        )
        .slice(0, 5);
      filtered.push(...filteredForWord);
    }

    // Set the filtered categories to be displayed in autocomplete suggestions
    setFilteredCategories(filtered);
  };

  const handleSuggestionClick = (suggestion: any) => {
    // Set the clicked suggestion as the value of the input field
    setCategory((prevCategory) =>
      prevCategory ? prevCategory + ", " + suggestion.name : suggestion.name
    );
    // Clear the suggestions list after selecting a suggestion
    setFilteredCategories([]);
  };

  return (
    <Layout
      hasBg={false}
      bgColor={"#121212"}
      icon="socials.svg"
      text="Socials"
      border="gray-500"
      goals={goals}
      children={
        <div className=" ">
          <div className="container mx-auto col-span-9  py-8 mt ">
            {/* <Header /> */}
            <div className="flex px-5  justify-between items-center">
              {/* <div className="flex gap-4 font-bold text-lg">
            <UserButton />
            <p>Hi {user?.firstName || user?.username}, welcome Back!</p>
          </div> */}
              <div className="font-semibold text-xl">Publish your Blog</div>
              <div className="items-center flex gap-5">
                {/* <p className="text-sm font-semibold text-black/50">
              {formattedDate}
            </p>
            <div className="bg-black/5 p-2 text-black/80 cursor-pointer hover:text-black hover:bg-black/30 transition-all duration-150  rounded-lg">
              <p>Add New Goal</p>
            </div> */}
                <div className="flex gap-5 items-center ">
                  <button
                    disabled={title ? false : true}
                    onClick={handleSubmit}
                    className="bg-[#494949]/40 active:scale-105 transition-all duration-100  px-4 py-2  rounded-md text-white text-sm
               cursor-pointer"
                  >
                    <p>Publish</p>
                  </button>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col bg-[#212121] h-screen overflow-y-scroll  mt-5 p-10
          "
              // onSubmit={handleSubmit}
            >
              <div className="flex flex-col   mx-auto items-center w-full justify-center">
                <div className="flex flex-col items-start  space-y-12 justify-center">
                   <div className="mt-5 flex flex-row ">
                  <img
                    className={imageSrc ? "inline rounded-lg w-40 h-40" : "hidden"}
                    src={imageSrc}
                  />
                </div>

                <div className="py-3 w-full border-b-2 border-gray-400 ">
                  <input
                    className=" text-4xl w-full  font-light bg-[#212121]  placeholder:text-gray-400 outline-none  h-full"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="py-3 w-full border-b-2 border-gray-400">
                  <input
                    className="  text-xl font-sans font-light bg-[#212121] w-[350px]  placeholder:text-gray-400 outline-none"
                    placeholder="Add Hashtags"
                    value={category}
                    onChange={(e) => handleInputChange(e.target.value)}
                  />
                  <div className="space-y-3 text-xl  mt-2 p-2">
                    {filteredCategories.map((item) => (
                      <h1
                        key={item.name}
                        className="cursor-pointer"
                        onClick={() => handleSuggestionClick(item)}
                      >
                        {item.name}
                      </h1>
                    ))}
                  </div>
                </div>
               
                {category.length > 12 && (
                  <div className="flex items-center p-3 mr-9 w-full border-l-2 mt-5">
                    <input
                      className=" cursor-pointer  text font-extralight font-sans select-none w-full bg-transparent  placeholder:text-gray-400 outline-none"
                      placeholder="Upload Images"
                      disabled={true}
                    />
                    <form
                      method="post"
                      onChange={handleOnChange}
                      onSubmit={handleOnSubmit}
                    >
                      <label htmlFor="file-input">
                        <BsImage className="text-gray-400 hover:text-gray-100 transition-all duration-150 cursor-pointer" />
                      </label>
                      <div className="flex items-center justify-center">
                        <input
                          id="file-input"
                          type="file"
                          accept="image/"
                          className="hidden"
                          name="file"
                        />
                        <div>
                         
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                <div
                  className={
                    imageSrc
                      ? "inline transition-all duration-200 mt-5"
                      : "hidden transition-all duration-200"
                  }
                >
                 <Editor
  id="Editor"
  apiKey={process.env.NEXT_PUBLIC_TINY}
  // @ts-ignore
  onInit={(evt, editor) => (editorRef.current = editor)}
  init={{
    height: 500,
    menubar: false,
    plugins:
      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
    toolbar:
      "undo redo | blocks  | bold italic underline codesample | link image media  | align  | numlist bullist  |",
    content_style:
      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
    setup: function (editor) {
      editor.on("init", function () {
        var doc = editor.getDoc();
        var head = doc.head;
        var style = doc.createElement("style");
        style.innerHTML = `
          .tox-toolbar {
            background-color: transparent !important;
          }
          body {
            background-color: transparent !important;
            color: white !important;
          }
        `;
        head.appendChild(style);
      });
    },
  }}
/>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const users = await fetchUsers();
  const goals = await fetchGoals();

  return {
    props: {
      users,
      goals,
    },
  };
};
export default BlogPost;
