import api from '../config';

export interface ILoginData {
  username: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

export const authApi = {
  // 用戶登錄
  login: async (data: ILoginData): Promise<IAuthResponse> => {
    try {
      const response = await api.post<IAuthResponse>('/auth/login', data);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 用戶登出
  logout: async (): Promise<void> => {
    try {
      localStorage.removeItem('token');
    } catch (error) {
      throw error;
    }
  },

  // 獲取當前用戶信息
  getCurrentUser: async (): Promise<IAuthResponse['user']> => {
    try {
      const response = await api.get<{ data: IAuthResponse['user'] }>('/auth/me');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
}; 