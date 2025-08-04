// lib/api.service.js
import axios from 'axios';

// Create a configured Axios instance
const apiClient = axios.create({
  baseURL: 'https://api.donplay.ir/api',
  headers: {
    'Content-Type': 'application/json',
    // You can add any default headers here
  },
});

// Response interceptor to handle the consistent response structure
apiClient.interceptors.response.use(
  (response) => {
    // Handle successful responses
    if (response.data.status === 'success') {
      return response.data.data; // Return only the data part
    }
    // Handle unexpected response structures
    return Promise.reject(new Error('Unexpected API response structure'));
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);

const ApiService = {
  // GET request
  get: async (endpoint, params = {}) => {
    try {
      return await apiClient.get(endpoint, { params });
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  },

  // POST request
  post: async (endpoint, data = {}) => {
    try {
      return await apiClient.post(endpoint, data);
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  },

  // PUT request
  put: async (endpoint, data = {}) => {
    try {
      return await apiClient.put(endpoint, data);
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  },

  // DELETE request
  delete: async (endpoint) => {
    try {
      return await apiClient.delete(endpoint);
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  },
};

export default ApiService;