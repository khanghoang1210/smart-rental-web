import { ROOM_ENDPOINT } from "@/utils/constants";
import {apiClient} from "../utils/apiClient";
import { CreateRoomForm } from "@/models/room";

export default class RoomService {
  constructor() {}

  async createRoom(token: string, req: CreateRoomForm) {
    const url = ROOM_ENDPOINT;
    try {
      const res = await apiClient.post(url, req, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

}