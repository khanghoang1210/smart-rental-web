import { BILLING_ENDPOINT } from "@/utils/constants";
import { apiClient, isApiErrorResponse } from "../utils/apiClient";
import { CreateRentalRequestReq } from "@/models/chat/request";

export default class BillingtService {
  constructor() {}

  async createRentalRequest(token: string, req: CreateRentalRequestReq) {
    const url = BILLING_ENDPOINT;
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

  async getByMonth(token: string, month: number, year: number) {
    const url = BILLING_ENDPOINT + `/get-by-month/${year}/${month}`;
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
