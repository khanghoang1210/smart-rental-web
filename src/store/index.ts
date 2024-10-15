import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthSlice, UserInfo } from "./slice/authSlice";
import { customStorage } from "@/utils/localStorage";
import { ChatSlice } from "./slice/chatSlice";


export const useConversationStore = create<ChatSlice>((set) => ({
  selectedConversationId: null, 
  setSelectedConversationId: (conversationId: number | null) =>
    set({ selectedConversationId: conversationId }), 

  selectedUserId: null,
  setSelectedUserId: (userId: number | null) =>
    set({ selectedUserId: userId }),

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
