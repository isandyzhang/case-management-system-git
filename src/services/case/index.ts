import api from '../config';
import { ICaseFormData, ICaseResponse, ICase } from '../../types/case';

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