import { PAYMENT_ENDPOINT } from "@/utils/constants";
import { apiClient, isApiErrorResponse } from "../utils/apiClient";

export default class PaymentService {
  constructor() {}

  async getAllBanks(token: string) {
    const url = PAYMENT_ENDPOINT + "/banks";
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

  async getById(token: string, id: number | undefined) {
    const url = PAYMENT_ENDPOINT + `/${id}`;
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

  async getAll(token: string) {
    const url = PAYMENT_ENDPOINT;
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

  async getDetailInfo(token: string, type: string, id: number | undefined) {
    const url = PAYMENT_ENDPOINT + `/detail-info?type=${type}&id=${id}`;
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

  async confirmPayment(token: string, id: number | undefined) {
    const url = PAYMENT_ENDPOINT + `/${id}`;
    try {
      const res = await apiClient.put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  async createPayment(token: string, req: FormData) {
    const url = PAYMENT_ENDPOINT;
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
}
