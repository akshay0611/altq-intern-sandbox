import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const StarRating = ({ rating, onRatingChange, size = 'lg', interactive = true }: StarRatingProps) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const handleClick = (value: number) => {
    if (interactive) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (interactive) {
      setHoveredRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoveredRating(0);
    }
  };

  const displayRating = hoveredRating || rating;

  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => handleClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
          className={`${sizeClasses[size]} transition-transform ${
            interactive ? 'hover:scale-110 cursor-pointer' : 'cursor-default'
          }`}
          disabled={!interactive}
        >
          <Star
            className={`${sizeClasses[size]} ${
              value <= displayRating
                ? 'fill-primary-gold text-primary-gold'
                : 'fill-none text-border-gray'
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};
