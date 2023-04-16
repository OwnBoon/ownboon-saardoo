import React, { useEffect, useState, useRef } from "react";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { Message } from "../../typings";
// import ChatFooter from "./ChatFooter";

interface Props {
  socket: any;
  message: Message[];
}

const ChatPage = ({ socket, message }: Props) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);
  const [chatType, setChatType] = useState("normal");
  const handleSwitchToGroupChat = () => {
    setChatType("group");
  };

  const handleSwitchToNormalChat = () => {
    setChatType("normal");
  };

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
    <div className="col-span-9 ">
      <div className="text-black   h-3/4">
        <ChatBody
          message={message}
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter message={message} socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
