import { ROOM_ENDPOINT } from "@/utils/constants";
import { apiClient, isApiErrorResponse } from "../utils/apiClient";

export default class RoomService {
  constructor() {}

  async createRoom(token: string, req: FormData) {
    const url = ROOM_ENDPOINT;
    try {
      const res = await apiClient.post(url, req, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
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

  async getAll(token: string) {
    const url = ROOM_ENDPOINT;
    try {
      const res = await apiClient.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  async getByID(token: string, id: number) {
    const url = ROOM_ENDPOINT + `/${id}`;
    try {
      const res = await apiClient.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
