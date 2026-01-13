export interface Stylist {
  id: string;
  name: string;
  specialty: string;
  avatarUrl?: string;
}

export interface StylistPerformance extends Stylist {
  averageRating: number;
}

export interface Review {
  _id: string;
  visitId: string;
  stylistId: string;
  rating: number;
  sentiment?: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  tags?: string[];
  comment?: string;
  customerName?: string;
  createdAt: string;
}

export interface CreateReviewInput {
  visitId: string;
  stylistId: string;
  rating: number;
  tags?: string[];
  comment?: string;
  customerName?: string;
}

export interface DashboardStats {
  totalReviews: number;
  averageNetworkRating: number;
  npsBreakdown: {
    promoters: number;
    detractors: number;
    passives: number;
  };
}

// Explicit export to ensure Vite recognizes it
export { CreateReviewInput };
