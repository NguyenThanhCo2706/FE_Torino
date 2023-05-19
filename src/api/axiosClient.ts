import axios from "axios";
import { BASE_URL } from "../constraint";
import { handleError } from "../utils";

console.log(process.env.BASE_URL);

const axiosClient = axios.create({
  baseURL: BASE_URL + "/api/1.0",
  headers: {
    "Content-Type": "application/json",
    "x-requestid": "593a8bfb-f53e-42ad-ae96-75e2ae803f1a",
    "x-apikey": "U2Nqgc3HNDyHG7263mxER9nHfhY7ssREfCUEDHM4PvKgt3Wj",
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
  }
});

axiosClient.interceptors.request.use((config) => {
  return config;
}, function (error) {
  return Promise.reject(error);
});


axiosClient.interceptors.response.use((response) => {
  return response.data;
}, function (error) {
  const message = handleError(error);
  return Promise.reject({ message: message });
});

export default axiosClient;
