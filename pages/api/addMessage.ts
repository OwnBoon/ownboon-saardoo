// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Message } from "../../typings";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: Message = JSON.parse(req.body);

  const info = {
    mutations: [
      {
        create: {
          _type: "messages",
          text: data.text,
          username: data.username,
          pfp: data.pfp,
          time: data.time,
          socketId: data.socketId,
          day: data.day,
          replyuser: data.replyuser,
          replymessage: data.replymessage,
          image: data.image
        },
      },
    ],
  };

  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}?returnDocuments=true`;

  const result = await fetch(apiEndpoint, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
    body: JSON.stringify(info),
    method: "POST",
  });
  const json = await result.json();

  res.status(200).send({ message: json });
}