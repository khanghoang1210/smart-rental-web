import { Input } from "antd";
import gallary from "../../assets/gallery.svg";
import send from "../../assets/send.svg";
import { useSocket } from "../../context/SocketContext";
import { useEffect, useState } from "react";
import { useAppStore, useConversationStore } from "@/store";
import MessageService from "@/services/MessageService";
import { useCookies } from "react-cookie";
import { MessageRes } from "@/models/chat/chat";
import UserService from "@/services/UserService";
import { UserInfo } from "@/store/slice/authSlice";


const ChatBox = () => {
  const { selectedConversationId, selectedUserId } = useConversationStore();
  const { userInfo } = useAppStore();
  const [messages, setMessages] = useState<MessageRes[]>([]); // State để lưu các tin nhắn trong cuộc trò chuyện được chọn
  const socket = useSocket();
  const [cookies] = useCookies(["token"]);
  const [newMessage, setNewMessage] = useState("");
  const [senderUser, setSenderUser] = useState<UserInfo>();
  const messageService = new MessageService();
  const userService = new UserService();

  useEffect(() => {
    if (socket) {
      console.log("Socket connected:", socket);
    } else {
      console.log("Socket is null or not connected");
    }
  }, [socket]);

  useEffect(() => {
    if (selectedConversationId) {
      fetchMessagesForConversation(selectedConversationId);
    }
  }, [selectedConversationId]);

  const fetchMessagesForConversation = async (conversationId:number) => {
    try {
      const token = cookies.token;
      const messageRes = await messageService.getMessagesByConversation(conversationId, token);
      setMessages(messageRes.data.data);
      if (selectedUserId) {
        const sender = await userService.getUserByID(selectedUserId, token);
        setSenderUser(sender.data.data)
      }
    }
    catch(error){
      console.error("Error fetching conversations:", error);
    }
  };

  const handleSendMessage = async () => {
    setNewMessage(newMessage);
    socket?.emit("sendMessage", {
      sender_id: userInfo?.id,
      receiver_id: selectedUserId,
      conversation_id: selectedConversationId,
      content: newMessage,
      type: 1,
    });
  };
  return (
    <div
      className="flex flex-col w-2/4 bg-gray-50"
      style={{ height: "calc(100vh - 70px)" }}
    >
      <div className="flex justify-start p-8 border-b border-gray-80 h-[80px] space-x-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFbfoE1_T9wLTh03pgANUPJ69psN0Zz2fvzQ&s"
          alt=""
          className="w-8 h-8"
        />
        <h1 className="font-semibold text-xl text-gray-20">
          {senderUser?.full_name}
        </h1>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender_id === userInfo?.id ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`p-4 rounded-xl max-w-xs ${
                msg.sender_id === userInfo?.id
                  ? "bg-blue-60 text-[#FFF]"
                  : "bg-gray-90 text-gray-20"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 bg-white space-x-3">
        <button>
          <img src={gallary} alt="" />
        </button>
        <Input
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          id="message"
          name="message"
          placeholder="Nhấn vào đây để chat"
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none"
          suffix={
            <button
              className="rounded-full w-7 h-7 items-center flex justify-center"
              onClick={handleSendMessage}
            >
              <img src={send} alt="Send Icon" />
            </button>
          }
        />
      </div>
    </div>
  );
};

export default ChatBox;
