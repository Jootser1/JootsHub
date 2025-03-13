import axios from "axios";
import { store } from "@/app/store/store";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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



export default axiosInstance;
