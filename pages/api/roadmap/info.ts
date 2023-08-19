// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const title = req.query.title

    const basePrompt = `based on my prompt , explain that in very short and even provide the 2 links for  the best youtube video one can watch to do that and also mention 3 good content creators also mention a existing blog  for this field.: 
    ${title}.  
    note: 
    - make sure the response is in form of {"link":[{"video": "..."}],"description":"...","creators": [{"first": "..."}], "blog":"{"link":{...}}"}
    - use a proper json format.
    - only use one variable name for videos, dont add video1 and video2. just add video.`

        const  data = {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": basePrompt}],
        }


  const apiEndpoint = `https://api.openai.com/v1/chat/completions`;

  const result = await fetch(apiEndpoint, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CATTO_KEY}`,
    },
    body: JSON.stringify(data),
    method: "POST",
  });
  const json = await result.json();

  res.status(200).json({ message: json });
}