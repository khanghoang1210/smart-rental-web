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
  const {
    selectedConversationId,
    selectedUserId,
    addMessage,
    setSelectedConversationId,
  } = useConversationStore();
  const { userInfo } = useAppStore();
  const [messages, setMessages] = useState<MessageRes[]>([]); // State để lưu các tin nhắn trong cuộc trò chuyện được chọn
  const socket = useSocket();
  const [cookies] = useCookies(["token"]);
  const [newMessage, setNewMessage] = useState("");
  const [senderUser, setSenderUser] = useState<UserInfo>();
  const messageService = new MessageService();
  const userService = new UserService();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generate a preview URL
    }
  };
  console.log(selectedImage);
  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCancelImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };
  useEffect(() => {
    const conversationService = new ConversationService();
    const handleFetch = async () => {
      try {
        const token = cookies.token;
        console.log(selectedUserId);

        if (selectedUserId) {
          const conversationRes =
            await conversationService.getConversationByUserId(
              token,
              selectedUserId
            );

          const conversationData = conversationRes.data.data;
          console.log(conversationData);

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

  const fetchUserTemp = async (userId: number) => {
    try {
      const token = cookies.token;
      const sender = await userService.getUserByID(userId, token);
      setSenderUser(sender.data.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

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
        rent_auto_content:
          msg.type === 2
            ? JSON.parse(msg.rent_auto_content as unknown as string)
            : undefined,
      }));
      parsedMessages.sort(
        (a: any, b: any) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      setMessages(parsedMessages);
      if (selectedUserId) {
        const sender = await userService.getUserByID(selectedUserId, token);
        setSenderUser(sender.data.data);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  console.log(selectedConversationId);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (message: MessageRes) => {
        console.log("Received message:", message);
        const parsedMessage = {
          ...message,
          rent_auto_content:
            message.type === 2
              ? JSON.parse(message.rent_auto_content as unknown as string)
              : undefined,
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
    if (!newMessage.trim() && !selectedImage) return;

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

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64File = reader.result?.toString().split(",")[1]; // Remove metadata
        const fileExtension = selectedImage.name.split('.').pop(); 

        socket?.emit("sendMessage", {
          sender_id: userInfo?.id,
          receiver_id: selectedUserId,
          conversation_id: conversationIdToUse,
          type: 3, // Type 3 for image
          file: {
            data: base64File, // Base64-encoded file
            mimeType: selectedImage.type, // e.g., "image/png"
            extension: `.${fileExtension}`, // e.g., ".png"
          },
          content: "", // Empty content for image messages
        }, (response: any) => {
          if (response.success) {
            console.log("Image sent successfully:", response.message);
            addMessage(response.message);
            setSelectedImage(null); // Clear file
            setImagePreview(null); // Clear preview
          } else {
            console.error("Failed to send image:", response.error);
          }
        });
      };

      reader.readAsDataURL(selectedImage); 
    } else {
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
    }
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
          src={senderUser?.avatar_url}
          alt=""
          className="w-10 h-10 object-cover rounded-full"
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
            ) : msg.type === 3 ? (
              <img
                src={msg.content}
                alt="Sent"
                className="max-w-xs rounded-lg"
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
      <div className="p-4 bg-white space-y-3">
        {/* Image Preview */}
        {imagePreview && (
          <div className="relative mb-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
            <button
              onClick={handleCancelImage}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
            >
              ✕
            </button>
          </div>
        )}
        <div className="flex items-center p-4 bg-white space-x-3">
          <button onClick={() => document.getElementById("fileInput")?.click()}>
            <img src={gallary} alt="" />
          </button>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileSelect}
          />
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
    </div>
  );
};

export default ChatBox;
