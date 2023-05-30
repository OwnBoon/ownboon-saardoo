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

    const maxItems = 30
    const minItems = 15
    const minLevels = 5

    const basePrompt = `based on my prompt , make up to date roadmap
    important response rules :
    - collapse response in one line , remove space and new lines 
    
    common rules:
    - when you finished send @finish in end of prompt result , not json response
    - all should has a parent
    - root parent is 0
    - root item level should be 0
    - no null title
    - short and efficient titles
    - don't extra description
    
    - response json should be single layer not nested items in items
    
    - choose most related / similar category from here ( based on prompt ):
    ${cat}
    - choose Other Category if you not found right category
    
    - sample response:
    { "category":"...","roadmap:[{"id": 1,"level":1,"parent":5or0,"title":"..."}] }
    
    important items and levels rules:
    - minimum ${minLevels} levels
    - level 1 should has minimum 3 items
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