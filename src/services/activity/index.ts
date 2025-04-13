import api from '../config';

export interface IActivity {
  id: string;
  caseId: string;
  type: string;
  description: string;
  createdAt: string;
  createdBy: string;
}

export interface IActivityResponse {
  success: boolean;
  message: string;
  data?: IActivity;
}

export const activityApi = {
  // 創建活動記錄
  create: async (data: Omit<IActivity, 'id' | 'createdAt' | 'createdBy'>): Promise<IActivityResponse> => {
    try {
      const response = await api.post<IActivityResponse>('/activities', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 獲取個案的所有活動記錄
  getByCaseId: async (caseId: string): Promise<IActivity[]> => {
    try {
      const response = await api.get<{ data: IActivity[] }>(`/activities/case/${caseId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // 更新活動記錄
  update: async (id: string, data: Partial<IActivity>): Promise<IActivityResponse> => {
    try {
      const response = await api.put<IActivityResponse>(`/activities/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 刪除活動記錄
  delete: async (id: string): Promise<IActivityResponse> => {
    try {
      const response = await api.delete<IActivityResponse>(`/activities/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}; 