// @ts-ignore
import SBConversation from "@sendbird/uikit-react/Channel";
// @ts-ignore
import SBChannelList from "@sendbird/uikit-react/ChannelList";
// @ts-ignore
import SBChannelSettings from "@sendbird/uikit-react/ChannelSettings";
// @ts-ignore
import SBProvider from "@sendbird/uikit-react/SendbirdProvider";
import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChannelPreview from "./ChannelPreview";
import { User } from "../../typings";
// @ts-ignore
import Channel from "@sendbird/uikit-react/Channel";
const APP_ID = "7FB154A3-C967-45D0-90B7-6A63E5F0E3EB";
interface Props {
  user: User[];
}

export default function ChatMobile({ user }: Props) {
  const [channel, setChannel] = useState(null);

  const onChannelSelect = (_channel: any) => {
    setChannel(_channel);
  };

  const onBack = () => {
    setChannel(null);
  };

  return (
    <div className=" flex lg:hidden overflow-y-scroll p-2 md:p-4 md:pr-10 -ml-3 h-[62vh] md:h-[49vh] justify-center items-center w-screen">
      <SBProvider appId={APP_ID} userId={user[0].chatid}>
        {channel ? (
          <Channel
            //   @ts-ignore
            channelUrl={channel.url}
            renderChannelHeader={() => (
              <ChatHeader channel={channel} user={user} onBack={onBack} />
            )}
          />
        ) : (
          <SBChannelList
            renderChannelPreview={({ channel }: any) => (
              <ChannelPreview
                channel={channel}
                onChannelSelect={onChannelSelect}
              />
            )}
          />
        )}
      </SBProvider>
    </div>
  );
}
