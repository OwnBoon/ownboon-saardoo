import type {NextApiRequest, NextApiResponse} from "next"
import {groq } from "next-sanity"; 
import {sanityClient } from "../../sanity";
import {  Roadmaps, User } from "../../typings";


const query = groq`
*[_type == "roadmap"] {
    ...,
  }  | order(rating desc)
    
`

type Data = {
   roadmaps: Roadmaps[]
}


export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
 ) {

   const roadmaps: Roadmaps[] = await sanityClient.fetch(query)
   res.status(200).json({ roadmaps})
 }
 