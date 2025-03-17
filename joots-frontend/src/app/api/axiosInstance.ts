import axios from "axios";
import { store } from "@/app/store/store";
import { updateTokens } from '../store/userSlice';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any = null) => {
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
      const state = store.getState(); // Récupère l'état Redux
      const accessToken = state.user.accessToken;
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
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const state = store.getState();
      const refreshToken = state.user.refreshToken;

      if (!refreshToken) {
        processQueue(new Error('No refresh token'));
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const { access_token, refresh_token } = response.data;
        store.dispatch(updateTokens({ accessToken: access_token, refreshToken: refresh_token }));

        processQueue();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
