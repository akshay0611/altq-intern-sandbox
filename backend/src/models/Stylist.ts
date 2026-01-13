import mongoose, { Document, Schema } from 'mongoose';

export interface IStylist extends Document {
  name: string;
  specialty: string;
  avatarUrl?: string;
  isActive: boolean;
  averageRating?: number;
  createdAt: Date;
}

const StylistSchema = new Schema<IStylist>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specialty: {
      type: String,
      required: true,
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Stylist = mongoose.model<IStylist>('Stylist', StylistSchema);
