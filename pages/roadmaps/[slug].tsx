// [slug].tsx

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "../../sanity";
import { Category, Goals, Posts, Roadmaps } from "../../typings";
import Sidebar from "../../components/dashboard/Sidebar";
import Progress from "../../components/dashboard/Progress";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Layout from "../../components/Layout/Layout";
import { Card, Dropdown, Loading, Text, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { Menu } from "../../components/Roadmap/more";
import { fetchGoals } from "../../utils/fetchGoals";
import { ArrowBigRightDash } from "lucide-react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
interface Props {
  roadmap: Roadmaps;
  goals: Goals[];
}

// const ptComponents = {
//   types: {
//     image: ({ value }) => {
//       if (!value?.asset?._ref) {
//         return null;
//       }
//       return (
//         <img
//           alt={value.alt || " "}
//           loading="lazy"
//           src={urlFor(value).width(320).height(240).fit("max").auto("format")}
//         />
//       );
//     },
//   },
// };

const Post = ({ roadmap, goals }: Props) => {
  // in the following code when you will click the div, a api req will be sent to openai and the info will come abt the information of roadmap stage.

  const PostDetail = dynamic(
    () => import("../../components/dashboard/PostDetail"),
    {
      ssr: false,
    }
  );
  // @ts-ignore
  console.log(roadmap.content.replace("@finish", ""));
  const deafult = roadmap._id;
  // @ts-ignore
  const normal = roadmap.content.replace("@finish", "");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState(true);
  const [blockSelected, setBlockSelected] = useState("");
  const [infotext, setInfotext] = useState();
  const roadmapdata = JSON.parse(normal);
  console.log(roadmapdata.roadmap.map((roadmap: any) => roadmap.title));
  const sampledata = {
    roadmap: [
      { id: 1, level: 0, parent: 0, title: "Peeing Process" },
      { id: 2, level: 1, parent: 1, title: "Find a suitable restroom" },
      { id: 3, level: 1, parent: 1, title: "Unbutton or unzip pants" },
      { id: 4, level: 1, parent: 1, title: "Pull down underwear" },
    ],
  };

  const fetchInfo = async (texts: string) => {
    // setText(texts);
    setBlockSelected(texts);
    setLoading(true);
    const result = await fetch(`/api/roadmap/info?title=${texts}`);
    const json = await result.json();
    console.log(json);
    // @ts-ignore
    // const deez = stuff.message.choices[0].message.content;
    // const json1 = JSON.parse(deez);
    setInfo(json);

    return json;
  };

  useEffect(() => {
    if (info) {
      // @ts-ignore
      const infostring =
        // @ts-ignore
        info.message.choices[0].message.function_call.arguments;
      const parse = JSON.parse(infostring);
      setInfotext(parse);
      setLoading(false);
    } else {
      null;
    }
  }, [info]);

  //  @ts-ignore
  console.log("info text", infotext);
  //  @ts-ignore

  //   to use this code basically just add a dropdown with a item as option of set goal. then pass this like this:
  //  onClick={() => setGoal(roadmap.id, roadmap.title)}
  const setGoal = async (id: string, goal: string, index: number) => {
    // @ts-ignore
    console.log("hello");
    console.log(id);
    const total = roadmapdata.roadmap.length;
    const percentage = (index / total) * 100;
    const postInfo = {
      _id: id,
      progress: percentage,
      goal: goal,
    };
    const result = await fetch(`/api/setCurrentRoadmap`, {
      body: JSON.stringify(postInfo),
      method: "POST",
    });
    const json = await result.json();
    console.log(json);
  };
  return (
    <Layout
      hasBg={false}
      bgColor={"#121212"}
      icon="roadmap.svg"
      text="Roadmap"
      border="gray-500"
      goals={goals}
      children={
        <div className="flex justify-between h-screen overflow-x-hidden  p-5 gap-20 ">
          {/* Roadmaps  */}
          <div className="  overflow-y-scroll scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-zinc-800   w-full">
            <div className=" relative space-y-10 flex w-full items-center py-10 flex-col justify-center">
              <div className="absolute border z-0 border-zinc-700/20 w-1 rounded-3xl bg-zinc-700 bg-opacity-20 h-full"></div>
              {roadmapdata.roadmap.map((roadmap: any, index: number) => (
                <div className="z-20 group flex items-center gap-[0.65rem]">
                  <Tooltip
                    content={`click to know more`}
                    color="invert"
                    placement="right"
                  >
                    <div
                      onClick={() => fetchInfo(roadmap.title)}
                      className="rounded-md flex gap-5 items-center hover:bg-gradient-to-tr transition-all hover:transition-all hover:duration-150 duration-100 hover:from-slate-300/10 border shadow-xl shadow-black/50 z-10 border-zinc-700 bg-neutral-900  w-fit border-opacity-50 p-5"
                    >
                      <h1 className="text-white">{roadmap.title}</h1>
                    </div>
                  </Tooltip>
                  <div>
                    <Tooltip content={`add current goal`}>
                      <div
                        // @ts-ignore
                        onClick={() => setGoal(deafult, roadmap.title, index)}
                        className="text-lg font-sans group-hover:inline hidden opacity-0 group-hover:opacity-100 transition-all duration-200 hover:cursor-pointer"
                      >
                        +
                      </div>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Info */}
          <div
            className={
              about
                ? "h-screen inline  w-full overflow-y-scroll opacity-100 transition-all duration-150 scrollbar-thin -my-10 p-10 "
                : "hidden transition-all duration-150 opacity-0"
            }
          >
            <div className="h-screen w-full bg-neutral-900 rounded-[10px] px-5 space-y-10 py-10 border border-zinc-800">
              <div className="space-y-5">
                <h1 className="text-xl flex justify-between items-center text-white font-semibold">
                  Block Title: {!blockSelected ? <div></div> : blockSelected}
                  <span>
                    {loading ? (
                      <Loading color={"secondary"} />
                    ) : (
                      <ArrowRightIcon
                        onClick={() => setAbout(false)}
                        className="h-5 w-5 cursor-pointer"
                      />
                    )}
                  </span>
                </h1>
                {/* data */}
                {/* @ts-ignore */}
                <div>{infotext ? <p>{infotext.description}</p> : null}</div>
              </div>
              <div className="">
                <h1 className="text-xl text-white font-semibold">
                  Recommended Youtube Videos
                </h1>
                <div>
                  {infotext ? (
                    <div className="flex gap-10 rounded-lg">
                      {/* @ts-ignore */}
                      <ReactPlayer
                        width={300}
                        height={150}
                        controls
                        // @ts-ignore
                        url={infotext.link[0]}
                      />
                      {/* @ts-ignore */}
                      <ReactPlayer
                        width={300}
                        height={150}
                        controls
                        // @ts-ignore
                        url={infotext.link[1]}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                <h1 className="text-xl text-white font-semibold">
                  Recommended Blog
                </h1>
                {infotext ? (
                  <>
                    {/*  @ts-ignore */}
                    <Link target="_blank" className="" href={infotext.blog}>
                      <div className="text-neutral-200 mt-5 w-fit p-3 rounded-[5px] shadow border border-zinc-800 border-opacity-75 text-base font-medium">
                        Open in web
                      </div>
                    </Link>
                    <div>{/* @ts-ignore */}</div>
                  </>
                ) : null}
              </div>
              <div>
                <h1>3 best content creators in the field</h1>
                <div>
                  {infotext ? (
                    <div>
                      {/* @ts-ignore */}
                      {infotext.creators.map((creator) => (
                        <div>{creator.name}</div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    ></Layout>
  );
};

const query = groq`*[_type == "roadmap" && slug.current == $slug][0]{
    ...,   
    category[]->{
    ...,
  }

}`;
export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    groq`*[_type == "roadmap" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const roadmap = await sanityClient.fetch(query, { slug });
  const goals = await fetchGoals();
  return {
    props: {
      roadmap,
      goals,
    },
  };
}
export default Post;
