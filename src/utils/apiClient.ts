import axios from "axios";
import { API_URL } from "./constants";

export interface ApiErrorResponse {
  errCode: number;
  message: string;
  data: unknown;
}

export function isApiErrorResponse(
  error: any
): error is { response: { data: ApiErrorResponse } } {
  return (
    error &&
    error.response &&
    error.response.data &&
    typeof error.response.data.errCode === "number"
  );
}

export const apiClient = axios.create({
  baseURL: API_URL,
});
