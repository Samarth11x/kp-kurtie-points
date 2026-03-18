'use client';

// Force Next.js to recompile this file
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Store, Sparkles, MessageCircle, Phone, Loader2 } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { API_BASE, fetchJson } from '@/lib/api';

type Product = {
  _id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  sizes: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  slug: string;
};

export default function Home() {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const data = await fetchJson(`${API_BASE}/api/products`);
        // Filter for best sellers and take top 4
        const featured = (data.products || []).filter((p: any) => p.isBestSeller).slice(0, 4);
        setBestSellers(featured);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestSellers();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-[#fdf2f8]">
        <div className="absolute inset-0 z-0 flex justify-end">
          <div className="w-full md:w-3/5 h-full relative">
            <Image 
              src="/images/hero.png" 
              alt="KP Kurtie Point - Discover Your Short Kurti Style" 
              fill 
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
        
        {/* Soft overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdf2f8] via-[#fdf2f8]/90 to-transparent z-10 md:w-2/3"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-xl">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#881337] mb-6 drop-shadow-sm">
              Trendy Short Kurties for Every Mood
            </h1>
            <p className="text-lg md:text-xl text-[#3f3f46] mb-8 font-medium max-w-md">
              Comfort, style, and elegance in every piece. Explore our premium collection designed for the modern woman.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-full shadow-md text-white bg-[#881337] hover:bg-[#f43f5e] transition-all transform hover:-translate-y-0.5">
                Shop Now
              </Link>
              <Link href="/shop?category=new" className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#881337] text-base font-semibold rounded-full text-[#881337] hover:bg-[#881337]/5 transition-all">
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-[#fdf2f8] flex items-center justify-center text-[#f43f5e] mb-4">
                <Store className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-[#1c1917]">Offline Catalog</h3>
              <p className="text-sm text-gray-500 mt-1">Browse our store locally</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-[#fdf2f8] flex items-center justify-center text-[#f43f5e] mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-[#1c1917]">New Arrivals</h3>
              <p className="text-sm text-gray-500 mt-1">Discover the latest kurties</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-[#fdf2f8] flex items-center justify-center text-[#f43f5e] mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-[#1c1917]">WhatsApp Orders</h3>
              <p className="text-sm text-gray-500 mt-1">Found it? Buy via WhatsApp</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-[#fdf2f8] flex items-center justify-center text-[#f43f5e] mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-[#1c1917]">Direct Support</h3>
              <p className="text-sm text-gray-500 mt-1">Chat on our business number</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-[#fffbeb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1c1917]">Shop by Category</h2>
              <p className="text-[#f43f5e] font-medium mt-2">Find your perfect fit for any occasion</p>
            </div>
            <Link href="/shop" className="hidden sm:flex items-center font-medium text-[#1c1917] hover:text-[#f43f5e] transition">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {['Casual Wear', 'Festive Picks', 'College Style', 'Daily Wear'].map((category, index) => (
              <Link href={`/shop?category=${category}`} key={index} className="group relative h-64 sm:h-80 overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-[#e2ced4] transition-transform duration-500 group-hover:scale-105"></div>
                {/* Placeholder graphic */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-serif tracking-wide text-xl sm:text-2xl font-semibold">{category}</h3>
                  <div className="h-1 w-0 bg-[#f43f5e] group-hover:w-1/2 transition-all duration-300 mt-2"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-[#fdf2f8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1c1917]">Current Favorites</h2>
              <p className="text-[#f43f5e] font-medium mt-3 text-lg">Our top selling curties this week</p>
            </div>
            <Link href="/shop" className="mt-4 sm:mt-0 flex items-center font-medium text-[#1c1917] hover:text-[#f43f5e] transition bg-white px-5 py-2 rounded-full shadow-sm">
              Shop Bestsellers
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-10 w-10 animate-spin text-[#881337]" />
            </div>
          ) : bestSellers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 font-medium text-lg">New best sellers coming soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestSellers.map((product) => (
                <ProductCard key={product._id} {...product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#fffbeb] rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center shadow-sm">
            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1c1917] mb-6 tracking-tight">
                Curated with Love,<br />by KP.
              </h2>
              <p className="text-[#3f3f46] text-lg mb-6 leading-relaxed font-medium">
                Started by Khushi and Pooja with a passion for fashion, KP Kurtie Points is a small business with big dreams. We believe that every girl deserves beautifully designed, comfortable ethnic wear without compromising on budget.
              </p>
              <p className="text-[#3f3f46] text-lg mb-8 leading-relaxed font-medium">
                Our short kurties are carefully handpicked for college girls and young women who want style and comfort in their everyday wardrobe.
              </p>
              <Link href="/about" className="inline-flex items-center text-[#881337] font-bold text-lg hover:text-[#f43f5e] transition-colors relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-[#f43f5e] after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
                Read Our Story <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <div className="relative w-full max-w-[500px] aspect-[4/5] md:aspect-square rounded-[2rem] md:rounded-full overflow-hidden shadow-2xl border-8 border-white bg-white mx-auto">
                <Image 
                  src="/images/founder4.jpg" 
                  alt="Khushi and Pooja - Founders of KP Kurtie Points"
                  fill
                  className="object-cover object-[center_30%]"
                  sizes="(max-width: 768px) 90vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
