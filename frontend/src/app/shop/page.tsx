'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Filter, ChevronDown, SlidersHorizontal, X, Loader2 } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { API_BASE, fetchJson } from '@/lib/api';

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

export default function ShopPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchJson(`${API_BASE}/api/products`);
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-[#fffbeb] min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#fdf2f8] py-12 md:py-20 border-b border-[#f43f5e]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#881337] mb-4">Shop Collection</h1>
          <nav className="flex justify-center text-sm font-medium text-gray-500 space-x-2">
            <Link href="/" className="hover:text-[#f43f5e]">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[#1c1917]">All Products</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between mb-4 border-b border-gray-200 pb-4">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm font-medium text-[#1c1917]"
            >
              <SlidersHorizontal className="h-5 w-5 text-[#881337]" />
              <span>Filters</span>
            </button>
            <div className="flex items-center space-x-2 font-medium text-sm">
              <span className="text-gray-500">Sort by:</span>
              <select className="bg-transparent border-none font-bold text-[#881337] focus:ring-0 cursor-pointer">
                <option>Featured</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Sidebar Filters */}
          <aside className={`fixed inset-0 z-50 bg-[#fffbeb] lg:bg-transparent lg:static lg:block lg:w-1/4 xl:w-1/5 transform ${isFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} transition-transform duration-300 ease-in-out`}>
            <div className="h-full flex flex-col p-6 lg:p-0">
              
              <div className="flex items-center justify-between lg:hidden mb-8">
                <h2 className="font-serif text-2xl font-bold text-[#1c1917]">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-white rounded-full shadow-sm text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto lg:overflow-visible pr-2">
                
                {/* Categories */}
                <div className="mb-8 border-b border-[#fdf2f8] pb-6">
                  <h3 className="font-bold text-lg text-[#1c1917] mb-4 flex items-center justify-between">
                    Categories
                  </h3>
                  <div className="space-y-3">
                    {['All Products', 'Casual Wear', 'Festive Picks', 'College Style', 'Daily Wear'].map((category, idx) => (
                      <label key={category} className="flex items-center cursor-pointer group">
                        <input type="radio" name="category" className="hidden" defaultChecked={idx === 0} />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center mr-3 group-hover:border-[#f43f5e] peer-checked:border-[#f43f5e]">
                          <div className={`w-2.5 h-2.5 rounded-full bg-[#f43f5e] ${idx === 0 ? 'block' : 'hidden'}`}></div>
                        </div>
                        <span className={`text-base font-medium ${idx === 0 ? 'text-[#881337] font-bold' : 'text-gray-600 group-hover:text-[#f43f5e]'}`}>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8 border-b border-[#fdf2f8] pb-6">
                  <h3 className="font-bold text-lg text-[#1c1917] mb-4">Price</h3>
                  <div className="space-y-3">
                    {['Under ₹500', '₹500 - ₹999', '₹1000 - ₹1499', 'Over ₹1500'].map((price) => (
                      <label key={price} className="flex items-center cursor-pointer group">
                        <input type="checkbox" className="rounded-md border-gray-300 text-[#f43f5e] focus:ring-[#f43f5e] w-5 h-5 mr-3 cursor-pointer" />
                        <span className="text-base font-medium text-gray-600 group-hover:text-[#1c1917]">{price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-[#1c1917] mb-4">Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button key={size} className="w-12 h-12 rounded-xl border border-gray-200 bg-white font-medium text-gray-600 hover:border-[#f43f5e] hover:text-[#f43f5e] hover:shadow-sm transition-all focus:border-[#881337] focus:bg-[#fdf2f8] focus:text-[#881337]">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-6 lg:hidden">
                <button onClick={() => setIsFilterOpen(false)} className="w-full bg-[#881337] text-white py-4 rounded-2xl font-bold text-lg shadow-md">
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            
            {/* Desktop Sorting */}
            <div className="hidden lg:flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm mb-8">
              <p className="text-gray-500 font-medium">Showing <span className="text-[#1c1917] font-bold">12</span> of <span className="text-[#1c1917] font-bold">45</span> products</p>
              <div className="flex items-center space-x-4">
                <span className="text-gray-500 font-medium text-sm">Sort by:</span>
                <div className="relative group">
                  <button className="flex items-center font-bold text-[#1c1917] space-x-1 hover:text-[#f43f5e] transition-colors">
                    <span>Featured</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-10 w-10 animate-spin text-[#881337]" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 font-medium text-lg">No products found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {products.map((product) => (
                  <ProductCard key={product._id} {...product} />
                ))}
              </div>
            )}

            {/* Pagination Placeholder */}
            <div className="flex justify-center mt-12">
              <nav className="flex space-x-2">
                <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 bg-white text-gray-500 hover:bg-[#fdf2f8] hover:text-[#881337] hover:border-[#881337] transition-all font-medium">&lt;</button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#881337] text-white shadow-sm font-bold">1</button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center border border-transparent bg-white text-gray-600 hover:bg-[#fdf2f8] transition-all font-medium">2</button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center border border-transparent bg-white text-gray-600 hover:bg-[#fdf2f8] transition-all font-medium">3</button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 bg-white text-gray-500 hover:bg-[#fdf2f8] hover:text-[#881337] hover:border-[#881337] transition-all font-medium">&gt;</button>
              </nav>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
