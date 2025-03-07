import axios from "axios";
// config

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_HF,
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
