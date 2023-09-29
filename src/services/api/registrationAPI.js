import axios from "axios";

const URL =
  process.env.REACT_APP_SERVER_DOMAIN ||
  process.env.REACT_APP_SERVER_DOMAIN_DEV;

const userRegisterService = (user) =>
  axios.post(`${URL}/register/user`, user).then((res) => res.data);
const companyRegisterService = (company) =>
  axios.post(`${URL}/register/company`, company).then((res) => res.data);

export { userRegisterService, companyRegisterService };
