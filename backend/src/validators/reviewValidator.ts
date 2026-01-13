import { z } from 'zod';
import { Types } from 'mongoose';

export const createReviewSchema = z.object({
  visitId: z.string().min(1, 'Visit ID is required'),
  stylistId: z.string().refine(
    (id) => Types.ObjectId.isValid(id),
    'Invalid stylist ID format'
  ),
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  tags: z.array(z.string()).optional(),
  comment: z.string().max(500, 'Comment must be at most 500 characters').optional(),
  customerName: z.string().optional(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
