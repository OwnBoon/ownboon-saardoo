// [slug].tsx

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "../../sanity";
import { Category, Posts } from "../../typings";
import Sidebar from "../../components/dashboard/Sidebar";
import Progress from "../../components/dashboard/Progress";
import dynamic from "next/dynamic";
import Head from "next/head";

interface Props {
  post: Posts;
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

const Post = ({ post }: Props) => {
  const PostDetail = dynamic(
    () => import("../../components/dashboard/PostDetail"),
    {
      ssr: false,
    }
  );
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="grid grid-cols-12 h-screen overflow-hidden !scrollbar !scrollbar-none bg-[#f4f1eb]/50">
        <Sidebar />
        <PostDetail post={post} />
        <Progress />
      </div>
    </>
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
  return {
    props: {
      post,
    },
  };
}
export default Post;
