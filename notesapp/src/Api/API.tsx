import axios from "axios";
const API = import.meta.env.VITE_Api;

const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export default api;