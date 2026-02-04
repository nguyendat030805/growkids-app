import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestConfig } from "axios";

import { STORAGE_KEYS } from "../constants";

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem(
          STORAGE_KEYS.REFRESH_TOKEN,
        );

        const res = await axios.post(
          `${process.env.API_BASE_URL}/auth/refresh`,
          {
            refreshToken,
          },
        );

        const newAccessToken = res.data.accessToken;

        await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return apiClient(originalRequest);
      } catch (e) {
        await AsyncStorage.multiRemove([
          STORAGE_KEYS.ACCESS_TOKEN,
          STORAGE_KEYS.REFRESH_TOKEN,
        ]);
        return Promise.reject(
          new Error("Authentication failed. Please login again."),
        );
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
