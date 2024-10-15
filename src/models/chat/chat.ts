export type ConversationRes = {
    id: number;
    user_a: number;
    user_b:number;
    last_message: MessageRes;
}

export type MessageRes = {
    id: number;
    conversation_id: number;
    sender_id: number;
    type: number;
    content: string;
    created_at: Date;
}