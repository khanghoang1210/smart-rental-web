import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthSlice, UserInfo } from "./slice/authSlice";
import { customStorage } from "@/utils/localStorage";
import { ChatSlice } from "./slice/chatSlice";
import { MessageSend } from "@/models/chat/chat";


export const useConversationStore = create<ChatSlice>((set, get) => ({
  selectedConversationId: null, 
  setSelectedConversationId: (conversationId: number | null) =>
    set({ selectedConversationId: conversationId }), 

  selectedUserId: null,
  setSelectedUserId: (userId: number | null) =>
    set({ selectedUserId: userId }),
  selectedChatMessages: [],
  setSelectedChatMessages: (messages: MessageSend[]) =>
    set({ selectedChatMessages: messages }),

  closeChat: () => set({ selectedChatMessages: [] }),

  addMessage: (message: MessageSend) => {
    const selectedChatMessages = get().selectedChatMessages;
    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          receiver_id: message.receiver_id,
          sender_id: message.sender_id,
        }
      ]
    });
  },
}));


export const useAppStore = create(
  persist<AuthSlice>(
    (set) => ({
      userInfo: undefined,
      setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
    }),
    {
      name: "currentUser",
      storage: customStorage,
    }
  )
);
