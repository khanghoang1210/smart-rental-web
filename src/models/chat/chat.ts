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
    content?: string;
    rent_auto_content: RentalAutoContent;
    created_at: Date;
}

export type MessageSend = {
    sender_id: number | undefined;
    receiver_id: number;
    content: string;
    type: number;
}

export type RentalAutoContent = {
    rental_id: number;
    room_title: string;
    room_address: string;
}