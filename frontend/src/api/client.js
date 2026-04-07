import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for global error handling (Change Resilience)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorData = error.response?.data || "An unexpected error occurred";
    return Promise.reject(errorData);
  }
);

export default apiClient;
