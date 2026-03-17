'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWishlist } from '@/lib/wishlist';
import ProductCard from '@/components/ui/ProductCard';
import { API_BASE, fetchJson } from '@/lib/api';
import { Heart, Loader2 } from 'lucide-react';

type Product = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  discountPrice?: number;
  image: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  sizes: string[];
};

export default function WishlistPage() {
  const { list, clear } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWishlist = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await fetchJson(`${API_BASE}/api/products`);
        const allProducts: Product[] = data.products || [];
        const wishProducts = allProducts.filter((p) => list.includes(p._id));
        setProducts(wishProducts);
      } catch (err: any) {
        setError(err?.message ?? 'Failed to load wishlist');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (list.length) {
      loadWishlist();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [list]);

  return (
    <div className="py-16 bg-[#fdf2f8] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h1 className="font-serif text-4xl font-bold text-[#1c1917]">Your Wishlist</h1>
            <p className="text-gray-500 mt-2">Saved items will appear here. Tap the heart icon to remove them from your wishlist.</p>
          </div>
          {list.length > 0 && (
            <button
              onClick={clear}
              className="mt-6 sm:mt-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#881337] text-[#881337] font-semibold hover:bg-[#881337] hover:text-white transition-colors"
            >
              <Heart className="h-5 w-5" /> Clear wishlist
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-10 w-10 animate-spin text-[#881337]" />
          </div>
        ) : error ? (
          <div className="rounded-2xl p-8 bg-red-50 text-red-700 text-center">{error}</div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl p-12 bg-white shadow-sm text-center">
            <p className="text-gray-600 text-lg mb-4">Your wishlist is empty.</p>
            <Link href="/shop" className="inline-flex items-center justify-center px-8 py-3 bg-[#881337] text-white rounded-full font-semibold hover:bg-[#f43f5e]">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
