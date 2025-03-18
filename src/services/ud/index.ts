import axios from "axios";

export const udInstance = axios.create({
  baseURL: process.env.UD_API_URL,
  headers: {
    "Content-Type": "application/json",
    apiKey: process.env.UD_API_KEY,
  },
});

udInstance.interceptors.response.use((response) => response.data);
