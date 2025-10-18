import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

let currentUserRole = null;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach X-User-Role header for authenticated requests
api.interceptors.request.use(
  async (config) => {
    // Don't send role header for login/logout requests
    if (currentUserRole && !config.url.includes('/auth/login') && !config.url.includes('/auth/logout')) {
      config.headers['X-User-Role'] = currentUserRole;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to set the current user role
export const setCurrentUserRole = (role) => {
  currentUserRole = role;
};

export default api;
