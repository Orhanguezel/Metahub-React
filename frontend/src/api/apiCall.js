// src/api/apiCall.js
import API from "./api";

const apiCall = async (
  method,
  url,
  data = null,
  rejectWithValue,
  config = {}
) => {
  try {
    console.log(`📡 API CALL → [${method.toUpperCase()}] ${url}`);
    if (data) console.log("📤 Request Payload:", data);

    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;

    const finalConfig = {
      ...config,
      withCredentials: true,
      headers: {
        ...(config?.headers || {}),
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    };

    const response =
      method === "get"
        ? await API.get(url, { ...finalConfig, params: data })
        : await API[method](url, data, finalConfig);

    console.log(`✅ API Response [${method.toUpperCase()} ${url}]:`, response.data);
    return response.data;
  } catch (error) {
    const status = error?.response?.status || "Unknown";
    const errorData = error?.response?.data ?? {};
    const message =
      errorData?.message ||
      errorData?.errors?.[Object.keys(errorData.errors || {})[0]]?.message ||
      error?.message ||
      "Something went wrong!";

    if (error?.response) {
      const { status, data, config } = error.response;
      console.error("❌ API Error Details:", {
        url: config?.url || "Unknown URL",
        status,
        data,
      });
    }

    return rejectWithValue({ status, message, data: errorData });
  }
};

export default apiCall;
