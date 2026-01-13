import mongoose, { Document, Schema, Types } from 'mongoose';

export type Sentiment = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';

export interface IReview extends Document {
  visitId: string;
  stylistId: Types.ObjectId;
  rating: number;
  sentiment?: Sentiment;
  tags?: string[];
  comment?: string;
  customerName?: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    visitId: {
      type: String,
      required: true,
      trim: true,
    },
    stylistId: {
      type: Schema.Types.ObjectId,
      ref: 'Stylist',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    sentiment: {
      type: String,
      enum: ['POSITIVE', 'NEUTRAL', 'NEGATIVE'],
    },
    tags: {
      type: [String],
      default: [],
    },
    comment: {
      type: String,
      maxlength: 500,
      trim: true,
    },
    customerName: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-calculate sentiment based on rating
ReviewSchema.pre('save', function (next) {
  if (this.rating >= 4) {
    this.sentiment = 'POSITIVE';
  } else if (this.rating === 3) {
    this.sentiment = 'NEUTRAL';
  } else {
    this.sentiment = 'NEGATIVE';
  }
  next();
});

export const Review = mongoose.model<IReview>('Review', ReviewSchema);
