import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://cybermind-wbu4.onrender.com/api",
  // withCredentials: true,
});