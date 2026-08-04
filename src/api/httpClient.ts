import axios from "axios";

import { token } from "../lib/token";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const currentToken = token.retrieve();

    if (currentToken && config.headers) {
      config.headers.Authorization = `Bearer ${currentToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const isAuthPath =
        window.location.pathname.startsWith("/login") ||
        window.location.pathname.startsWith("/register");

      if (!isAuthPath) {
        token.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);
