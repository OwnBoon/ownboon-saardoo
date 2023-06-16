import React, { useState } from "react";
import { Message } from "../../typings";
import { useSession } from "next-auth/react";
import { BsImage, BsSend } from "react-icons/bs";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Input, Modal, Text } from "@nextui-org/react";
import Picker from "emoji-picker-react";
interface Props {
  socket: any;
  message: Message[];
  replyuser: string;
  replymessage: string;
}

const ChatFooter = ({ socket, replyuser, replymessage }: Props) => {
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
        replymessage: replymessage,
        replyuser: replyuser,
        image: imageSrc,
      });
      setMessage("");
      const mutations: Message = {
        _type: "messages",
        text: message,
        username: localStorage.getItem("userName") || "random user",
        socketId: socket.id,
        pfp: localStorage.getItem("pfp") || "idkk",
        time: `${today.getHours()}` + `:${today.getMinutes()}`,
        day: weekday[today.getDay()],
        replyuser: replyuser,
        replymessage: replymessage,
        image: imageSrc,
      };
      const result = await fetch(`/api/addMessage`, {
        body: JSON.stringify(mutations),
        method: "POST",
      });
      const json = await result.json();
      return json;
    }
  };

  const [emojimenu, setEmojiMenu] = useState(false);

  const [imageSrc, setImageSrc] = useState("");
  const [uploadData, setUploadData] = useState();

  function handleOnChange(changeEvent: any) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      // @ts-ignore
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event: any) {
    event.preventDefault();

    // const form = event.currentTarget;
    // const fileInput = Array.from(form.elements).find(
    //   ({ name }: any) => name === "file"
    // );

    // const formData = new FormData();
    // for (const file of fileInput) {
    //   console.log(file);
    // }

    // formData.append("upload_preset", "ownboon-uploads");

    // const data = await fetch(
    //   "https://api.cloudinary.com/v1_1/dwminkjmp/image/upload",
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // ).then((r) => r.json());

    // setImageSrc(data.secure_url);
    setVisible(false);
    // setUploadData(data);
  }

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <div className="w-full flex justify-center sticky bottom-0 py-2 h-full  bg-[#1F1F1F]">
      <div
        // @ts-ignore
        className=" justify-between flex w-full px-5  "
      >
        <div className="w-full flex px-2 items-center justify-between border border-white/10 rounded-2xl bg-[#1F1F1F]">
          <div className="mx-2">
            {/* <PlusIcon onClick={handler} className="h-5 w-5" /> */}
            <button
              onClick={handler}
              className="flex items-center justify-center text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                ></path>
              </svg>
            </button>
          </div>
          <Modal
            closeButton
            blur
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Select A
                <Text b size={18}>
                  {" "}
                  Image
                </Text>
              </Text>
            </Modal.Header>

            <Modal.Body className="flex justify-center items-center">
              <form
                method="post"
                onChange={handleOnChange}
                onSubmit={handleOnSubmit}
              >
                {imageSrc ? (
                  <div>
                    <img src={imageSrc} />
                    {imageSrc && !uploadData && (
                      <p>
                        <button>Upload Files</button>
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <label htmlFor="file-input">
                      <BsImage className="text-gray-400 hover:text-gray-800 h-20 w-20 transition-all duration-150 cursor-pointer" />
                    </label>
                    <div className="flex items-center justify-center">
                      <input
                        id="file-input"
                        type="file"
                        accept="image/"
                        className="hidden"
                        name="file"
                      />
                    </div>
                    {imageSrc && !uploadData && (
                      <p>
                        <button>Upload Files</button>
                      </p>
                    )}
                  </div>
                )}
              </form>
            </Modal.Body>
          </Modal>
          {replymessage || replyuser ? (
            <div className="text-xs text-white/40 flex">
              replying to {replyuser}
            </div>
          ) : null}
          <div className="flex-grow flex  gap-10 items-center ml-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Write message"
                className=" rounded-lg !focus:border-b !focus:border !focus:border-white border-none transition-all duration-150 ` bg-[#1F1F1F]  w-full focus:outline-none focus:ring-0  outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={handleTyping}
              />

              <button
                onClick={() =>
                  emojimenu ? setEmojiMenu(false) : setEmojiMenu(true)
                }
                className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
            </div>

            <Modal
              closeButton
              blur
              aria-labelledby="modal-title"
              open={emojimenu}
              onClose={() => setEmojiMenu(false)}
            >
              <Picker
                // onEmojiClick={onEmojiClick}
                // @ts-ignore
                disableAutoFocus={true}
                native
              />
            </Modal>

            {/* <button onClick={handleSendMessage}>
              <BsSend />
            </button> */}

            <div className="ml-5 ">
              <button
                // @ts-ignore
                onClick={handleSendMessage}
                className="flex p-2 items-center  justify-center transition-all duration-200  hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <svg
                  className="w-5  h-5 transform rotate-45 -mt-px"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          {imageSrc ? (
            <div>
              <img src={imageSrc} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
