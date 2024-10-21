import { MessageSend } from "@/models/chat/chat";

export interface ChatSlice {
  selectedConversationId: number | null;
  setSelectedConversationId: (conversationId: number | null) => void;
  selectedUserId: number | null;
  setSelectedUserId: (conversationId: number | null) => void;
  selectedChatMessages: MessageSend[];
  setSelectedChatMessages: (messages: MessageSend[]) => void;
  closeChat: () => void;
  addMessage: (message: MessageSend) => void;
}

