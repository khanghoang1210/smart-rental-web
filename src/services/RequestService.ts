import { RENTAL_REQUEST_ENDPOINT } from "@/utils/constants";
import { apiClient, isApiErrorResponse } from "../utils/apiClient";
import { CreateRentalRequestReq } from "@/models/chat/request";

export default class RequestService {
  constructor() {}

  async createRentalRequest(token: string, req: CreateRentalRequestReq) {
    const url = RENTAL_REQUEST_ENDPOINT;
    try {
      const res = await apiClient.post(url, req, {
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

  async getRentalRequestByRoomID(token: string, roomId: number) {
    const url = RENTAL_REQUEST_ENDPOINT + `/room/${roomId}`;
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
