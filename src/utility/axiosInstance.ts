import axios from 'axios';

// Base API URL
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Create an Axios instance
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

// Request Interceptor - Attach Access Token
API.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default API;
