import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY; 

console.log("👉 API_BASE_URL:", API_BASE_URL);
if (!API_BASE_URL) {
  console.warn("Environment variable 'VITE_API_URL' is not defined.");
}

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let apiKey = API_KEY || null;

export const setApiKey = (key) => {
  apiKey = key;
  console.log("✅ API key set:", key);
};


API.interceptors.request.use((config) => {
  if (apiKey) {
    config.headers["x-api-key"] = apiKey;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("🚪 Unauthorized request – invalid or expired token.");
    }
    return Promise.reject(error);
  }
);

export default API;
