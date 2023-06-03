// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import { sanityClient } from '../../sanity'
import { Comment } from '../../typings'

const commentQuery = groq`
  *[_type == "comment" && references(*[_type == "post" && _id == $blogId]._id)]{
      _id,
      ...
  } | order(_createdAt desc)
`

type Data = Comment[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { blogId } = req.query

  const comments: Comment[] = await sanityClient.fetch(commentQuery, {
    blogId,
  })
  res.status(200).json(comments)
}