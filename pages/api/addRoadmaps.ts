// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {Roadmaps } from "../../typings";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: Roadmaps = JSON.parse(req.body);

  const info = {
    mutations: [
      {
        create: {
          _type: "roadmap",
          email: data.email,
          slug: data.slug,
          content: data.content,
          progress: data.progress,
          goal: data.goal,
          completed: data.completed

        },
      },
    ],
  };

  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

  const result = await fetch(apiEndpoint, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
    body: JSON.stringify(info),
    method: "POST",
    next: {
      revalidate: 60
    }
  });
  const json = await result.json();

  res.status(200).json({ message: "Added!" });
}