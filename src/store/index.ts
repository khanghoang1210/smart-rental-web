import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthSlice, UserInfo } from "./slice/authSlice";
import { customStorage } from "@/utils/localStorage";

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
