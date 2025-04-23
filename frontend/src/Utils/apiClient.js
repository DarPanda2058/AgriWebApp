import axios from 'axios';
import { Navigate } from 'react-router';

const apiClient = axios.create();

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  } else {
    Navigate("/login");
  }
});

export default apiClient;
