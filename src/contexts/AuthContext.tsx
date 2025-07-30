import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';

interface AuthContextType {
  user: api.User | null;
  login: (credentials: api.LoginCredentials) => Promise<void>;
  signup: (userData: api.SignupData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<api.User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Debug logs
  console.log('AuthProvider - Current user state:', user);
  console.log('AuthProvider - Loading state:', loading);

  useEffect(() => {
    const checkAuth = async () => {
      console.log('AuthProvider - Checking authentication status');
      try {
        const currentUser = api.authService.getCurrentUser();
        console.log('AuthProvider - Retrieved user from storage:', currentUser);

        if (currentUser) {
          console.log('AuthProvider - User is authenticated');
          setUser(currentUser);
          localStorage.setItem('user', JSON.stringify(currentUser));
        } else {
          console.log('AuthProvider - No user found in storage');
        }
      } catch (error) {
        console.error('AuthProvider - Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Add isAuthenticated and isAdmin getters
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  const login = async (credentials: api.LoginCredentials) => {
    try {
      const userData = await api.authService.login(credentials);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirect based on role
      if (userData.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/home');
      }
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData: api.SignupData) => {
    try {
      const newUser = await api.authService.signup(userData);
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));

      // Redirect based on role
      if (newUser.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/home');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    api.authService.logout();
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated,
    isAdmin,
    loading,
  };

  console.log('AuthProvider - Providing context value:', value);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};