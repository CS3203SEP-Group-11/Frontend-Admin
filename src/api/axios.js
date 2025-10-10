import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Dev convenience: optionally send admin role header to backend for testing only
if (import.meta.env.VITE_ADMIN_DEV_ROLE) {
  api.interceptors.request.use((config) => {
    config.headers = {
      ...config.headers,
      'X-User-Role': import.meta.env.VITE_ADMIN_DEV_ROLE,
    };
    return config;
  });
}

export default api;
