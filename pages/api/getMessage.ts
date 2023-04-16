import type {NextApiRequest, NextApiResponse} from "next"
import {groq } from "next-sanity"; 
import {sanityClient } from "../../sanity";
import { Message } from "../../typings";


const query = groq`
*[_type == "messages"] {
    ...,
  }    | order(_createdAt asc)
    
`

type Data = {
   messages: Message[]
}


export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
 ) {

   const messages: Message[] = await sanityClient.fetch(query)
   res.status(200).json({ messages})
 }
 