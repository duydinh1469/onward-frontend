import axios from "axios";
import request from "services/request";
import { getCookie } from "utils/cookieUtils";

const URL =
  process.env.REACT_APP_SERVER_DOMAIN ||
  process.env.REACT_APP_SERVER_DOMAIN_DEV;

const companyScaleService = () =>
  axios.get(`${URL}/public/scale`).then((res) =>
    Object.values(res.data).map((item) => {
      return item === "MAX50"
        ? { label: "1 - 50", value: item }
        : item === "MAX100"
        ? { label: "50 - 100", value: item }
        : item === "MAX300"
        ? { label: "100 - 300", value: item }
        : item === "MAX500"
        ? { label: "300 - 500", value: item }
        : { label: "Over 500", value: item };
    })
  );

const cityService = (countryId) =>
  axios.post(`${URL}/public/cities`, countryId).then((res) => res.data);

const districtService = (cityId) =>
  axios.post(`${URL}/public/districts`, cityId).then((res) => res.data);

const jobTypeService = () =>
  axios.get(`${URL}/public/jobTypes`).then((res) => res.data);

const currencyService = () =>
  axios.get(`${URL}/public/currency`).then((res) => res.data);

const allJobsService = (filter) =>
  getCookie("token")
    ? request(`${URL}/public/allJobs`, { method: "POST", data: filter })
    : axios.post(`${URL}/public/allJobs`, filter);

const jobDetailService = (id) =>
  getCookie("token")
    ? request(`${URL}/public/job/${id}`, { method: "GET" })
    : axios.get(`${URL}/public/job/${id}`);

const companyDetailService = (id) =>
  getCookie("token")
    ? request(`${URL}/public/company/${id}`, { method: "GET" })
    : axios.get(`${URL}/public/company/${id}`);

const companyJobsService = (id, pageInfo) =>
  getCookie("token")
    ? request(`${URL}/public/company/${id}/allJobs`, {
        method: "POST",
        data: pageInfo,
      })
    : axios.post(`${URL}/public/company/${id}/allJobs`, pageInfo);

export {
  companyScaleService,
  cityService,
  districtService,
  jobTypeService,
  currencyService,
  allJobsService,
  jobDetailService,
  companyDetailService,
  companyJobsService,
};
