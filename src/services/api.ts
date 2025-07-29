// src/api.ts
// Use Vite's import.meta.env for environment variables
import axios from "axios";

// FIX: Corrected API_BASE_URL to match the backend's typical port and API prefix
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// FIX: Exported as backendApi for consistency with other slices (e.g., productsSlice)
export const backendApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies/sessions
});

// Request interceptor to add auth token
backendApi.interceptors.request.use( // Changed 'api' to 'backendApi'
    (config) => {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

// Response interceptor for error handling
backendApi.interceptors.response.use( // Changed 'api' to 'backendApi'
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
);

console.log('API Base URL:', API_BASE_URL); // For debugging

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    try {
      const response = await backendApi.post('/auth/login', credentials); // Changed 'api' to 'backendApi'
      const userData = response.data;

      // Store user data and token in localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      return userData;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  },

  signup: async (userData: SignupData): Promise<User> => {
    try {
      const response = await backendApi.post('/auth/register', userData); // Changed 'api' to 'backendApi'
      const user = response.data;

      // Store user data and token in localStorage
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(
          error.response?.data?.message ||
          error.response?.data?.error ||
          'Registration failed. Please try again.'
      );
    }
  },

  logout: () => {
    // Call the logout endpoint if needed
    // await backendApi.post('/auth/logout'); // Changed 'api' to 'backendApi'

    // Clear user data from localStorage
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null;

    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      const user = JSON.parse(userStr);

      // Check if token is expired if you have expiration logic
      // if (user.expiresAt && new Date(user.expiresAt) < new Date()) {
      //   localStorage.removeItem('user');
      //   return null;
      // }

      return user;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  },
};
