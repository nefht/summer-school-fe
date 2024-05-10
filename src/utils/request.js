import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10 * 60 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('authData'))?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default request;
