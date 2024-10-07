import { createContext, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { HOST } from "../utils/constants";

type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useRef<Socket | undefined>(undefined);
  const userInfo = 1;

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        query: { userID: userInfo.toString() },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      // const handleReceiveMessage = (message) => {
      //   const { selectedChatData, selectedChatType } = undefined;

      //   if (selectedChatType != undefined) {
      //   }
      // };

      return () => {
        if (socket.current) {
          socket.current.disconnect();
        }
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current || null}>
      {children}
    </SocketContext.Provider>
  );
};
