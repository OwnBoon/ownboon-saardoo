const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const maxItems = 25;
const minItems = 5;
const minLevels = 3;

app.get("/api/handler", async (req, res) => {
  const { title } = req.query;

  const basePrompt = `based on my prompt, make up to date roadmap
  important response rules :
  - collapse response in one line, remove space and new lines 
    
  common rules:
  - when you finished send @finish in end of prompt result, not json response
  - all should has a parent
  - root parent is 0
  - root item level should be 0
  - no null title
  - short and efficient titles
  - don't extra description
    
  - response json should be single layer not nested items in items
    

    
  - sample response:
  {"roadmap":[{"id":1,"level":1,"parent":5or0,"title":"..."}]}
    
  important items and levels rules:
  - minimum ${minLevels} levels
  - level 1 should have a minimum of 3 items
  - minimum ${minItems} items
  - maximum ${maxItems} items
  - items should be less than ${maxItems}
  - fill only requested fields
  - no duplicate subjects
    
  prompt: 
  ${title}`;

  const data = {
    model: "gpt-3.5-turbo-16k-0613",
    messages: [{ role: "user", content: basePrompt }],
    temperature: 0.4,
    max_tokens: 1000,
  };

  const apiEndpoint = "https://api.cattto.repl.co/v1/chat/completions";

  try {
    const result = await fetch(apiEndpoint, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer catto_key_B3825mSZ0GZ3h8kDDUsxllWU`,
      },
      body: JSON.stringify(data),
      method: "POST",
    });

    const json = await result.json();

    res.status(200).json({ message: json });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
