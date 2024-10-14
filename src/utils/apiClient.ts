import axios from "axios";
import { Constants } from "./constants";

export const apiClient = axios.create({
    baseURL: Constants.API_URL
})