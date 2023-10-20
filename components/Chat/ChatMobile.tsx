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
    <div className="h-full overflow-hidden w-screen flex justify-center -mx-2 lg:hidden xl:hidden">
      <SBProvider appId={APP_ID} userId={user[0].chatid}>
        <div className="flex  w-full">
          {channel ? (
            <div className="h-screen w-screen ">
              <Channel
                //   @ts-ignore
                channelUrl={channel.url}
                renderChannelHeader={() => (
                  <ChatHeader channel={channel} user={user} onBack={onBack} />
                )}
              />
            </div>
          ) : (
            <div className="h-screen flex justify-center w-full ">
              <SBChannelList
                renderChannelPreview={({ channel }: any) => (
                  <ChannelPreview
                    channel={channel}
                    onChannelSelect={onChannelSelect}
                  />
                )}
              />
            </div>
          )}
        </div>
      </SBProvider>
    </div>
  );
}
