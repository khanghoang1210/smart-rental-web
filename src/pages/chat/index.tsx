import { useAppStore } from "@/store";
import ChatBox from "../../components/chat/Chatbox";
import MessageList from "../../components/chat/MessageList";
import UserDetail from "../../components/chat/UserDetail";
import Navbar from "../../components/home/Navbar";

const Chat = () => {
  const {userInfo} = useAppStore()
  alert(userInfo?.full_name)
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className=" flex flex-grow">
        <MessageList />
        <ChatBox />
        <UserDetail />
      </div>
    </div>
  );
};

export default Chat;
