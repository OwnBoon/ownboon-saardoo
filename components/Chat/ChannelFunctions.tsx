import React, { useState } from "react";

//@ts-ignore
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";

//@ts-ignore
import withSendbird from "@sendbird/uikit-react/withSendbird";

//@ts-ignore
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";

//@ts-ignore
const ChannelFunctions = () => {
  const [channelUrl, setChannelUrl] = useState("");

  const globalStore = useSendbirdStateContext();
  const createChannel = sendbirdSelectors.getCreateGroupChannel(globalStore);
  const leaveChannel = sendbirdSelectors.getLeaveGroupChannel(globalStore);

  return (
    <>
      <button
        onClick={() => {
          // For TypeScript, use const params: GroupChannelCreateParams = {};
          const params = {};
          createChannel(params)
            //@ts-ignore
            .then((channel) => {
              setChannelUrl(channel.url);
            })
            //@ts-ignore
            .catch((error) => console.warn(error));
        }}
      >
        Create channel
      </button>
      <button
        onClick={() => {
          leaveChannel(channelUrl)
            .then(() => {
              setChannelUrl("");
            })
            //@ts-ignore
            .catch((error) => console.warn(error));
        }}
      >
        Leave channel
      </button>
      <br />
      {`Created channel is: ${channelUrl}`}
    </>
  );
};

export default ChannelFunctions;
