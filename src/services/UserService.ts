import { apiClient } from "@/utils/apiClient";
import { USER_ENDPOINT } from "@/utils/constants";

export default class UserService {
  constructor() {}

  async getCurrentUser(token: string) {
    const url = USER_ENDPOINT + "/current-user";
    try {
      const res = await apiClient.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getUserByID(id: number, token: string) {
    const url = USER_ENDPOINT + `/${id}`;
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
