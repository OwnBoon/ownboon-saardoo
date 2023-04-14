// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 4000;
const socketIO = require("socket.io")(http, {
  cors: {
    origin: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
app.use(cors());
let users: any = [];
type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    socketIO.on("connection", (socket: any) => {
        console.log(`⚡: ${socket.id} user just connected!`);
        socket.on("message", (data: any) => {
          socketIO.emit("messageResponse", data);
        });
      
        socket.on("typing", (data: any) => socket.broadcast.emit("typingResponse", data));
      
        socket.on("newUser", (data: any) => {
          users.push(data);
          socketIO.emit("newUserResponse", users);
        });
      
        socket.on("disconnect", () => {
          console.log("🔥: A user disconnected");
          users = users.filter((user: any) => user.socketID !== socket.id);
          socketIO.emit("newUserResponse", users);
          socket.disconnect();
        });
      });
      
      app.get("/api", (req: NextApiRequest, res: NextApiResponse<Data>) => {
        res.json({ message: "Hello" });
      });
      
      http.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
      });
      
}
