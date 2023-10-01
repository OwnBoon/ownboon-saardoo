import React, { useState } from "react";
// import SendbirdApp from "@sendbird/uikit-react/App";
import { User } from "../../typings";
import dynamic from "next/dynamic";

const Channels = dynamic(() => import('../Chat/Channels'), { ssr: false })
const GroupChannel = dynamic(() => import('../Chat/GroupChannel'), { ssr: false })
const OpenChannel = dynamic(() => import('../Chat/OpenChannel'), { ssr: false })


const APP_ID = "7FB154A3-C967-45D0-90B7-6A63E5F0E3EB";
const USER_ID = "astrosaard";
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

//@ts-ignore
import { ChannelListProvider } from '@sendbird/uikit-react/ChannelList/context';

//@ts-ignore
import { ChannelProvider } from '@sendbird/uikit-react/Channel/context';

//@ts-ignore
import { OpenChannelProvider } from '@sendbird/uikit-react/OpenChannel/context';


const Chat = ({ user }: Props) => {
  const [showSettings, setShowSettings] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");
  const [category, setCategory] = useState("");
  // const channelState = useChannelContext();
  // const { currentGroupChannel } = channelState;

  return (
    <div className="h-[86vh] overflow-hidden -ml-6 top-0 w-full scrollbar-none scrollbar">
      {" "}
      <SBProvider
        // ColorSet={myColorSet}
        theme="dark"
        appId={APP_ID}
        userId={user[0].chatid}
      >
        <div className="flex justify-between h-full w-full">
          <div className="w-fit">
            <SBChannelList
              allowProfileEdit
              onChannelSelect={(channel: any) => {
                if (channel && channel.url) {
                  setCurrentChannelUrl(channel.url);
                  setCategory(channel.url);
                }
              }}
            />
          </div>
          
          <div className="w-full">
            <SBConversation
              channelUrl={currentChannelUrl}
              onChatHeaderActionClick={() => {
                setShowSettings(true);
              }}
            />
          </div>

          {/* <ChannelListProvider channelUrl={currentChannelUrl}>
              <Channels/>
          </ChannelListProvider> */}

          {/* <ChannelProvider channelUrl={currentChannelUrl}>
            <GroupChannel/>
          </ChannelProvider> */}

          {/* <OpenChannelProvider channelUrl={currentChannelUrl}>
            <OpenChannel/>
          </OpenChannelProvider> */}
         
          {showSettings && (
            <div className="">
              <SBChannelSettings
                channelUrl={currentChannelUrl}
                onCloseClick={() => {
                  setShowSettings(false);
                }}
              />
            </div>
          )}


        </div>

      </SBProvider>
    </div>
  );
};

export default Chat;