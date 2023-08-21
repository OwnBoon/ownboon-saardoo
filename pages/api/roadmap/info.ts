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

    const basePrompt = `
    
    based on my prompt , explain the prompt in very short and even provide the 2 links for  the best youtube video one can watch to do that and also mention 3 good content creators also mention a existing blog  for this field.
    Important Rules:
      - collapse response in one line , remove space and new lines 
    
    common Rules: 
    - Provide your response as a JSON object with the following schema: {"link":[{"video": "videolinkofcorrespondiingvideo"}],"description":"...","creators": [{"first": "..."}], "blog":"{"link":{...}}"}
    - use a proper json format.
    - there should be no parsing error in frontend.
    - only use one variable name for videos, dont add video1 and video2. just add video.
    - make sure links have a array of two links with variable as "video"

    
    prompt: ${title}`

    
    const prompt = `return a explanation using short description, 2 youtube video links, 3 content creator names and 1 existing blog link. for ${title}`;
    const schema = {
          "type": "object",
          "properties": {
            "link": {
              "type": "array",
              "description": "youtube links for the prompt",
              "items": {"video": "string"}
            },
            "description": {
              "type": "string",
              "description": "description of the prompt",
            },
            "creators": {
              "type": "array",
              "description": "content creator names who explain the prompt the best. dont forget to add name object also",
              "items": {"name": "string"}
            },
            "blog": {
              "type": "string",
              "description": "link for the blog which explains the prompt the best",
            }
          }
        }
        
        const  data = {
            "model": "gpt-3.5-turbo",
            "messages": [
              { role: "system", "content": "You are a helpful recipe assistant." },
              { role: "user", content: prompt }],
            "functions": [{ name: "set_recipe", parameters: schema }],
            "function_call": {name: "set_recipe"}

        }
        const apiEndpoint = `https://api.openai.com/v1/chat/completions`;
        
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