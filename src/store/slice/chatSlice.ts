export interface ChatSlice {
    selectedConversationId: number | null;
    setSelectedConversationId: (conversationId: number | null) => void;
    selectedUserId: number | null;
    setSelectedUserId: (conversationId: number | null) => void;
  }
  