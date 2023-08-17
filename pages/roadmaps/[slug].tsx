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

const Post = ({ roadmap }: Props) => {
  // in the following code when you will click the div, a api req will be sent to openai and the info will come abt the information of roadmap stage.

  const PostDetail = dynamic(
    () => import("../../components/dashboard/PostDetail"),
    {
      ssr: false,
    }
  );
  console.log(roadmap.content.replace("@finish", ""));
  const normal = roadmap.content.replace("@finish", "");
  const [info, setInfo] = useState("");
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
    const result = await fetch(`/api/roadmap/info?title=${texts}`);
    const json = await result.json();
    // @ts-ignore
    // const deez = stuff.message.choices[0].message.content;
    // const json1 = JSON.parse(deez);
    setInfo(json);

    return json;
  };

  useEffect(() => {
    if (info) {
      // @ts-ignore
      const infostring = info.message.choices[0].message.content;
      const parse = JSON.parse(infostring);
      setInfotext(parse);
    } else {
      null;
    }
  }, [info]);
  //  @ts-ignore
  console.log("info text", infotext);
  //  @ts-ignore

  const progress = 0;
  //   to use this code basically just add a dropdown with a item as option of set goal. then pass this like this:
  //  onClick={() => setGoal(roadmap.id, roadmap.title)}
  const setGoal = async (id: string, goal: string) => {
    const postInfo = {
      id: id,
      progress: progress,
      goal: goal,
    };
    const result = await fetch(`/api/setCurrentRoadmap`, {
      body: JSON.stringify(postInfo),
      method: "POST",
    });
    const json = await result.json;
  };
  return (
    <div className=" h-screen overflow-hidden flex justify-center  !scrollbar !scrollbar-none bg-black">
      <Head>
        <title>{roadmap.email}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="text-white py-5">
        User Roadmap
        {/* <div>{roadmap.content.roadmap[0].title}</div> */}
        {/* <div>{roadmapdata}</div> */}
        <div className=" gap-5 flex">
          <div className="gap-5 space-y-5">
            {roadmapdata.roadmap.map((roadmap: any) => (
              <div
                onClick={() => fetchInfo(roadmap.title)}
                className="bg-red-500"
              >
                <p>{roadmap.title}</p>
                <div>
                  info on the topic:
                  {infotext ? (
                    <div>
                      {/* @ts-ignore */}
                      <p>{infotext.description}</p>
                      <div className="scale-[0.6] rounded-lg">
                        {/* @ts-ignore */}
                        <ReactPlayer controls url={infotext.link} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
export default Post;
