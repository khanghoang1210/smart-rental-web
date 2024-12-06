import { Input } from "antd";
import gallary from "../../assets/gallery.svg";
import send from "../../assets/send.svg";
import { useSocket } from "../../context/SocketContext";
import { useEffect, useRef, useState } from "react";
import { useAppStore, useConversationStore } from "@/store";
import MessageService from "@/services/MessageService";
import { useCookies } from "react-cookie";
import { MessageRes, MessageSend } from "@/models/chat/chat";
import UserService from "@/services/UserService";
import { UserInfo } from "@/store/slice/authSlice";
import MessageCard from "@/ui/MessageCard";
import ConversationService from "@/services/ConversationService";

const ChatBox = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { selectedConversationId, selectedUserId, addMessage, setSelectedConversationId } =
    useConversationStore();
  const { userInfo } = useAppStore();
  const [messages, setMessages] = useState<MessageRes[]>([]); // State để lưu các tin nhắn trong cuộc trò chuyện được chọn
  const socket = useSocket();
  const [cookies] = useCookies(["token"]);
  const [newMessage, setNewMessage] = useState("");
  const [senderUser, setSenderUser] = useState<UserInfo>();
  const messageService = new MessageService();
  const userService = new UserService();

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const conversationService = new ConversationService();
    const handleFetch = async () => {
      try {
        const token = cookies.token;
        console.log(selectedUserId)
  
        if (selectedUserId) {
          const conversationRes = await conversationService.getConversationByUserId(
            token,
            selectedUserId
            
          );
  
          const conversationData = conversationRes.data.data;
  
          if (conversationData && conversationData.length > 0) {
            fetchMessagesForConversation(conversationData[0].id);
          } else {
            // Nếu không, fetch thông tin tạm thời của user
            fetchUserTemp(selectedUserId);
          }
        } else if (selectedConversationId) {
          fetchMessagesForConversation(selectedConversationId);
        }
      } catch (error) {
        console.error("Error handling fetch:", error);
      }
    };
  
    handleFetch();
  }, [selectedConversationId, selectedUserId]);

  const fetchUserTemp = async(userId: number)=> {
    try{
      
      const token = cookies.token;
      const sender = await userService.getUserByID(userId, token);
      setSenderUser(sender.data.data);
      
    }
    catch (error) {
      console.error("Error fetching conversations:", error);
    }
  }

  const fetchMessagesForConversation = async (conversationId: number) => {
    try {
      const token = cookies.token;
      const messageRes = await messageService.getMessagesByConversation(
        conversationId,
        token
      );
      const data = messageRes.data.data;
      const parsedMessages = data.map((msg: MessageRes) => ({
        ...msg,
        rent_auto_content: msg.type === 2 ? JSON.parse(msg.rent_auto_content as unknown as string) : undefined,
      }));
      setMessages(parsedMessages);
      if (selectedUserId) {
        const sender = await userService.getUserByID(selectedUserId, token);
        setSenderUser(sender.data.data);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  console.log(senderUser)

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (message: MessageRes) => {
        const parsedMessage = {
          ...message,
          rent_auto_content: message.type === 2 ? JSON.parse(message.rent_auto_content as unknown as string) : undefined,
        };
  
        if (parsedMessage.conversation_id === selectedConversationId) {
          setMessages((prevMessages) => [...prevMessages, parsedMessage]);
  
          setTimeout(scrollToBottom, 100);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("receiveMessage");
      }
    };
  }, [socket, selectedConversationId]);

  const handleSendMessage = async () => {

    const conversationService = new ConversationService();
    if (!newMessage.trim()) return;

    let conversationIdToUse = selectedConversationId;
    if (!selectedConversationId && selectedUserId) {
      const response = await conversationService.createConversation(
        cookies.token,
        selectedUserId
      );
      conversationIdToUse = response.data.data; 
      
      setSelectedConversationId(conversationIdToUse);
    }
    setNewMessage(newMessage);
    socket?.emit("sendMessage", {
      sender_id: userInfo?.id,
      receiver_id: selectedUserId,
      conversation_id: conversationIdToUse,
      content: newMessage,
      type: 1,
    });

    const messageSend: MessageSend = {
      sender_id: userInfo?.id,
      receiver_id: selectedUserId!, // Ensure receiver_id is from the state
      content: newMessage,
      type: 1,
    };
    addMessage(messageSend);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
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
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender_id === userInfo?.id ? "justify-end" : "justify-start"
            } mb-2`}
            ref={index === messages.length - 1 ? scrollRef : null}
          >
            {msg.type === 2 ? ( 
              <MessageCard
                rentalRequestID={msg.rent_auto_content.rental_id}
                roomTitle={msg.rent_auto_content.room_title}
                roomAddress={msg.rent_auto_content.room_address}
                isSender={msg.sender_id === userInfo?.id ? true : false}
              />
            ) : (
              <div
                className={`px-3 py-2 rounded-xl max-w-xs ${
                  msg.sender_id === userInfo?.id
                    ? "bg-blue-60 text-[#FFF]"
                    : "bg-gray-90 text-gray-20"
                }`}
              >
                {msg.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 bg-white space-x-3">
        <button>
          <img src={gallary} alt="" />
        </button>
        <Input
          onKeyDown={handleKeyDown}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          id="newMessage"
          name="newMessage"
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
