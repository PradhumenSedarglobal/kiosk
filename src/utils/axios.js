import axios from "axios";
// config
import { HOST_API_KEY } from "@/config-global";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API_KEY,
  headers: {
    "Content-type":
      "application/x-www-form-urlencoded;multipart/form-data; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With",
    "Access-Control-Allow-Methods": "GET, POST, PUT",
    Accept: "multipart/form-data",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error?.response?.data
        ? error?.response?.data
        : error) || "Something went wrong"
    )
);

export default axiosInstance;
