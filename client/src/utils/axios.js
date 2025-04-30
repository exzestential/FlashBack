import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // backend URL
  withCredentials: true, // ⬅️ this is important for cookies
});

export default api;
