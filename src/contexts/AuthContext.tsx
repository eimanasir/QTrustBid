import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { ApiService } from '@/services/api.service';
import { API_CONFIG } from '@/config/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      try {
        const userData = await ApiService.getMe();
        setUser(userData);
      } catch (error) {
        // Token is invalid, clear it
        localStorage.removeItem(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(API_CONFIG.STORAGE_KEYS.USER);
      }
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await ApiService.login({ email, password });
      
      if (response.access_token && response.user) {
        localStorage.setItem(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
        localStorage.setItem(API_CONFIG.STORAGE_KEYS.USER, JSON.stringify(response.user));
        setUser(response.user);
      }
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await ApiService.signup({ email, password, name });
      
      if (response.access_token && response.user) {
        localStorage.setItem(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
        localStorage.setItem(API_CONFIG.STORAGE_KEYS.USER, JSON.stringify(response.user));
        setUser(response.user);
      }
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const googleLoginUrl = await ApiService.getGoogleLoginUrl();
      window.location.href = googleLoginUrl;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const loginWithFacebook = async () => {
    try {
      const facebookLoginUrl = await ApiService.getFacebookLoginUrl();
      window.location.href = facebookLoginUrl;
    } catch (error) {
      console.error('Facebook login error:', error);
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem(API_CONFIG.STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    }
  };

  const logout = async () => {
    try {
      await ApiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(API_CONFIG.STORAGE_KEYS.USER);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        signup,
        loginWithGoogle,
        loginWithFacebook,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};