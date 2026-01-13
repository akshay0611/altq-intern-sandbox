import { Router } from 'express';
import { StylistController } from '../controllers/stylistController';
import { ReviewController } from '../controllers/reviewController';
import { validate } from '../middleware/validation';
import { createReviewSchema } from '../validators/reviewValidator';
import rateLimit from 'express-rate-limit';

const router = Router();
const stylistController = new StylistController();
const reviewController = new ReviewController();

// Rate limiting for review submission
const reviewRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many review submissions, please try again later.',
});

// GET /api/v1/public/stylists
router.get('/stylists', stylistController.getAllActiveStylists);

// POST /api/v1/public/reviews
router.post(
  '/reviews',
  reviewRateLimit,
  validate(createReviewSchema),
  reviewController.createReview
);

export default router;
