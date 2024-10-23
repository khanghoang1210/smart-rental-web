
import { LoginReq, RegisterReq } from "../models/auth"
import { API_URL, AUTH_ENDPOINT } from "../utils/constants";
import {apiClient} from "../utils/apiClient";

export default class AuthenService {
  constructor() {}

  async login(req: LoginReq) {
    const url = AUTH_ENDPOINT + "/login"
    try {
      const res = await apiClient.post(url, req)
      return res;
    } catch (error) {
      throw error;
    }
  }

  async signUp(req: RegisterReq) {
    try {
      const res = await fetch(API_URL , {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(req),
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });

      return res.json();
    } catch (error) {
      throw error;
    }
  }
}