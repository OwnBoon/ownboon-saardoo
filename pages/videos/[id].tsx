// [slug].tsx

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "../../sanity";
import { Category, Posts } from "../../typings";
import Sidebar from "../../components/dashboard/Sidebar";
import Progress from "../../components/dashboard/Progress";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchFromAPI } from "../../utils/fetchVideo";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
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

interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    channelTitle: string;
    description: string;
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

const Post = () => {
  const ReactPlayer = dynamic(() => import("react-player"), {
    ssr: false,
  });
  const router = useRouter();
  const id = router.query.id;
  const [videos, setVideos] = useState<Video>();
  const [videoDetail, setVideoDetail] = useState<Video>();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  return (
    <>
      {/* <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">cum</div>
          </div>
        </div>
      </div> */}
      <div className="grid grid-cols-12 bg-[#f4f1eb]/50">
        <Sidebar />
        {/* <PostDetail post={post} /> */}
        <div className="col-span-11   flex justify-center mt-10">
          <div className="">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="mr-20"
              controls
              width={960}
              height={540}
            />
            <div className="pl-3">
              <h1 className="font-semibold">{videoDetail?.snippet.title}</h1>
              <p className="text-sm">
                {videoDetail?.snippet.channelTitle}
                {/* <CheckCircleIcon /> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
