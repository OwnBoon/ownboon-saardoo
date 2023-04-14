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

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });
  socket.on("join", ({ name, room }, callBack) => {
    const { user, error } = addUser({ id: socket.id, name, room });
    if (error) return callBack(error);

    socket.join(user.room);

    socket.on("typing", (data) =>
      socket.broadcast.emit("typingResponse", data)
    );

    socket.on("newUser", (data) => {
      user.push(data);
      io.emit("newUserResponse", users);
    });
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log(user);
  });
});

server.listen(PORT, () => console.log(`Server is Quannected to Port ${PORT}`));
