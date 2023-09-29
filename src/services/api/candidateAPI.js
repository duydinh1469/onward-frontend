import request from "services/request";

const URL =
  process.env.REACT_APP_SERVER_DOMAIN ||
  process.env.REACT_APP_SERVER_DOMAIN_DEV;

const getCVService = () =>
  request(`${URL}/candidate/candidateCV`, {
    method: "GET",
  });

const favoriteJobService = (id) =>
  request(`${URL}/candidate/like`, {
    method: "POST",
    data: { jobId: id },
  });

const removeFavoriteJobService = (id) =>
  request(`${URL}/candidate/like`, {
    method: "DELETE",
    data: { jobId: id },
  });

const getAllFavoriteJobService = (filter) =>
  request(`${URL}/candidate/allLikes`, {
    method: "POST",
    data: filter,
  });

const applyJobService = (id) =>
  request(`${URL}/candidate/apply`, {
    method: "POST",
    data: { jobId: id },
  });

const getAllAppliedJobService = (filter) =>
  request(`${URL}/candidate/allApplied`, {
    method: "POST",
    data: filter,
  });

const reportJobService = (payload) =>
  request(`${URL}/candidate/report`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: payload,
  });

const followCompanyService = (id) =>
  request(`${URL}/candidate/follow`, {
    method: "POST",
    data: { companyId: id },
  });

const unFollowCompanyService = (id) =>
  request(`${URL}/candidate/follow`, {
    method: "DELETE",
    data: { companyId: id },
  });

const getAllFollowCompanyService = (filter) =>
  request(`${URL}/candidate/allFollow`, {
    method: "POST",
    data: filter,
  });

export {
  getCVService,
  favoriteJobService,
  removeFavoriteJobService,
  getAllFavoriteJobService,
  applyJobService,
  getAllAppliedJobService,
  reportJobService,
  followCompanyService,
  unFollowCompanyService,
  getAllFollowCompanyService,
};
