import { StylistRepository } from '../repositories/stylistRepository';
import { ReviewRepository } from '../repositories/reviewRepository';
import { IStylist } from '../models/Stylist';

export class StylistService {
  private stylistRepository: StylistRepository;
  private reviewRepository: ReviewRepository;

  constructor() {
    this.stylistRepository = new StylistRepository();
    this.reviewRepository = new ReviewRepository();
  }

  async getAllActiveStylists(): Promise<Array<{ id: string; name: string; specialty: string; avatarUrl?: string }>> {
    const stylists = await this.stylistRepository.findAllActive();
    return stylists.map((stylist) => ({
      id: stylist._id.toString(),
      name: stylist.name,
      specialty: stylist.specialty,
      avatarUrl: stylist.avatarUrl,
    }));
  }

  async getStylistById(id: string): Promise<IStylist | null> {
    return this.stylistRepository.findById(id);
  }

  async getStylistPerformance(): Promise<Array<{
    id: string;
    name: string;
    specialty: string;
    avatarUrl?: string;
    averageRating: number;
  }>> {
    const stylists = await this.stylistRepository.findAllForPerformance();
    
    // Calculate average rating for each stylist
    const stylistsWithRatings = await Promise.all(
      stylists.map(async (stylist) => {
        const avgRating = await this.reviewRepository.getAverageRatingByStylist(stylist._id.toString());
        return {
          id: stylist._id.toString(),
          name: stylist.name,
          specialty: stylist.specialty,
          avatarUrl: stylist.avatarUrl,
          averageRating: avgRating || 0,
        };
      })
    );

    return stylistsWithRatings.sort((a, b) => b.averageRating - a.averageRating);
  }

  async updateStylistAverageRating(stylistId: string): Promise<void> {
    const averageRating = await this.reviewRepository.getAverageRatingByStylist(stylistId);
    await this.stylistRepository.updateAverageRating(stylistId, averageRating);
  }
}
