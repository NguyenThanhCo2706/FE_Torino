import axios from "axios";
import { handleError } from "../utils";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api/1.0",
  headers: {
    "Content-Type": "application/json",
    "x-requestid": "593a8bfb-f53e-42ad-ae96-75e2ae803f1a",
    "x-apikey": "U2Nqgc3HNDyHG7263mxER9nHfhY7ssREfCUEDHM4PvKgt3Wj",
  }
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});


axiosClient.interceptors.response.use((response) => {
  return response.data;
}, function (error) {
  const message = handleError(error);
  if (error.response.status === 401) {
    window.location.href = '/login';
  }
  return Promise.reject({ message: message });
});

export default axiosClient;
