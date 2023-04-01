import React, { useState } from "react";

interface Props {
  socket: any;
}

const ChatFooter = ({ socket }: Props) => {
  const [message, setMessage] = useState("");
  const handleTyping = () =>
    socket.emit("typing", `${localStorage.getItem("userName")} is typing`);

  const handleSendMessage = (e: Event) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
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
            // @ts-ignore
            onClick={handleSendMessage}
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
