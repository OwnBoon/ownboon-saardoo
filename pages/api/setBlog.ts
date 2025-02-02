// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GoalBody, Goals, Posts, UserBody } from "../../typings";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: Posts = JSON.parse(req.body);

  const mutations = {
    mutations: [
      {
        patch: {
          id: data._id,
          set: {
            like: data.like,
            liked: data.liked
          }
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
    body: JSON.stringify(mutations),
    method: "POST",
  });
  const json = await result.json();

  res.status(200).json({ message: json });
}