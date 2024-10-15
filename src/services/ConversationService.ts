


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

}