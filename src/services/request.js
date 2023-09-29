import axios from "axios";
import { getCookie } from "../utils/cookieUtils";

const request = axios.create({
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error) => {
  const { response = {} } = error;
  const { data, status, statusText } = response;
  throw new Error(data?.message, { cause: { status, statusText } });
};

request.interceptors.request.use((config) => {
  const token = getCookie("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

request.interceptors.response.use((response) => {
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
}, handleError);

export default request;
