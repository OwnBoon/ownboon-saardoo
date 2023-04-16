import { useRouter } from "next/router";
import React from "react";
import { Message } from "../../typings";

interface Props {
  messages: any;
  typingStatus: any;
  lastMessageRef: any;
  message: Message[];
}

const ChatBody = ({
  messages,
  typingStatus,
  lastMessageRef,
  message,
}: Props) => {
  const router = useRouter();
  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    router.push("/");
  };
  return (
    <>
      <header className="bg-black/5 rounded-xl   px-3 py-2">
        <p>Hangout</p>
        <button
          className="bg-red-500 rounded-lg text-white p-2"
          onClick={handleLeaveChat}
        >
          LEAVE CHAT
        </button>
      </header>

      <div className="bg-black/10 text-black h-[30rem]  grid grid-cols-6   overflow-y-scroll p-5 mt-16 rounded-lg">
        <div className="col-span-1 border-r h-full border-black "></div>
        <div className="col-span-5 overflow-y-scroll">
          {message.map((message) => (
            <div className="p-5" key={message._id}>
              <div className="flex ">
                <img
                  className="w-10 object-cover  h-10  rounded-full"
                  src={message.pfp}
                />
                <div className="flex px-5 flex-col">
                  <p className="font-semibold">
                    {message.username}{" "}
                    <span className="font-semibold text-black/60 px-1 text-xs">
                      {message.day} at {message.time}
                    </span>
                  </p>
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          {/* @ts-ignore */}
          {messages.map((message) => (
            <div className="p-5" key={message.id}>
              <div className="flex ">
                <img
                  className="w-10 object-cover  h-10  rounded-full"
                  src={message.pfp}
                />
                <div className="flex px-5 flex-col">
                  <p className="font-semibold">
                    {message.name}{" "}
                    <span className="font-semibold text-black/60 px-1 text-xs">
                      {message.day} at {message.time}
                    </span>
                  </p>
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-2 sticky bottom-0">
            <p>{typingStatus}</p>
          </div>
          <div ref={lastMessageRef} />
        </div>
      </div>
    </>
  );
};

export default ChatBody;
