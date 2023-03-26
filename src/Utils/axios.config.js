import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_HOST,
  // baseURL: "http://3.110.70.229:3001",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default api;
