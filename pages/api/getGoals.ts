import type {NextApiRequest, NextApiResponse} from "next"
import {groq } from "next-sanity"; 
import {sanityClient } from "../../sanity";
import { Goals, User } from "../../typings";


const query = groq`
*[_type == "goals"  && !completed] {
    ...,
  
  }  | order(_createdAt asc)
    
`

type Data = {
   goals: Goals[]
}


export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
 ) {

   const goals: Goals[] = await sanityClient.fetch(query)
   res.status(200).json({ goals})
 }
 