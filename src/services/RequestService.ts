import { RENTAL_REQUEST_ENDPOINT, RETURN_REQUEST_ENDPOINT } from "@/utils/constants";
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

  async getRentalRequestByID(token: string, id: number) {
    const url = RENTAL_REQUEST_ENDPOINT + `/${id}`;
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

  async getAllRentalRequest(token: string) {
    const url = RENTAL_REQUEST_ENDPOINT;
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

  async approveRentalRequest(token: string, id: number) {
    const url = RENTAL_REQUEST_ENDPOINT+ `/${id}/review?action=approve`
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

  async declineRentalRequest(token: string, id: number) {
    const url = RENTAL_REQUEST_ENDPOINT+ `/${id}/review?action=decline`
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
  async getReturnRequestByLandlordID(token: string, userID: number | undefined) {
    const url = RETURN_REQUEST_ENDPOINT + `/landlord/${userID}`;
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
