import { Input } from "antd";
import gallary from "../../assets/gallery.svg";
import send from "../../assets/send.svg";
import { useSocket } from "../../context/SocketContext";
import { useState } from "react";

const messages = [
  {
    id: 1,
    sender: "Florencio Dorrance",
    text: "How are you?",
    time: "12:45 PM",
    type: "received",
  },
  {
    id: 2,
    sender: "User",
    text: "I am good, thanks!",
    time: "12:46 PM",
    type: "sent",
  },
  {
    id: 3,
    sender: "Florencio Dorrance",
    text: "This is amazing!",
    time: "12:47 PM",
    type: "received",
  },
  {
    id: 4,
    sender: "User",
    text: "Wow, really?",
    time: "12:48 PM",
    type: "sent",
  },
  {
    id: 5,
    sender: "Florencio Dorrance",
    text: "Yes, this is epic!",
    time: "12:49 PM",
    type: "received",
  },
  {
    id: 6,
    sender: "User",
    text: "I love it! 🔥",
    time: "12:50 PM",
    type: "sent",
  },
  {
    id: 7,
    sender: "Florencio Dorrance",
    text: "Just ideas for next time.",
    time: "12:51 PM",
    type: "received",
  },
  {
    id: 8,
    sender: "User",
    text: "Sure, I will note them down.",
    time: "12:52 PM",
    type: "sent",
  },
  {
    id: 9,
    sender: "Florencio Dorrance",
    text: "See you soon!",
    time: "12:53 PM",
    type: "received",
  },
  {
    id: 10,
    sender: "User",
    text: "Okay, bye!",
    time: "12:54 PM",
    type: "sent",
  },
  {
    id: 11,
    sender: "Florencio Dorrance",
    text: "Bye!",
    time: "12:55 PM",
    type: "received",
  },
  // Thêm nhiều tin nhắn hơn để kiểm tra cuộn
  {
    id: 12,
    sender: "Florencio Dorrance",
    text: "How are you?",
    time: "12:56 PM",
    type: "received",
  },
  {
    id: 13,
    sender: "User",
    text: "I am good, thanks!",
    time: "12:57 PM",
    type: "sent",
  },
  {
    id: 14,
    sender: "Florencio Dorrance",
    text: "This is amazing!",
    time: "12:58 PM",
    type: "received",
  },
  {
    id: 15,
    sender: "User",
    text: "Wow, really?",
    time: "12:59 PM",
    type: "sent",
  },
  {
    id: 16,
    sender: "Florencio Dorrance",
    text: "Yes, this is epic!",
    time: "1:00 PM",
    type: "received",
  },
  {
    id: 17,
    sender: "User",
    text: "I love it! 🔥",
    time: "1:01 PM",
    type: "sent",
  },
  {
    id: 18,
    sender: "Florencio Dorrance",
    text: "Just ideas for next time.",
    time: "1:02 PM",
    type: "received",
  },
  {
    id: 19,
    sender: "User",
    text: "Sure, I will note them down.",
    time: "1:03 PM",
    type: "sent",
  },
  {
    id: 20,
    sender: "Florencio Dorrance",
    text: "See you soon!",
    time: "1:04 PM",
    type: "received",
  },
  { id: 21, sender: "User", text: "Okay, bye!", time: "1:05 PM", type: "sent" },
  {
    id: 22,
    sender: "Florencio Dorrance",
    text: "Bye!",
    time: "1:06 PM",
    type: "received",
  },
  {
    id: 23,
    sender: "Florencio Dorrance",
    text: "Hello again, just testing more.",
    time: "1:07 PM",
    type: "received",
  },
  {
    id: 24,
    sender: "User",
    text: "Testing the scroll.",
    time: "1:08 PM",
    type: "sent",
  },
  {
    id: 25,
    sender: "Florencio Dorrance",
    text: "It should scroll now!",
    time: "1:09 PM",
    type: "received",
  },
];

const ChatBox = () => {
  const [message, setMessage] = useState("")
  const socket = useSocket();

  const handleSendMessage = async () => {
    setMessage(message)
    socket?.emit("sendMessage", {
      senderId: 1,
      receiverId: 2,
      content: message,
      messageType: "text"
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
          Florencio Dorrance
        </h1>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.type === "sent" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`p-4 rounded-xl max-w-xs ${
                msg.type === "sent"
                  ? "bg-blue-60 text-[#FFF]"
                  : "bg-gray-90 text-gray-20"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 bg-white space-x-3">
        <button>
          <img src={gallary} alt="" />
        </button>
        <Input
          type="text"
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
