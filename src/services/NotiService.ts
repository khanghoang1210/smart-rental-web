import { NOTI_ENDPOINT } from "@/utils/constants";
import { apiClient, isApiErrorResponse } from "../utils/apiClient";

export default class NotiService {
  constructor() {}

  async getByCurrentUser(token: string) {
    const url = NOTI_ENDPOINT;
    try {
      const res = await apiClient.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (error) {
      if (isApiErrorResponse(error)) {
        const { message } = error.response.data;
        throw new Error(message);
      } else if (!navigator.onLine) {
        throw new Error("Vui lòng kiểm tra kết nối");
      } else {
        throw new Error("Lỗi hệ thống");
      }
    }
  }
}
