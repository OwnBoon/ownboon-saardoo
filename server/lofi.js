const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const rooms = new Map();

io.on("connection", (socket) => {
  socket.on("sendMessage", (message) => {
    const room = getRoomBySocketId(socket.id);
    if (room) {
      io.to(room).emit("receiveMessage", {
        user: socket.handshake.auth.user.name,
        message,
      });
    }
  });
  // Handle room creation
  socket.on("createRoom", (roomName, song) => {
    if (rooms.has(roomName)) {
      socket.emit("roomNotFound", roomName);
      return;
    }

    rooms.set(roomName, new Set([socket.id]));
    socket.join(roomName);
    socket.emit("roomStatus", true);
    console.log("user has joined", roomName);
  });

  socket.on("songStuff", (song) => {
    const activeSongData = song; // Replace this with your own function to get the active song data
    console.log("a user is playing", activeSongData);
    socket.emit("activeSongData", activeSongData);
  });

  // Handle joining a room
  socket.on("joinRoom", (roomName) => {
    console.log("user has joined", roomName);

    const currentRoom = getRoomBySocketId(socket.id);
    console.log(currentRoom);
    if (currentRoom) {
      socket.leave(currentRoom);
    }

    const roomMembers = rooms.get(roomName);
    roomMembers.add(socket.id);
    socket.join(roomName);
    socket.emit("roomStatus", true);
  });
  // Handle play/pause events
  socket.on("togglePlayback", (playbackStatus) => {
    const room = getRoomBySocketId(socket.id);
    if (room) {
      io.to(room).emit("togglePlayback", playbackStatus);
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    const room = getRoomBySocketId(socket.id);
    if (room) {
      const roomMembers = rooms.get(room);
      roomMembers.delete(socket.id);

      io.to(room).emit("userLeft", getUserNamesInRoom(room));
    }
  });
});

const getRoomBySocketId = (socketId) => {
  for (const [roomName, roomMembers] of rooms.entries()) {
    if (roomMembers.has(socketId)) {
      return roomName;
    }
  }
  return null;
};

const getUserNamesInRoom = (roomName) => {
  const roomMembers = rooms.get(roomName);
  const userNames = [];
  for (const socketId of roomMembers) {
    const socket = io.sockets.sockets.get(socketId);
    if (socket && socket.handshake.auth.user) {
      userNames.push(socket.handshake.auth.user.name);
    }
  }
  return userNames;
};

const port = 8000; // Choose any available port number
server.listen(port, () => {
  console.log(`WebSocket server listening on port ${port}`);
});
