'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Image as ImageIcon, Loader2 } from 'lucide-react';
import { API_BASE } from '@/lib/api';

export default function AddProductPage() {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [fabric, setFabric] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [sizes, setSizes] = useState<string[]>([]);
  const [status, setStatus] = useState('available');
  const [stockCount, setStockCount] = useState(10);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [image, setImage] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSizeToggle = (size: string) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter(s => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const submitHandler = async () => {
    if (!name || !category || !price) {
      alert('Name, category, and regular price are required.');
      return;
    }

    try {
      setIsLoading(true);
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      
      const payload = {
        name,
        description,
        category,
        fabric,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : 0,
        sizes,
        status,
        stockCount: Number(stockCount),
        isNewArrival,
        isBestSeller,
        image: image || '/images/placeholder.jpg',
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      };

      const res = await fetch(`${API_BASE}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Product created successfully!');
        router.push('/admin/products');
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Failed to create product');
      }
    } catch (error) {
      console.error(error);
      alert('An expected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link href="/admin/products" className="mr-4 text-gray-400 hover:text-[#881337] transition-colors p-2 bg-white rounded-full shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#1c1917]">Add New Product</h1>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products" className="flex items-center justify-center h-12 px-6 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-bold text-[15px] shadow-sm transition-colors">
            Discard
          </Link>
          <button 
            onClick={submitHandler}
            disabled={isLoading}
            className="flex items-center h-12 px-6 bg-[#881337] hover:bg-[#f43f5e] text-white rounded-xl font-bold text-[15px] shadow-sm transition-colors transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Form */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Basic Info */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-[#1c1917] mb-6">Basic Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Product Name <span className="text-red-500">*</span></label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-12 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-medium bg-gray-50 focus:bg-white" placeholder="e.g., Floral Pink Short Kurti" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-xl border border-gray-200 p-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-medium bg-gray-50 focus:bg-white resize-y" placeholder="Detail the fabric, style, occasion..."></textarea>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-12 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-medium bg-gray-50 focus:bg-white text-gray-700">
                    <option value="">Select Category</option>
                    <option value="Casual Wear">Casual Wear</option>
                    <option value="Festive Picks">Festive Picks</option>
                    <option value="College Style">College Style</option>
                    <option value="Daily Wear">Daily Wear</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Fabric</label>
                  <input type="text" value={fabric} onChange={(e) => setFabric(e.target.value)} className="w-full h-12 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-medium bg-gray-50 focus:bg-white" placeholder="e.g., Pure Cotton" />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-[#1c1917] mb-6">Pricing & Inventory</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Regular Price (₹) <span className="text-red-500">*</span></label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full h-12 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-bold text-lg bg-gray-50 focus:bg-white" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Sale Price (₹)</label>
                <input type="number" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} className="w-full h-12 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-bold text-lg bg-gray-50 focus:bg-white" placeholder="Leave empty if no sale" />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <label className="block text-sm font-bold text-gray-700 mb-4">Available Sizes</label>
              <div className="flex flex-wrap gap-3">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <label key={size} className="cursor-pointer relative">
                    <input type="checkbox" className="peer sr-only" checked={sizes.includes(size)} onChange={() => handleSizeToggle(size)} />
                    <div className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center font-bold text-gray-500 peer-checked:border-[#881337] peer-checked:bg-[#fdf2f8] peer-checked:text-[#881337] transition-all">
                      {size}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar settings */}
        <div className="space-y-8">
          
          {/* Status & Options */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-[#1c1917] mb-6">Product Status</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Visibility</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full h-12 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-bold bg-green-50 text-green-700">
                  <option value="available">Available (Public)</option>
                  <option value="out_of_stock">Out of Stock</option>
                  <option value="hidden">Hidden (Draft)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Total Stock Quantity</label>
                <input type="number" value={stockCount} onChange={(e) => setStockCount(Number(e.target.value))} className="w-full h-12 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] font-medium bg-gray-50" />
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" checked={isNewArrival} onChange={(e) => setIsNewArrival(e.target.checked)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#881337]"></div>
                  </div>
                  <span className="ml-3 text-sm font-bold text-gray-700">Mark as 'New Arrival'</span>
                </label>
                
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" checked={isBestSeller} onChange={(e) => setIsBestSeller(e.target.checked)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f43f5e]"></div>
                  </div>
                  <span className="ml-3 text-sm font-bold text-gray-700">Mark as 'Best Seller'</span>
                </label>
              </div>
            </div>
          </div>

          {/* Media Images */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-[#1c1917] mb-6">Product Images</h2>
            
            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full h-12 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] font-medium bg-gray-50" placeholder="https://example.com/image.jpg" />
              <div className="border-2 border-dashed border-gray-300 rounded-[1.5rem] bg-gray-50 p-8 text-center hover:bg-gray-100 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-[#881337] shadow-sm overflow-hidden">
                  {image ? (
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  )}
                </div>
                <p className="font-bold text-[#1c1917] mb-1">Uploads Disabled in MVP</p>
                <p className="text-xs text-gray-500 font-medium">Use Image URL above instead</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
