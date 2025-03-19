import axios from "axios";

export const udInstance = axios.create({
  baseURL: process.env.UD_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
