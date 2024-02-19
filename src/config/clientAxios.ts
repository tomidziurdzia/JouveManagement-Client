import axios from "axios";

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
clientAxios.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  return config;
});

export default clientAxios;
