import { Router } from 'express';
import { StylistController } from '../controllers/stylistController';
import { ReviewController } from '../controllers/reviewController';

const router = Router();
const stylistController = new StylistController();
const reviewController = new ReviewController();

// GET /api/v1/admin/dashboard-stats
router.get('/dashboard-stats', reviewController.getDashboardStats);

// GET /api/v1/admin/stylist-performance
router.get('/stylist-performance', stylistController.getStylistPerformance);

export default router;
