import { Review, IReview } from '../models/Review';
import { Types } from 'mongoose';

export class ReviewRepository {
  async create(data: Partial<IReview>): Promise<IReview> {
    const review = new Review(data);
    return review.save();
  }

  async findById(id: string): Promise<IReview | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return Review.findById(id).lean() as unknown as Promise<IReview | null>;
  }

  async findByStylistId(stylistId: string): Promise<IReview[]> {
    return Review.find({ stylistId: new Types.ObjectId(stylistId) })
      .sort({ createdAt: -1 })
      .lean() as unknown as Promise<IReview[]>;
  }

  async getStatsForMonth(startDate: Date, endDate: Date) {
    return Review.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          promoters: {
            $sum: { $cond: [{ $gte: ['$rating', 4] }, 1, 0] },
          },
          detractors: {
            $sum: { $cond: [{ $lte: ['$rating', 2] }, 1, 0] },
          },
        },
      },
    ]);
  }

  async getAverageRatingByStylist(stylistId: string): Promise<number> {
    const result = await Review.aggregate([
      {
        $match: {
          stylistId: new Types.ObjectId(stylistId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
        },
      },
    ]);

    return result.length > 0 ? Math.round(result[0].averageRating * 10) / 10 : 0;
  }

  async getRecentReviews(limit: number = 10): Promise<IReview[]> {
    return Review.find()
      .populate('stylistId', 'name specialty')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean() as unknown as Promise<IReview[]>;
  }
}
