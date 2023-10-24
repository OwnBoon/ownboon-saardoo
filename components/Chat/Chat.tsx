import React, { useState } from "react";
// import SendbirdApp from "@sendbird/uikit-react/App";
import { User } from "../../typings";
import "../../styles/chat.css";
// @ts-ignore
import App from "@sendbird/uikit-react/App";
const APP_ID = "7FB154A3-C967-45D0-90B7-6A63E5F0E3EB";
// @ts-ignore
import SBConversation from "@sendbird/uikit-react/Channel";
// @ts-ignore
import SBChannelList from "@sendbird/uikit-react/ChannelList";
// @ts-ignore
import SBChannelSettings from "@sendbird/uikit-react/ChannelSettings";
// @ts-ignore
import SBProvider from "@sendbird/uikit-react/SendbirdProvider";
const myColorSet = {
  "--sendbird-dark-primary-500": "#FFFFFF",
  "--sendbird-dark-primary-400": "#FFFFFF",
  "--sendbird-dark-primary-300": "#FFFFFF",
  "--sendbird-dark-primary-200": "#FFFFFF",
  "--sendbird-dark-primary-100": "#FFFFFF",
};

interface Props {
  user: User[];
}
const Chat = ({ user }: Props) => {
  const [showSettings, setShowSettings] = useState(true);
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");
  const [category, setCategory] = useState("");
  return (
    <div className="md:h-[86vh] overflow-y-hidden hidden lg:inline-flex overflow-hidden ml-1 px-0 top-0 py-0 w-full scrollbar-none scrollbar">
      {" "}
      <App userId={user[0].chatid} appId={APP_ID} theme="dark" />
    </div>
  );
};

export default Chat;
