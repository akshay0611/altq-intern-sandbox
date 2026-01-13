import { ReviewRepository } from '../repositories/reviewRepository';
import { StylistRepository } from '../repositories/stylistRepository';
import { IReview } from '../models/Review';
import { Types } from 'mongoose';

export class ReviewService {
  private reviewRepository: ReviewRepository;
  private stylistRepository: StylistRepository;

  constructor() {
    this.reviewRepository = new ReviewRepository();
    this.stylistRepository = new StylistRepository();
  }

  async createReview(data: {
    visitId: string;
    stylistId: string;
    rating: number;
    tags?: string[];
    comment?: string;
    customerName?: string;
  }): Promise<IReview> {
    // Validate stylist exists
    const stylist = await this.stylistRepository.findById(data.stylistId);
    if (!stylist) {
      throw new Error('Stylist not found');
    }

    const review = await this.reviewRepository.create({
      visitId: data.visitId,
      stylistId: new Types.ObjectId(data.stylistId),
      rating: data.rating,
      tags: data.tags || [],
      comment: data.comment,
      customerName: data.customerName,
    });

    // Update stylist's average rating
    await this.updateStylistRating(data.stylistId);

    return review;
  }

  async updateStylistRating(stylistId: string): Promise<void> {
    const averageRating = await this.reviewRepository.getAverageRatingByStylist(stylistId);
    await this.stylistRepository.updateAverageRating(stylistId, averageRating);
  }

  async getDashboardStats() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const stats = await this.reviewRepository.getStatsForMonth(startOfMonth, endOfMonth);

    if (stats.length === 0) {
      return {
        totalReviews: 0,
        averageNetworkRating: 0,
        npsBreakdown: {
          promoters: 0,
          detractors: 0,
          passives: 0,
        },
      };
    }

    const stat = stats[0];
    const totalReviews = stat.totalReviews || 0;
    const promoters = stat.promoters || 0;
    const detractors = stat.detractors || 0;
    const passives = totalReviews - promoters - detractors;

    return {
      totalReviews,
      averageNetworkRating: Math.round((stat.averageRating || 0) * 10) / 10,
      npsBreakdown: {
        promoters,
        detractors,
        passives,
      },
    };
  }

  async getRecentReviews(limit: number = 10) {
    return this.reviewRepository.getRecentReviews(limit);
  }
}
