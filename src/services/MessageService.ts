
import { MESSAGE_ENDPOINT } from "@/utils/constants";
import {apiClient} from "../utils/apiClient";

export default class MessageService {
  constructor() {}

  async getMessagesByConversation(id: number, token: string) {
    const url = MESSAGE_ENDPOINT + `/conversation/${id}`;
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