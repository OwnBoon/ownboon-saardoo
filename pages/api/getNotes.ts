import type {NextApiRequest, NextApiResponse} from "next"
import {groq } from "next-sanity"; 
import {sanityClient } from "../../sanity";
import { Goals, Notes, User } from "../../typings";


const query = groq`
*[_type == "notes"] {
    ...,
  
  }  | order(_createdAt desc)
    
`

type Data = {
   notes: Notes[]
}


export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
 ) {

   const notes: Notes[] = await sanityClient.fetch(query)
   res.status(200).json({ notes})
 }
 