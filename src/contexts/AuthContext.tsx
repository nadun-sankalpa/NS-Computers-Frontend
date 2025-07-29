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

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = api.authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials: api.LoginCredentials) => {
    try {
      const userData = await api.authService.login(credentials);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Redirect based on role
      if (userData.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
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
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    api.authService.logout();
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
