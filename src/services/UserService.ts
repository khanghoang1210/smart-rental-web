import { apiClient, isApiErrorResponse } from "@/utils/apiClient";
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

  async getUserByID(id: number | undefined, token: string) {
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

  async getBankInfoByUser(token: string) {
    const url = USER_ENDPOINT + `/bank-info`;
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

  async updateUserInfo(token: string, req: FormData) {
    const url = USER_ENDPOINT;
    try {
      const res = await apiClient.put(url, req, {
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

  async updateUserBankInfo(token: string, req: any) {
    const url = USER_ENDPOINT + "/bank-info";
    try {
      const res = await apiClient.put(url, req, {
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
