import { Request, Response, NextFunction } from 'express';
import { ReviewService } from '../services/reviewService';

export class ReviewController {
  private reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }

  createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await this.reviewService.createReview(req.body);
      res.status(201).json({
        success: true,
        data: review,
      });
    } catch (error) {
      next(error);
    }
  };

  getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await this.reviewService.getDashboardStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  };

  getRecentReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const reviews = await this.reviewService.getRecentReviews(limit);
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  };
}
