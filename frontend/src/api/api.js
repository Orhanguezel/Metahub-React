// src/api/api.js

import axios from "axios";

// Vite için doğru env değişken okuma
const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL;

if (!API_BASE_URL) {
  console.warn("⚠️ Environment variable 'VITE_API_URL' or 'REACT_APP_API_URL' is not defined!");
}

// Base Axios instance
const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// 🔑 API Key storage (initially null)
let apiKey = null;

// 🔐 Setter function: Call from your settings or anywhere you get/set the API key
export const setApiKey = (key) => {
  apiKey = key;
  console.log("✅ API key set:", key);
};

// 🛡️ Automatically attach API Key to every request (if set)
API.interceptors.request.use((config) => {
  if (apiKey) {
    config.headers["X-API-KEY"] = apiKey;
  }
  return config;
});

// 🔄 Global response interceptor (unchanged logic)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      console.warn("🚪 Unauthorized request – not authorized (silent).");
      // Optionally, you can add global logout or redirect logic here
    }

    return Promise.reject(error);
  }
);

export default API;
