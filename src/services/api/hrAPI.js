import request from "services/request";

const URL =
  process.env.REACT_APP_SERVER_DOMAIN ||
  process.env.REACT_APP_SERVER_DOMAIN_DEV;

const createJobService = (payload) =>
  request(`${URL}/hr/job`, {
    method: "POST",
    data: payload,
  });

const getCompanyListJobsService = (payload) =>
  request(`${URL}/hr/allJobs`, {
    method: "POST",
    data: payload,
  });

const getCompanyJobDetailService = (jobId) =>
  request(`${URL}/hr/job/${jobId}`, {
    method: "GET",
  });

const updateCompanyJobDetailService = (jobId, payload) =>
  request(`${URL}/hr/job/${jobId}`, {
    method: "PUT",
    data: payload,
  });

const deleteCompanyJobService = (jobId) =>
  request(`${URL}/hr/job/${jobId}`, {
    method: "DELETE",
  });

const updateCompanyJobVisibleService = (jobId, payload) =>
  request(`${URL}/hr/job/${jobId}/visible`, {
    method: "PATCH",
    data: payload,
  });

const getJobCandidateService = (jobId, payload) =>
  request(`${URL}/hr/candidate/job/${jobId}`, {
    method: "POST",
    data: payload,
  });

const getHrCompanyGeneralProfile = () =>
  request(`${URL}/hr/company/profile`, {
    method: "GET",
  });

const getHrCompanyPoints = () =>
  request(`${URL}/hr/company/points`, {
    method: "GET",
  });

export {
  createJobService,
  getCompanyListJobsService,
  getCompanyJobDetailService,
  updateCompanyJobDetailService,
  deleteCompanyJobService,
  updateCompanyJobVisibleService,
  getJobCandidateService,
  getHrCompanyGeneralProfile,
  getHrCompanyPoints,
};
