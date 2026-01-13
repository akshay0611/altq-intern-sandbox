import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Stylist } from '../models/Stylist';
import { Review } from '../models/Review';
import { connectDatabase } from '../config/database';

dotenv.config();

const seedData = {
  stylists: [
    {
      name: 'Elena R.',
      specialty: 'Senior Hair Stylist',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      isActive: true,
    },
    {
      name: 'Michael T.',
      specialty: 'Colorist Expert',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      isActive: true,
    },
    {
      name: 'Sarah J.',
      specialty: 'Spa Therapist',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      isActive: true,
    },
    {
      name: 'David K.',
      specialty: 'Barber',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      isActive: true,
    },
    {
      name: 'Emma L.',
      specialty: 'Hair Color Specialist',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      isActive: true,
    },
    {
      name: 'James M.',
      specialty: 'Beard Stylist',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      isActive: true,
    },
    {
      name: 'Olivia N.',
      specialty: 'Hair Stylist',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
      isActive: true,
    },
    {
      name: 'Noah O.',
      specialty: 'Spa Therapist',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah',
      isActive: true,
    },
    {
      name: 'Sophia P.',
      specialty: 'Hair Stylist',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
      isActive: true,
    },
    {
      name: 'Liam Q.',
      specialty: 'Colorist Expert',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam',
      isActive: true,
    },
  ],
};

async function seed() {
  try {
    await connectDatabase();

    // Clear existing data
    await Stylist.deleteMany({});
    await Review.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Seed stylists
    const stylists = await Stylist.insertMany(seedData.stylists);
    console.log(`✅ Seeded ${stylists.length} stylists`);

    // Seed some sample reviews
    const sampleReviews = [
      {
        visitId: 'VISIT-1029',
        stylistId: stylists[0]._id,
        rating: 5,
        tags: ['Great Service', 'Friendly', 'Professional'],
        comment: 'Elena was amazing! Exactly the cut I wanted.',
        customerName: 'Alice W.',
      },
      {
        visitId: 'VISIT-1030',
        stylistId: stylists[1]._id,
        rating: 4,
        tags: ['Good Value'],
        comment: 'Color looks good but took a bit longer than expected.',
      },
      {
        visitId: 'VISIT-1031',
        stylistId: stylists[2]._id,
        rating: 5,
        tags: ['Relaxing', 'Hygiene'],
        comment: 'Best massage I\'ve had in months.',
        customerName: 'Raj P.',
      },
    ];

    await Review.insertMany(sampleReviews);
    console.log(`✅ Seeded ${sampleReviews.length} reviews`);

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();
