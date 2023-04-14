// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
const { addUser, removeUser } = require("./user");

const PORT = 5000;

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
    // @ts-ignore
    socket.on("join", ({ name, room }, callBack) => {
      const { user, error } = addUser({ id: socket.id, name, room });
      if (error) return callBack(error);
  
      socket.join(user.room);
  
      socket.on("typing", (data: any) =>
        socket.broadcast.emit("typingResponse", data)
      );
  
      socket.on("newUser", (data: any) => {
        user.push(data);
        // @ts-ignore
        io.emit("newUserResponse", users);
      });
    });
    socket.on("disconnect", () => {
      const user = removeUser(socket.id);
      console.log(user);
    });
  });
  
  server.listen(PORT, () => console.log(`Server is connected to Port ${PORT}`));
  
      
}
