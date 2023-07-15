import axios, { AxiosResponse, AxiosError } from "axios";

export * from "./admin";
export * from "./auth";
export * from "./post";
export * from "./report";
export * from "./stock";
export * from "./user";

//export const baseURL = "http://35.236.159.81:3000/api"
export const baseURL = "http://localhost:5000/api";

// middleware
export const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // add bearer header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);

// fetch type
axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error: AxiosError) {
    if (error.response) {
      const response: AxiosResponse = error.response;

      throw new Error(response.data.message, { cause: response });
    }
  },
);
