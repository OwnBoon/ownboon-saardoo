import React, { useEffect, useState, useRef } from "react";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
// import ChatFooter from "./ChatFooter";

interface Props {
  socket: any;
}

const ChatPage = ({ socket }: Props) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    // @ts-ignore
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    // @ts-ignore
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="col-span-9">
      <div className="text-black h-full">
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
