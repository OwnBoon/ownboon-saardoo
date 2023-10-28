import Link from "next/link";
import groq from "groq";
import { sanityClient } from "../sanity";
import { Goals, Posts, User, Videos } from "../typings";
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
import { Button } from "@nextui-org/react";
import { fetchGoals } from "../utils/fetchGoals";
import { categories } from "../utils/constants";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
import { PlusIcon } from "@heroicons/react/24/outline";
// import { Layout } from "lucide-react";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
interface Props {
  users: User[];
  goals: Goals[];
}

function Home({ users, goals }: Props) {
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
  const [filteredCategories, setFilteredCategories] = useState<
    { name: string; value?: string }[]
  >([]);

  const [showTag, setShowTag] = useState(false);

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
      "https://api.cloudinary.com/v1_1/dwminkjmp/video/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
    handleSubmit(event);
    router.replace(router.pathname);
  }
  async function handleOnSubmitVideo(event: any) {
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
    handleSubmit(event);
    router.replace(router.pathname);
  }

  const [body, setBody] = useState("");
  const [videos, setVideos] = useState(false);
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
      image: imageSrc,
      categories: category,
      liked: null,
      video: imageSrc,
    };

    const result = await fetch(`/api/addFeed`, {
      body: JSON.stringify(mutations),
      method: "POST",
    });

    const json = await result.json();
    setTitle("");
    setImage("");
    setBody("");
    setCategory("");
    return json;
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
          <div className="   ">
            {/* <Header /> */}
            <div className="flex px-5  justify-between items-center">
              {/* <div className="flex gap-4 font-bold text-lg">
          <UserButton />
          <p>Hi {user?.firstName || user?.username}, welcome Back!</p>
        </div> */}
              <div className="font-semibold text-xl">Publish your Post</div>
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
            <div className="flex flex-col    items-center w-full justify-center">
              <div className="flex flex-col items-start  space-y-2 justify-center">
                <div className="mt-5 flex flex-row ">
                  {/* <video
                    className={imageSrc ? "inline rounded-lg" : "hidden"}
                    src={imageSrc}
                  /> */}
                  <img
                    className={
                      imageSrc ? "inline h-40 w-40 rounded-lg" : "hidden"
                    }
                    src={imageSrc}
                  />
                </div>

                <div className="py-3 w-full  ">
                  <input
                    className=" text-4xl w-full font-sans bg-transparent font-bold bg-[#212121]  placeholder:text-gray-400 outline-none  h-full"
                    placeholder="New Post Title Here..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="py-3 w-full">
                  <input
                    className="  text-xl font-sans bg-transparent font-light bg-[#212121] w-[350px]  placeholder:text-gray-400 outline-none"
                    placeholder="Add upto 4 tags"
                    value={category}
                    onChange={(e) => {
                      handleInputChange(e.target.value);
                      setShowTag(true);
                    }}
                  />
                  {showTag && (
                    <div
                      onMouseLeave={() => setShowTag(false)}
                      className=" top-[9.5rem] z-50 mt-2 w-full flex flex-col items-start gap-4 px-5 py-2 rounded-md shadow-lg bg-[#303030]/10 backdrop-blur-lg text-white ring-1 ring-black ring-opacity-5 "
                    >
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
                  )}
                </div>

                <div className="flex items-center justify-center mr-9 px-3 w-full  mt-10">
                  <input
                    className=" hidden text font-extralight cursor-text bg-transparent  w-full  placeholder:text-gray-400 outline-none"
                    disabled={true}
                  />

                  <form
                    method="post"
                    className="border border-white/20 bg-white/5 rounded-lg w-full flex flex-col justify-center items-center py-2"
                    onChange={handleOnChange}
                    onSubmit={videos ? handleOnSubmit : handleOnSubmitVideo}
                  >
                    <label htmlFor="file-input">
                      <div className="p-2 mt-10 bg-white/10 w-fit rounded-full">
                        <PlusIcon className="text-gray-400 hover:text-gray-200  w-10 h-10 transition-all duration-150 cursor-pointer" />
                      </div>
                    </label>
                    <p className=" text-white/30 mt-3">add images or videos</p>
                    <div className="flex items-center justify-center">
                      <input
                        id="file-input"
                        type="file"
                        accept="image/"
                        className="hidden"
                        name="file"
                      />
                      <div className="mt-5">
                        {imageSrc && !uploadData && (
                          <p>
                            <div className="flex gap-5">
                              <div
                                onClick={() => setVideos(true)}
                                className="bg-zinc-600 bg-opacity-10 flex px-14 active:scale-105 transition-all duration-150 py-1 justify-center w-full items-center flex-col rounded-md border-[0.75px] border-solid border-zinc-700 border-opacity-50"
                              >
                                Videos
                              </div>
                              <div
                                onClick={() => setVideos(false)}
                                className="bg-zinc-600 bg-opacity-10 flex   px-16 active:scale-105 transition-all duration-150 py-1 justify-center w-full items-center flex-col rounded-md border-[0.75px] border-solid border-zinc-700 border-opacity-50"
                              >
                                Image
                              </div>
                            </div>

                            <button className="bg-white bg-opacity-30 mt-5 py-2 flex items-start gap-1 px-10 rounded-md border-[0.75px] border-solid border-white border-opacity-50">
                              <h1 className="text-white text-sm font-medium self-center my-auto">
                                Upload
                              </h1>
                            </button>
                          </p>
                        )}
                      </div>
                    </div>
                  </form>
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
export default Home;
