import axios from "axios";

export const strapiInstance = axios.create({
  baseURL: process.env.STRAPI_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

strapiInstance.interceptors.response.use((response) => response.data);
