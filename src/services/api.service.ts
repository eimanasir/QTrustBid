import { API_CONFIG, getAuthHeaders } from '@/config/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
}

interface ApiResponse<T> {
  access_token?: string;
  token_type?: string;
  user?: T;
  detail?: string;
}

export class ApiService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const headers = getAuthHeaders();

    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: response.statusText,
      }));
      throw new Error(error.detail || 'An error occurred');
    }

    return response.json();
  }

  // Auth endpoints
  static async login(credentials: LoginCredentials) {
    return this.request<ApiResponse<any>>(API_CONFIG.ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  static async signup(data: SignupData) {
    return this.request<ApiResponse<any>>(API_CONFIG.ENDPOINTS.SIGNUP, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async getMe() {
    return this.request<any>(API_CONFIG.ENDPOINTS.ME, {
      method: 'GET',
    });
  }

  static async logout() {
    return this.request<void>(API_CONFIG.ENDPOINTS.LOGOUT, {
      method: 'POST',
    });
  }

  // OAuth methods - Now fetch the auth_url from backend
  static async getGoogleLoginUrl(): Promise<string> {
    const response = await this.request<{ auth_url: string }>(API_CONFIG.ENDPOINTS.GOOGLE_LOGIN, {
      method: 'GET',
    });
    return response.auth_url;
  }

  static async getFacebookLoginUrl(): Promise<string> {
    const response = await this.request<{ auth_url: string }>(API_CONFIG.ENDPOINTS.FACEBOOK_LOGIN, {
      method: 'GET',
    });
    return response.auth_url;
  }
}