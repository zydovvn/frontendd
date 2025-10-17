import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
export default API; // (tuỳ chọn) để nơi khác có thể import default
