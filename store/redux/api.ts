// src/api/axiosInstance.js
import axios from "axios";
// import { logOut } from "../../helper";
let count = 1;
// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/", // Replace with your base URL
  timeout: 5000, // Optional: Timeout for requests (in ms)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before the request is sent, e.g., add auth token
    return config;
  },
  (error) => {
    // Do something with request error
    return error;
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  (error) => {
    // Handle Unauthorized access, e.g., redirect to login
    if (error.response && error.response.status === 401) {
      if (count === 1) {
        // logOut();
        alert("UnAuthorized 401 !!!");
        count++;
      }
      return Promise.reject(error);
    }
    return error.response.data;
  }
);

export default axiosInstance;
