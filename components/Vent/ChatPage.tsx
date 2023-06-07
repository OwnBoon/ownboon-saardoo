import React, { useEffect, useState, useRef } from "react";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { Message } from "../../typings";
import { UserButton, useUser } from "@clerk/nextjs";
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

  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="col-span-11 text-white overflow-hidden h-screen  ">
      <ChatBody
        message={message}
        messages={messages}
        typingStatus={typingStatus}
        lastMessageRef={lastMessageRef}
        socket={socket}
      />
      {/* <ChatFooter message={message} socket={socket} /> */}
    </div>
  );
};

export default ChatPage;
