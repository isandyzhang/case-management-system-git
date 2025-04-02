import axios from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import { ICaseFormData, ICaseResponse, ICase } from '../types/case';

// Azure Web App API 基礎 URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

// 創建 axios 實例
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API 請求攔截器
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 這裡可以添加 token 等認證信息
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

// API 響應攔截器
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: Error) => {
    // 這裡可以統一處理錯誤
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// 個案相關 API
export const caseApi = {
  // 創建新個案
  create: async (data: ICaseFormData): Promise<ICaseResponse> => {
    try {
      const response = await api.post<ICaseResponse>('/cases', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 獲取個案列表
  getAll: async (): Promise<ICase[]> => {
    try {
      const response = await api.get<{ data: ICase[] }>('/cases');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // 獲取單個個案詳情
  getById: async (id: string): Promise<ICase> => {
    try {
      const response = await api.get<{ data: ICase }>(`/cases/${id}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // 更新個案信息
  update: async (id: string, data: Partial<ICaseFormData>): Promise<ICaseResponse> => {
    try {
      const response = await api.put<ICaseResponse>(`/cases/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 刪除個案
  delete: async (id: string): Promise<ICaseResponse> => {
    try {
      const response = await api.delete<ICaseResponse>(`/cases/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api; 