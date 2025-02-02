// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../typings'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: User = JSON.parse(req.body)

  const mutations = {
    mutations: [
      {
        create: {
          _type: 'user',
          name: data.name,
          email: data.email,
          focus: data.focus,
          leaderboard: data.leaderboard,
          secret: data.secret,
          verified: data.verified,
          profileImage: data.profileImage,
          follow: data.follow,
          chatid: data.chatid,
          onbord: data.onboard,
          slug: data.slug
        },
      },
    ],
  }

  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}?returnDocuments=true`

  const result = await fetch(apiEndpoint, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
    body: JSON.stringify(mutations),
    method: 'POST',
  })
  const json = await result.json()

  res.status(200).send({ message: json });
}