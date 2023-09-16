// [slug].tsx

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "../../sanity";
import { Category, Posts, Roadmaps } from "../../typings";
import Sidebar from "../../components/dashboard/Sidebar";
import Progress from "../../components/dashboard/Progress";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Layout from "../../components/Layout/Layout";
import { Card, Text, Tooltip } from "@nextui-org/react";
import Link from "next/link";
interface Props {
  roadmap: any;
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

const RoadComp = ({ roadmap }: Props) => {
  // in the following code when you will click the div, a api req will be sent to openai and the info will come abt the information of roadmap stage.

  const normal = roadmap.content.replace("@finish", "");
  const roadmapdata = JSON.parse(normal);
  // console.log(roadmapdata.roadmap.map((roadmap: any) => roadmap.title));
  const sampledata = {
    roadmap: [
      { id: 1, level: 0, parent: 0, title: "Peeing Process" },
      { id: 2, level: 1, parent: 1, title: "Find a suitable restroom" },
      { id: 3, level: 1, parent: 1, title: "Unbutton or unzip pants" },
      { id: 4, level: 1, parent: 1, title: "Pull down underwear" },
    ],
  };

  //  @ts-ignore
  //  @ts-ignore

  //   to use this code basically just add a dropdown with a item as option of set goal. then pass this like this:
  //  onClick={() => setGoal(roadmap.id, roadmap.title)}

  return (
    <div className="flex blur-[1px] justify-between z-0 h-screen overflow-hidden p-5 gap-20 ">
      <div className="absolute border z-0 border-white/20  h-2 rounded-3xl bg-white mt-8 bg-opacity-20  w-full"></div>
      {roadmapdata.roadmap.map((roadmap: any, index: number) => (
        <Tooltip content={``} color="invert" placement="right">
          <div className="rounded-md  h-fit hover:duration-150 duration-100  border shadow-xl shadow-black/50 z-10 border-zinc-700 bg-neutral-900  w-fit border-opacity-50 p-5">
            <h1 className="text-white">{roadmap.title}</h1>
          </div>
        </Tooltip>
      ))}
    </div>
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
  return {
    props: {
      roadmap,
    },
  };
}
export default RoadComp;
