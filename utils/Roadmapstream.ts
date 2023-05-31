import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
  } from "eventsource-parser";
  
  export type ChatGPTAgent = "user" | "system";
  
  export interface ChatGPTMessage {
    role: ChatGPTAgent;
    content: string;
  }
  
  export interface OpenAIStreamPayload {
    model: string;
    messages: ChatGPTMessage[];
  }


    
  
  export async function OpenAIStream(payload: OpenAIStreamPayload) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
  
    let counter = 0;

    const apiEndpoint = `https://api.cattto.repl.co/v1/chat/completions`;
  
    const res = await fetch(apiEndpoint, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CATTO_KEY}`,
        },
        body: JSON.stringify(payload),
        method: "POST",
      });
  
    const stream = new ReadableStream({
      async start(controller) {
        // callback
        function onParse(event: ParsedEvent | ReconnectInterval) {
          if (event.type === "event") {
            const data = event.data;
            // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const text = json.choices[0].delta?.content || "";
              if (counter < 2 && (text.match(/\n/) || []).length) {
                // this is a prefix character (i.e., "\n\n"), do nothing
                return;
              }
              const queue = encoder.encode(text);
              controller.enqueue(queue);
              counter++;
            } catch (e) {
              // maybe parse error
              controller.error(e);
            }
          }
        }
  
        // stream response (SSE) from OpenAI may be fragmented into multiple chunks
        // this ensures we properly read chunks and invoke an event for each SSE event stream
        const parser = createParser(onParse);
        // https://web.dev/streams/#asynchronous-iteration
        for await (const chunk of res.body as any) {
          parser.feed(decoder.decode(chunk));
        }
      },
    });
  
    return stream;
  }