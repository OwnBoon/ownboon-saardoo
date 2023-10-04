import type {NextApiRequest, NextApiResponse} from "next"
import {groq } from "next-sanity"; 
import {sanityClient } from "../../sanity";
import { LofiTodo } from "../../typings";


const query = groq`
*[_type == "lofi-todo"] {
    ...,
  
  }  | order(_createdAt desc)
    
`

type Data = {
   notes: LofiTodo[]
}


export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
 ) {

   const notes: LofiTodo[] = await sanityClient.fetch(query)
   res.status(200).json({ notes})
 }
 