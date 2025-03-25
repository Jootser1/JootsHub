import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useStore } from "@/app/store/store";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface QueueItem {
  resolve: (value?: unknown) => void
  reject: (reason?: Error) => void
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: Error | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Intercepteur pour ajouter dynamiquement le token avant chaque requête
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const accessToken = useStore.getState().user?.accessToken ?? null;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = useStore.getState().user?.refreshToken;

      if (!refreshToken) {
        processQueue(new Error('No refresh token'));
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const { access_token, refresh_token } = response.data;
        useStore.getState().updateTokens({ 
          accessToken: access_token, 
          refreshToken: refresh_token 
        });

        processQueue();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
