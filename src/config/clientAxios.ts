import axios from "axios";

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

console.log(clientAxios);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
clientAxios.interceptors.request.use((config: any) => {
  config.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  console.log(config);
  return config;
});

export default clientAxios;
