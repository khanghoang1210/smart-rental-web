import { RATING_ENDPOINT } from "@/utils/constants";
import { apiClient, isApiErrorResponse } from "../utils/apiClient";

export default class RatingService {
  constructor() {}

  async createRoomRating(token: string, req: FormData) {
    const url = RATING_ENDPOINT + '/create-room-rating';
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

  async createTenantRating(token: string, req: FormData) {
    const url = RATING_ENDPOINT + '/create-tenant-rating';
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

  async createLandlordRating(token: string, req: any) {
    const url = RATING_ENDPOINT + '/create-landlord-rating';
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
