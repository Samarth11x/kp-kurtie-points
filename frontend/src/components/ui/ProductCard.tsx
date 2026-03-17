import Link from 'next/link';
import { Heart, HeartOff } from 'lucide-react';
import { useWishlist } from '@/lib/wishlist';

interface ProductCardProps {
  _id?: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  image: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  sizes: string[];
}

export default function ProductCard({
  _id,
  slug,
  name,
  category,
  price,
  discountPrice,
  image,
  isBestSeller,
  isNewArrival,
  sizes,
}: ProductCardProps) {
  const { has, toggle } = useWishlist();
  const isWishlisted = _id ? has(_id) : false;

  const badge = isBestSeller ? 'Best Seller' : isNewArrival ? 'New Arrival' : null;
  const displayPrice = discountPrice && discountPrice > 0 ? discountPrice : price;
  const originalPrice = discountPrice && discountPrice > 0 && discountPrice < price ? price : null;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-[300px] sm:h-[350px] bg-[#f5f5f5] overflow-hidden">
        {badge && (
          <div className="absolute top-4 left-4 z-10 bg-[#881337] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            {badge}
          </div>
        )}

        <button
          onClick={() => _id && toggle(_id)}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-[#f43f5e] hover:bg-[#fdf2f8] transition-colors shadow-sm relative z-20"
        >
          {isWishlisted ? <Heart className="h-4 w-4 text-[#f43f5e]" /> : <HeartOff className="h-4 w-4" />}
        </button>

        {/* Real Image or Placeholder */}
        <Link href={`/product/${slug}`} className="block w-full h-full relative z-10">
          <div className="w-full h-full bg-[#ead6db] transition-transform duration-700 group-hover:scale-105 flex items-center justify-center text-[#881337] overflow-hidden">
            {image && image.startsWith('/') ? (
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>
            ) : (
              <span className="opacity-60">{name}</span>
            )}
          </div>
        </Link>

        <div className="absolute bottom-4 left-4 right-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 z-20">
          <Link
            href={`/product/${slug}`}
            className="w-full text-center bg-white/95 backdrop-blur-sm text-[#881337] font-semibold py-2.5 px-6 rounded-2xl shadow-md hover:bg-[#881337] hover:text-white transition-colors text-sm block"
          >
            View Details
          </Link>
        </div>
      </div>

      <div className="p-5">
        <Link href={`/product/${slug}`}>
          <h3 className="font-serif text-[17px] font-bold text-[#1c1917] mb-1 group-hover:text-[#f43f5e] transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        <p className="text-gray-500 text-xs mb-3 font-medium uppercase tracking-wider">{category}</p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-end space-x-2">
            <span className="font-bold text-[#881337] text-lg">₹{displayPrice}</span>
            {originalPrice && (
              <span className="text-gray-400 text-sm line-through mb-0.5">₹{originalPrice}</span>
            )}
          </div>

          <div className="flex space-x-1">
            {sizes.slice(0, 3).map((size) => (
              <span
                key={size}
                className="text-[10px] sm:text-xs font-medium border border-gray-200 text-gray-500 w-6 h-6 flex items-center justify-center rounded-md cursor-pointer hover:border-[#f43f5e] hover:text-[#f43f5e] transition-colors"
              >
                {size}
              </span>
            ))}
            {sizes.length > 3 && (
              <span className="text-[10px] text-gray-400 self-center ml-1">+{sizes.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
