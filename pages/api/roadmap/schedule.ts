// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const title = req.query.title
    const cat = req.query.categories

    const maxItems = 10
    const minItems = 2

    const basePrompt = `based on my prompt , make up to date roadmap
    important response rules :
    - collapse response in one line , remove space and new lines 
    
    common rules:
    - when you finished send @finish in end of prompt result , not json response
    - no null title
    - short and efficient titles
    - don't extra description
    
    - response json should be single layer not nested items in items
    
    - choose most related / similar category from here ( based on prompt ):
    ${cat}
    - choose Other Category if you not found right category
    
    - sample response:
    { "category":"...","roadmap:[{"id": 1,"title":"..."}] }
    
    important items and levels rules:
    - minimum ${minItems} items
    - maximum ${maxItems} items
    - items should be less than ${maxItems}
    - fill only requested fields
    - no duplicate subjects
    
    prompt: 
    ${title}`

        const  data = {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": basePrompt}],
        }


  const apiEndpoint = `https://api.cattto.repl.co/v1/chat/completions`;

  const result = await fetch(apiEndpoint, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CATTO_KEY}`,
    },
    body: JSON.stringify(data),
    method: "POST",
  });
  const json = await result.json();

  res.status(200).json({ message: json });
}