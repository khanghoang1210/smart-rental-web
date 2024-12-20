import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../utils/constants";
import { useAppStore, useConversationStore } from "@/store";
import { MessageSend } from "@/models/chat/chat";

type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useRef<Socket | null>(null);
  const { userInfo } = useAppStore();
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null); // State to track socket instance

  useEffect(() => {
    if (userInfo) {
      socket.current = io(SOCKET_URL, {
        query: { userID: userInfo.id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      setSocketInstance(socket.current); // Update state to ensure context has the socket instance

      const handleReceiveMessage = (message: MessageSend) => {
        const { selectedUserId, addMessage } = useConversationStore.getState();
        if (
          selectedUserId === message.sender_id ||
          selectedUserId === message.receiver_id
        ) {
          addMessage(message)
        }
      };

      socket.current.on("receiveMessage", handleReceiveMessage);

      return () => {
        if (socket.current) {
          socket.current.disconnect();
        }
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};
