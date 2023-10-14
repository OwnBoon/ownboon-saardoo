const ChannelPreview = ({ channel, onChannelSelect }: any) => {
  return (
    <div
      className="channel-preview-wrapper"
      onClick={() => onChannelSelect(channel)}
    >
      <img
        className="channel-preview-cover"
        width={45}
        src={channel.coverUrl}
        alt=""
      />
      <div>
        <div className="channel-preview-name">{channel.name}</div>
        <div className="channel-preview-last-message">
          {channel.lastMessage?.messageType === "file"
            ? channel.lastMessage.name
            : channel.lastMessage?.message}
        </div>
      </div>
      <div className="channel-preview-last-message-date">
        {new Intl.DateTimeFormat("en-us", {
          month: "short",
          day: "2-digit",
        }).format(channel.lastMessage?.createdAt)}
      </div>
    </div>
  );
};

export default ChannelPreview;
