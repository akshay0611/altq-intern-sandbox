import { Request, Response, NextFunction } from 'express';
import { StylistService } from '../services/stylistService';

export class StylistController {
  private stylistService: StylistService;

  constructor() {
    this.stylistService = new StylistService();
  }

  getAllActiveStylists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stylists = await this.stylistService.getAllActiveStylists();
      res.json(stylists);
    } catch (error) {
      next(error);
    }
  };

  getStylistPerformance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const performance = await this.stylistService.getStylistPerformance();
      res.json(performance);
    } catch (error) {
      next(error);
    }
  };
}
