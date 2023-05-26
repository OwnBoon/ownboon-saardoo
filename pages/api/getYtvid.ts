import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(   req: NextApiRequest,
  res: NextApiResponse) {
  const categories = [
    "how to get better in computer science and get a degree",
    "math",
    "science",
    "biology"
  ];
  const maxResults = 1;

  try {
    const videoData = await fetchYouTubeVideoData(categories, maxResults);
    res.status(200).json({videoData});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

async function fetchYouTubeVideoData(categories: any, maxResults = 1) {
  const apiKey = "AIzaSyCXms8U6EQo_UDyjcOqVHgVw7Ocm4j23J8";
  const youtube = google.youtube({ version: "v3", auth: apiKey });

  const videoData = [];

  for (const category of categories) {
    const response = await youtube.search.list({
      // @ts-ignore
      part: "snippet",
      q: category,
      type: "video",
      maxResults: maxResults
    });

    // @ts-ignore
    for (const item of response.data.items) {
      const videoTitle = item.snippet.title;
      const videoDescription = item.snippet.description;
      const videoUrl = `https://www.youtube.com/watch?v=${item.id.videoId}`;

      videoData.push({
        video_title: videoTitle,
        video_description: videoDescription,
        category: category,
        video_url: videoUrl
      });
    }
  }

  return videoData;
}
