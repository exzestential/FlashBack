import axios from "axios";

// Create base API instance
const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// Add a request interceptor to attach the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Log the error for debugging
    console.error("API Error:", error.response?.data || error.message);

    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access - redirecting to login");
      // You could redirect to login here or handle token refresh
    }

    return Promise.reject(error);
  }
);

export default api;
