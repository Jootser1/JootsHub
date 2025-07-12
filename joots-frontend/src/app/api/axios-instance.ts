import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { getSession } from 'next-auth/react'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
})

console.log('NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL)

// Intercepteur pour ajouter le token de session Next-Auth
axiosInstance.interceptors.request.use(
  async config => {
    const session = await getSession()
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Intercepteur pour gérer le refresh token via Next-Auth
axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true

      try {
        // Next-Auth gère automatiquement le refresh token
        const session = await getSession()
        if (session?.accessToken) {
          originalRequest.headers.Authorization = `Bearer ${session.accessToken}`
          return axiosInstance(originalRequest)
        }
      } catch (refreshError) {
        // En cas d'échec du refresh, Next-Auth redirigera vers la page de login
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
