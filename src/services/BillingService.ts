import { BILLING_ENDPOINT } from "@/utils/constants";
import { apiClient, isApiErrorResponse } from "../utils/apiClient";

export default class BillingService {
  constructor() {}

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

  async getByID(token: string, id: number) {
    const url = BILLING_ENDPOINT + `/${id}`;
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

  async getByStatus(token: string, status: number) {
    const url = BILLING_ENDPOINT + `/status/${status}`;
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

  async getIndex(token: string, year: number, month: number, type: string) {
    const url = BILLING_ENDPOINT + `/index/${year}/${month}/${type}`;
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

  async createBilling(token: string, req: any) {
    const url = BILLING_ENDPOINT + "/";
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

  async createIndex(token: string, req: any) {
    const url = BILLING_ENDPOINT + "/index";
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
}
