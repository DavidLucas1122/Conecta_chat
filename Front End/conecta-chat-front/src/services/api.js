import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_RENDER,
});

// api.interceptors.request.use((config) => {
//   const token;
// });

export default api;
