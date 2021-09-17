import axios from 'axios';
export const baseURL = 'http://localhost:1468/';
// export const baseURL = 'https://settleqr-api.dedicateddevelopers.us/';

let axiosInstance = axios.create({ baseURL: baseURL });

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('auth_token');
    if (token !== null) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default axiosInstance;
