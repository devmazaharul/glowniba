// components/ReadOnlyStars.tsx
import { FaStar } from 'react-icons/fa';
import { FaStarHalfStroke } from 'react-icons/fa6';

export default function Rating({
  rating,
  reviews,
}: {
  rating: number;
  reviews: number;
}) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars > 0.0;

  return (
    <div className="flex items-center w-fit mx-auto py-1 space-x-1">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <FaStar key={i} className={`${reviews==9999?'fill-yellow-400':' fill-gray-700'} w-3 h-3` } />
        ))}

      {hasHalfStar && <FaStarHalfStroke className="w-3 h-3 fill-gray-700" />}

      <span className="text-sm text-gray-600 text-center w-fit mx-auto ">
 
        {rating.toFixed(1)} {reviews!==9999 ? `(${reviews} reviews)` : ''}
      </span>


    </div>
  );
}
