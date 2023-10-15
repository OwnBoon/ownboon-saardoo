import IconArrowLeft from "./icon-arrow-left.svg";
import "../../styles/chat-mobile.css";
const ChatHeader = ({ channel, user, onBack }: any) => (
  <div className="!custom-channel-header">
    <button onClick={onBack}>
      <img width={20} height={20} src={IconArrowLeft} alt="Back button" />
    </button>
    <span>{channel.name}</span>
    <span>{user.nickname}</span>
  </div>
);

export default ChatHeader;
