import { Stylist, IStylist } from '../models/Stylist';
import { Types } from 'mongoose';

export class StylistRepository {
  async findAllActive(): Promise<IStylist[]> {
    return Stylist.find({ isActive: true }).select('_id name specialty avatarUrl').lean() as unknown as Promise<IStylist[]>;
  }

  async findById(id: string): Promise<IStylist | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return Stylist.findById(id).lean() as unknown as Promise<IStylist | null>;
  }

  async create(data: Partial<IStylist>): Promise<IStylist> {
    const stylist = new Stylist(data);
    return stylist.save();
  }

  async updateAverageRating(stylistId: string, averageRating: number): Promise<void> {
    await Stylist.findByIdAndUpdate(stylistId, { averageRating });
  }

  async findAllForPerformance(): Promise<IStylist[]> {
    return Stylist.find({ isActive: true })
      .select('_id name specialty avatarUrl averageRating')
      .sort({ averageRating: -1 })
      .lean() as unknown as Promise<IStylist[]>;
  }
}
