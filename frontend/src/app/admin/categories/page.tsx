'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories] = useState([
    { id: 1, name: 'Casual Wear', slug: 'casual-wear', productCount: 45 },
    { id: 2, name: 'Party Wear', slug: 'party-wear', productCount: 22 },
    { id: 3, name: 'Office Wear', slug: 'office-wear', productCount: 31 },
    { id: 4, name: 'Festive Collection', slug: 'festive', productCount: 18 },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1c1917]">Categories</h1>
          <p className="text-gray-500 mt-1">Manage your product collections</p>
        </div>
        <button className="flex items-center px-4 py-2.5 bg-[#881337] text-white rounded-xl hover:bg-[#f43f5e] transition-colors font-medium shadow-sm">
          <Plus className="h-5 w-5 mr-2" /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search categories..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#881337]/20 focus:border-[#881337] transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fcf8f9] text-[#881337] text-sm uppercase tracking-wider font-bold">
                <th className="p-5 border-b border-[#f43f5e]/10">Category Name</th>
                <th className="p-5 border-b border-[#f43f5e]/10">Slug</th>
                <th className="p-5 border-b border-[#f43f5e]/10">Products</th>
                <th className="p-5 border-b border-[#f43f5e]/10 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-5 text-[#1c1917] font-semibold">{category.name}</td>
                  <td className="p-5 text-gray-500 font-mono text-sm">{category.slug}</td>
                  <td className="p-5 text-gray-600">
                    <span className="bg-[#fdf2f8] text-[#f43f5e] px-3 py-1 rounded-full text-xs font-bold">
                      {category.productCount} items
                    </span>
                  </td>
                  <td className="p-5 text-right space-x-2">
                    <button className="p-2 text-gray-400 hover:text-[#881337] hover:bg-[#fdf2f8] rounded-lg transition-colors">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
