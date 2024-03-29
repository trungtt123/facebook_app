import axios from "axios";
import { _getCache } from "../Services/Helper/common";
import { REST_API_URL } from '../Services/Helper/constant';
const instance = axios.create({
  baseURL: REST_API_URL,
  headers: {
    "Content-Type": "application/json",
  }
});
// Alter defaults after instance has been created
//Browser auto set withCredentials=false for security=> withCredentials=true to exchange cookie
// instance.defaults.withCredentials = true;
// fix cors header
// instance.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${localStorage.getItem("accessToken")}`;

// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    //Do something before request is sent
    const token = await _getCache("token");
    console.log('cache token', token);
    if (config.url.includes('?')){
      config.url += `&token=${token}`
    }
    else {
      config.url += `?token=${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response?.status || 500;
    // we can handle global errors here
    switch (status) {
      // authentication (token related issues)
      case 401: {
        //toast.error("Unauthorized the user.Please login... ");
        return error.response.data;
      }

      // forbidden (permission related issues)
      case 403: {
        //toast.error("You don't have permission to access this resource...");
        return Promise.reject(error);
      }

      // bad request
      case 400: {
        //toast.error("Something wrong from server");

        return Promise.reject(error);
      }

      // not found
      case 404: {
        //toast.error("Not found... ");

        return Promise.reject(error);
      }

      // conflict
      case 409: {
        return Promise.reject(error);
      }

      // unprocessable
      case 422: {
        return Promise.reject(error);
      }

      // generic api error (server related) unexpected
      default: {
        //toast.error("Something wrong... ");
        return Promise.reject(error);
      }
    }
  }
);
export default instance;
