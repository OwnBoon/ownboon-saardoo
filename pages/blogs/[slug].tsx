// [slug].tsx

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "../../sanity";
import { Category, Goals, Posts } from "../../typings";
import Sidebar from "../../components/dashboard/Sidebar";
import Progress from "../../components/dashboard/Progress";
import dynamic from "next/dynamic";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import { fetchGoals } from "../../utils/fetchGoals";

interface Props {
  post: Posts;
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

const Post = ({ post, goals }: Props) => {
  const PostDetail = dynamic(
    () => import("../../components/dashboard/PostDetail"),
    {
      ssr: false,
    }
  );
  return (
    <Layout
      hasBg={false}
      bgColor={"#121212"}
      icon="chat.svg"
      goals={goals}
      text="Chats"
      border="gray-500"
      children={
        <div className=" h-screen overflow-hidden !scrollbar !scrollbar-none bg-[#f4f1eb]/50">
          <Head>
            <title>
              {" "}
              {post.title} | {post.author}{" "}
            </title>
            <meta name="description" content={post.body} />
            <link rel="icon" href="/logo.png" />
          </Head>
          <PostDetail post={post} />
        </div>
      }
    />
  );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
    ...,   
    category[]->{
    ...,
  }

}`;
export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const post = await sanityClient.fetch(query, { slug });
  const goals = await fetchGoals();
  return {
    props: {
      post,
      goals,
    },
  };
}
export default Post;
