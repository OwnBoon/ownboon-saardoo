// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GoalBody, Goals, Posts } from "../../typings";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: Goals = JSON.parse(req.body);

  const info = {
    mutations: [
      {
        create: {
          _type: "goals",
          title: data.title,
          progress: data.progress,
          username: data.username,
          completed: data.completed,
          delete: data.delete,
          todoIndex: data.todoIndex
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