import axios from "axios";
import { env } from "./enviroment-config";

export const Api = axios.create({
  baseURL: env.API_ENDPOINT_URL,
  timeout: 60000,
});

// Local API request interceptor
Api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Local API response interceptor
Api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject({
      message: error?.response?.data?.message || error?.response?.data,
    });
  }
);
