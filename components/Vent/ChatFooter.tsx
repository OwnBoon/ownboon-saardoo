import React, { useState } from "react";
import { Message } from "../../typings";
import { useSession } from "next-auth/react";

interface Props {
  socket: any;
  message: Message[];
}

const ChatFooter = ({ socket }: Props) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const [message, setMessage] = useState("");

  const { data: session } = useSession();
  const handleTyping = () =>
    socket.emit("typing", `${localStorage.getItem("userName")} is typing`);

  const handleSendMessage = async (e: Event) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        pfp: localStorage.getItem("pfp"),
        time: `${today.getHours()}` + `:${today.getMinutes()}`,
        day: weekday[today.getDay()],
      });
      setMessage("");
      const mutations = {
        _type: "messages",
        text: message,
        username: localStorage.getItem("userName"),
        socketId: socket.id,
        pfp: localStorage.getItem("pfp"),
        time: `${today.getHours()}` + `:${today.getMinutes()}`,
        day: weekday[today.getDay()],
      };
      const result = await fetch(`/api/addMessage`, {
        body: JSON.stringify(mutations),
        method: "POST",
      });
      const json = await result.json();
      return json;
    }
  };

  return (
    <div className="mt-5">
      {/* @ts-ignore */}
      <form onSubmit={handleSendMessage}>
        <div className="justify-between w-full flex">
          <input
            type="text"
            placeholder="Write message"
            className="px-5 rounded-lg w-full mr-20 outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleTyping}
          />
          <button
            onClick={() => {
              handleSendMessage;
            }}
            className="p-3 bg-black/20 rounded-xl"
          >
            SEND
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatFooter;
