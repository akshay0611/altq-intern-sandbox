import api from '../config/api';
import { Stylist, StylistPerformance, CreateReviewInput, Review, DashboardStats } from '../types';

export const apiService = {
  // Public endpoints
  getStylists: async (): Promise<Stylist[]> => {
    const response = await api.get<Stylist[]>('/public/stylists');
    return response.data;
  },

  createReview: async (data: CreateReviewInput): Promise<Review> => {
    const response = await api.post<{ success: boolean; data: Review }>('/public/reviews', data);
    return response.data.data;
  },

  // Admin endpoints
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>('/admin/dashboard-stats');
    return response.data;
  },

  getStylistPerformance: async (): Promise<StylistPerformance[]> => {
    const response = await api.get<StylistPerformance[]>('/admin/stylist-performance');
    return response.data;
  },
};
