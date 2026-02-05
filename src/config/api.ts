// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  ENDPOINTS: {
    // Auth endpoints
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    GOOGLE_LOGIN: '/auth/google',
    GOOGLE_CALLBACK: '/oauth/google/callback',
    FACEBOOK_LOGIN: '/auth/facebook/login',
    FACEBOOK_CALLBACK: '/oauth/facebook/callback',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    ME: '/auth/me',
  },
  STORAGE_KEYS: {
    ACCESS_TOKEN: 'access_token',
    USER: 'user',
  },
};

export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
  return token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    : {
        'Content-Type': 'application/json',
      };
};