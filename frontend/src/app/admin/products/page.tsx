'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, MoreVertical, Edit2, Trash2, Eye, Loader2 } from 'lucide-react';
import { API_BASE } from '@/lib/api';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}/api/products`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const config = {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const res = await fetch(`${API_BASE}/api/products/${id}`, config);
        
        if (res.ok) {
          fetchProducts(); // Refresh list
        } else {
          alert('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product', error);
      }
    }
  };

  // Safe approach to ensure we capture all categories uniquely
  const categories = ['All Categories', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || 
                          (statusFilter === 'Available' && product.status === 'available') ||
                          (statusFilter === 'Out of Stock' && product.status === 'out_of_stock') ||
                          (statusFilter === 'Hidden' && product.status === 'hidden');
    const matchesCategory = categoryFilter === 'All Categories' || product.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1c1917] mb-2">Products</h1>
          <p className="text-gray-500 font-medium">Manage your inventory, prices, and stock status.</p>
        </div>
        <Link href="/admin/products/new" className="flex items-center justify-center h-12 px-6 bg-[#881337] hover:bg-[#f43f5e] text-white rounded-xl font-bold text-[15px] shadow-sm transition-colors transform hover:-translate-y-0.5">
          <Plus className="w-5 h-5 mr-2" /> Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Filters and Search */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search products by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-medium bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 sm:w-40 h-12 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] font-medium bg-gray-50 text-gray-700"
            >
              <option>All Status</option>
              <option>Available</option>
              <option>Out of Stock</option>
              <option>Hidden</option>
            </select>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="flex-1 sm:w-40 h-12 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] font-medium bg-gray-50 text-gray-700"
            >
              {categories.map((cat: any) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f5f5f5]">
              <tr className="border-b-2 border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-xs">
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Stock</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#881337] mx-auto" />
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500 font-medium">
                    No products found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-[#e2ced4] rounded-lg mr-4 shrink-0 overflow-hidden">
                          {product.image && product.image.startsWith('/') && (
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }}></div>
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-[#1c1917] text-base block">{product.name}</span>
                          <div className="flex gap-2 mt-1">
                            {product.isNewArrival && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">New Arrival</span>}
                            {product.isBestSeller && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">Best Seller</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{product.category}</td>
                    <td className="py-4 px-6 font-bold text-[#1c1917]">
                      <div className="flex flex-col">
                        <span>₹{product.discountPrice && product.discountPrice > 0 ? product.discountPrice : product.price}</span>
                        {product.discountPrice > 0 && product.discountPrice < product.price && (
                          <span className="text-xs text-gray-400 line-through">₹{product.price}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-600">{product.stockCount}</td>
                    <td className="py-4 px-6">
                      {product.status === 'out_of_stock' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                          Out of Stock
                        </span>
                      ) : product.status === 'hidden' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
                          Hidden
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                          Available
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/product/${product.slug}`} target="_blank" className="text-gray-400 hover:text-[#1c1917]" title="View on site">
                          <Eye className="w-5 h-5" />
                        </Link>
                        <Link href={`/admin/products/edit/${product._id}`} className="text-blue-500 hover:text-blue-700" title="Edit product">
                          <Edit2 className="w-5 h-5" />
                        </Link>
                        <button onClick={() => handleDelete(product._id, product.name)} className="text-red-400 hover:text-red-600" title="Delete product">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 font-medium">
          <span>Showing {filteredProducts.length} products</span>
        </div>

      </div>
    </div>
  );
}
