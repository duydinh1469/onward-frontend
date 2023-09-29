import axios from "axios";

const URL =
  process.env.REACT_APP_SERVER_DOMAIN ||
  process.env.REACT_APP_SERVER_DOMAIN_DEV;

const loginService = (user) =>
  axios
    .post(`${URL}/auth`, user, { withCredentials: true })
    .then((res) => res.data);
const logoutService = () =>
  axios.post(`${URL}/auth/logout`, null, { withCredentials: true });
const refreshService = () =>
  axios.get(`${URL}/auth/refresh`, { withCredentials: true });

export { loginService, logoutService, refreshService };
