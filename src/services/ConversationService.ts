


import { CONVERSATION_ENDPOINT } from "@/utils/constants";
import {apiClient} from "../utils/apiClient";

export default class ConversationService {
  constructor() {}

  async getConversationByCurrentUser(token: string) {
    const url = CONVERSATION_ENDPOINT + "/get-by-current-user";
    try {
      const res = await apiClient.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async createConversation(token: string, userID: number) {
    const url = CONVERSATION_ENDPOINT;
    try {
      const res = await apiClient.post(url, {user_b : userID}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getConversationByUserId(token: string, userID: number) {
    const url = CONVERSATION_ENDPOINT + `/user/${userID}`;
    try {
      const res = await apiClient.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }
}