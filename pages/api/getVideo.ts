import type {NextApiRequest, NextApiResponse} from "next"
import {groq } from "next-sanity"; 
import {sanityClient } from "../../sanity";
import { Posts, User, Videos } from "../../typings";


const query = groq`
*[_type == "videos"] {
    ...,
  }  | order(_createdAt desc)
    
`

type Data = {
   videos: Videos[]
}


export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
 ) {

   const videos: Videos[] = await sanityClient.fetch(query)
   res.status(200).json({ videos})
 }
 