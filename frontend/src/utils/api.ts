import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export const makeApi = <T>(config: AxiosRequestConfig): Promise<T> => {
  return api
    .request<T>(config)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
