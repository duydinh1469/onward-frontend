import request from "services/request";

const URL =
  process.env.REACT_APP_SERVER_DOMAIN ||
  process.env.REACT_APP_SERVER_DOMAIN_DEV;

const getCompanyProfileService = () =>
  request(`${URL}/company/profile`, { method: "GET" });

const updateCompanyProfileService = (payload) =>
  request(`${URL}/company/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: payload,
  });

const attendanceService = () =>
  request(`${URL}/company/attendance`, { method: "POST" });

export {
  getCompanyProfileService,
  updateCompanyProfileService,
  attendanceService,
};
