import request from "services/request";

const URL =
  process.env.REACT_APP_SERVER_DOMAIN ||
  process.env.REACT_APP_SERVER_DOMAIN_DEV;

const getAuthService = () => request(`${URL}/user/auth`, { method: "GET" });

const getUserProfileService = () =>
  request(`${URL}/user/profile`, { method: "GET" });

const updateUserProfileService = (payload) =>
  request(`${URL}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: payload,
  });

export { getAuthService, getUserProfileService, updateUserProfileService };
