import type {NextApiRequest, NextApiResponse} from "next"
import {groq } from "next-sanity"; 
import {sanityClient } from "../../sanity";
import { Posts, User } from "../../typings";


const query = groq`
*[_type == "post"] {
    ...,
    author[]->{
      ...,
    },      
    category[]->{
    ...,
  }
  }  | order(_createdAt asc)
    
`

type Data = {
   posts: Posts[]
}


export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
 ) {

   const posts: Posts[] = await sanityClient.fetch(query)
   res.status(200).json({ posts})
 }
 