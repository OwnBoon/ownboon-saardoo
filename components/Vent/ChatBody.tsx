import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { Message } from "../../typings";
import { UserButton, useUser } from "@clerk/nextjs";
import ChatFooter from "./ChatFooter";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Container, Dropdown, Grid } from "@nextui-org/react";

interface Props {
  messages: any;
  typingStatus: any;
  lastMessageRef: any;
  message: Message[];
  socket: any;
}

const ChatBody = ({
  messages,
  typingStatus,
  lastMessageRef,
  message,
  socket,
}: Props) => {
  const router = useRouter();
  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    router.push("/");
  };
  const [replyuser, setReplyuser] = useState("");
  const [replymessage, setReplyMessage] = useState("");
  const [selected, setSelected] = useState(new Set(["text"]));

  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  console.log(replymessage, replyuser);

  const { isLoaded, isSignedIn, user } = useUser();

  const handleDelete = async (id: string) => {
    const mutations = {
      _id: id,
    };
    const result = await fetch(`/api/deleteMessage`, {
      body: JSON.stringify(mutations),
      method: "POST",
    });
    const json = await result.json();
    router.replace(router.asPath);
    return json;
  };

  const [state, setState] = useState("");
  return (
    <div className="">
      <header className="sticky  top-0 bg-">
        <div className="flex justify-between p-3 border-b">
          <div>Workspace</div>
          <div className="flex items-center gap-2 px-5">
            <UserButton />
            <p>{user?.username || user?.firstName}</p>
          </div>
        </div>
      </header>
      <div className="  h-screen  grid grid-cols-10   overflow-y-scroll p-5  rounded-lg">
        <div className="col-span-1 border-r h-full border-black "></div>
        <div className="col-span-9 overflow-y-scroll bg-[#151515] rounded-lg">
          {message.map((message) =>
            message.username === localStorage.getItem("userName") ? (
              <div className="p-5 " key={message._id}>
                <div className=" ">
                  {message.replymessage || message.replyuser ? (
                    <div className="text-white flex gap-5 text-sm text-white/40">
                      <p>@{message.replyuser}</p>
                      <h1 className="text-white/50 font-extralight">
                        {message.replymessage}
                      </h1>
                    </div>
                  ) : null}
                  <div className="flex justify-end ">
                    <div className="flex px-5 flex-col w-full items-end justify-center ">
                      <div className="font-semibold w-full flex items-center justify-between">
                        <Grid>
                          <Dropdown>
                            {/* @ts-ignore */}
                            <Dropdown.Button size={"xs"} color={""} light flat>
                              {" "}
                              <EllipsisVerticalIcon className="h-5 w-5 text-white" />
                            </Dropdown.Button>
                            <Dropdown.Menu
                              onAction={() => {
                                if (selectedValue === "Reply") {
                                  setReplyuser(message.username);
                                  setReplyMessage(message.text);
                                } else {
                                  // @ts-ignore
                                  handleDelete(message._id);
                                }
                              }}
                              selectedKeys={selected}
                              // @ts-ignore
                              onSelectionChange={setSelected}
                              aria-label="Static Actions"
                            >
                              <Dropdown.Item key="reply">Reply</Dropdown.Item>
                              <Dropdown.Item key="delete" color="error">
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Grid>

                        <div className="flex items-center">
                          <h1>{message.username} </h1>
                          <span className="font-light text-white/40 px-1 text-xs">
                            {" "}
                            {message.day} at {message.time}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p>{message.text}</p>
                        <img src={message.image} />
                      </div>
                    </div>
                    <img
                      className="w-10 object-cover  h-10  rounded-full"
                      src={message.pfp}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="p-5  hover:bg-white/10 rounded-lg"
                key={message._id}
              >
                <div>
                  {message.replymessage || message.replyuser ? (
                    <div className="text-white flex gap-5 text-sm text-white/40">
                      <p>@{message.replyuser}</p>
                      <h1 className="text-white/50 font-extralight">
                        {message.replymessage}
                      </h1>
                    </div>
                  ) : null}
                  <div className="flex  ">
                    <img
                      className="w-10 object-cover  h-10  rounded-full"
                      src={message.pfp}
                    />
                    <div className="flex px-5 flex-col w-full ">
                      <div className="flex justify-between w-full ">
                        <p className="font-semibold">
                          {message.username}{" "}
                          <span className="font-light text-white/40 px-1 text-xs">
                            {message.day} at {message.time}
                          </span>
                        </p>
                        <Grid>
                          <Dropdown>
                            {/* @ts-ignore */}
                            <Dropdown.Button size={"xs"} color={""} light flat>
                              {" "}
                              <EllipsisVerticalIcon className="h-5 w-5 text-white" />
                            </Dropdown.Button>
                            <Dropdown.Menu
                              onAction={() => {
                                if (selectedValue === "Reply") {
                                  setReplyuser(message.username);
                                  setReplyMessage(message.text);
                                } else {
                                  // @ts-ignore
                                  handleDelete(message._id);
                                }
                              }}
                              selectedKeys={selected}
                              // @ts-ignore
                              onSelectionChange={setSelected}
                              aria-label="Static Actions"
                            >
                              <Dropdown.Item key="reply">Reply</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Grid>
                      </div>
                      <div>
                        <p className="text-sm">{message.text}</p>
                        <img src={message.image} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          <div className="">
            {/* @ts-ignore */}
            {messages.map((message) =>
              message.name === localStorage.getItem("userName") ? (
                <div
                  className="p-5  hover:bg-white/10 rounded-lg "
                  key={message.id}
                >
                  <div>
                    {message.replymessage || message.replyuser ? (
                      <div className="text-white flex gap-5 text-sm text-white/40">
                        <p>@{message.replyuser}</p>
                        <h1 className="text-white/50 font-extralight">
                          {message.replymessage}
                        </h1>
                      </div>
                    ) : null}
                    <div className="flex justify-end ">
                      <div className="flex px-5 flex-col w-full items-end justify-center ">
                        <div className="font-semibold w-full flex items-center justify-between">
                          <Grid>
                            <Dropdown>
                              {/* @ts-ignore */}
                              <Dropdown.Button
                                size={"xs"}
                                // @ts-ignore
                                color={""}
                                light
                                flat
                              >
                                {" "}
                                <EllipsisVerticalIcon className="h-5 w-5 text-white" />
                              </Dropdown.Button>
                              <Dropdown.Menu
                                onAction={() => {
                                  if (selectedValue === "Reply") {
                                    setReplyuser(message.username);
                                    setReplyMessage(message.text);
                                  } else {
                                    // @ts-ignore
                                    handleDelete(message._id);
                                  }
                                }}
                                selectedKeys={selected}
                                // @ts-ignore
                                onSelectionChange={setSelected}
                                aria-label="Static Actions"
                              >
                                <Dropdown.Item key="reply">Reply</Dropdown.Item>
                                <Dropdown.Item key="delete" color="error">
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Grid>
                          <div className="flex items-center">
                            <h1>{message.username} </h1>
                            <span className="font-light text-white/40 px-1 text-xs">
                              {" "}
                              {message.day} at {message.time}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p>{message.text}</p>
                          <img src={message.image} />
                        </div>
                      </div>
                      <img
                        className="w-10 object-cover  h-10  rounded-full"
                        src={message.pfp}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="p-5 hover:bg-white/10 rounded-lg"
                  key={message.id}
                >
                  <div>
                    {message.replymessage || message.replyuser ? (
                      <div className="text-white flex gap-5 text-sm text-white/40">
                        <p>@{message.replyuser}</p>
                        <h1 className="text-white/50 font-extralight">
                          {message.replymessage}
                        </h1>
                      </div>
                    ) : null}
                    <div className="flex ">
                      <img
                        className="w-10 object-cover  h-10  rounded-full"
                        src={message.pfp}
                      />
                      <div className="flex px-5 flex-col">
                        <div className="flex justify-between w-full ">
                          <p className="font-semibold">
                            {message.username}{" "}
                            <span className="font-light text-white/40 px-1 text-xs">
                              {message.day} at {message.time}
                            </span>
                          </p>
                          <Grid>
                            <Dropdown>
                              {/* @ts-ignore */}
                              <Dropdown.Button
                                size={"xs"}
                                // @ts-ignore
                                color={""}
                                light
                                flat
                              >
                                {" "}
                                <EllipsisVerticalIcon className="h-5 w-5 text-white" />
                              </Dropdown.Button>
                              <Dropdown.Menu
                                onAction={() => {
                                  if (selectedValue === "Reply") {
                                    setReplyuser(message.username);
                                    setReplyMessage(message.text);
                                  } else {
                                    // @ts-ignore
                                    handleDelete(message._id);
                                  }
                                }}
                                selectedKeys={selected}
                                // @ts-ignore
                                onSelectionChange={setSelected}
                                aria-label="Static Actions"
                              >
                                <Dropdown.Item key="reply">Reply</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Grid>
                        </div>
                        <p>{message.text}</p>
                        <img src={message.image} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
            <ChatFooter
              replymessage={replymessage}
              replyuser={replyuser}
              message={message}
              socket={socket}
            />
          </div>
          <div className="mt-2 sticky bottom-0">
            <p>{typingStatus}</p>
          </div>
          <div ref={lastMessageRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
