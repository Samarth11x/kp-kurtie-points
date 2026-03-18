'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PackageOpen, TrendingUp, AlertTriangle, ListOrdered, Loader2, Upload, FileSpreadsheet, DollarSign, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ total: 0, active: 0, outOfStock: 0, newArrivals: 0 });
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Excel Sales Data State
  const [salesData, setSalesData] = useState<any[]>([]);
  const [salesMetrics, setSalesMetrics] = useState({ totalRevenue: 0, totalInvestment: 0, netProfit: 0, totalPieces: 0 });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { API_BASE } = await import('@/lib/api');
        const res = await fetch(`${API_BASE}/api/products`, config);
        const data = await res.json();
        
        const products = data.products || [];
        setStats({
          total: products.length,
          active: products.filter((p: any) => p.status === 'available').length,
          outOfStock: products.filter((p: any) => p.status === 'out_of_stock').length,
          newArrivals: products.filter((p: any) => p.isNewArrival).length,
        });
        setRecentProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      
      // Clean and map Excel data
      const cleanedData = data.map((row: any) => ({
        date: row.Date || row.date || 'Unknown',
        pieces: Number(row['Pieces Sold'] || row.Pieces || 0),
        revenue: Number(row.Revenue || row.revenue || 0),
        investment: Number(row['Invested Amount'] || row.Investment || row.investment || 0),
        profit: Number(row['Net Profit'] || row.Profit || row.profit || 0)
      }));

      // Calculate totals
      const totals = cleanedData.reduce((acc, curr) => ({
        totalRevenue: acc.totalRevenue + curr.revenue,
        totalInvestment: acc.totalInvestment + curr.investment,
        netProfit: acc.netProfit + curr.profit,
        totalPieces: acc.totalPieces + curr.pieces
      }), { totalRevenue: 0, totalInvestment: 0, netProfit: 0, totalPieces: 0 });

      setSalesData(cleanedData);
      setSalesMetrics(totals);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-[#1c1917] mb-2">Platform Overview & Sales Dashboard</h1>
        <p className="text-gray-500 font-medium">Upload your daily sales Excel file to generate revenue and profit metrics.</p>
      </div>

      {/* --- EXCEL SALES DASHBOARD SECTION --- */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-100 pb-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-[#ecfdf5] text-[#10b981] rounded-full flex items-center justify-center mr-4">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1c1917]">Financial Insights</h2>
              <p className="text-sm text-gray-500">Based on your uploaded Excel data.</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 relative">
            <input 
              type="file" 
              accept=".xlsx, .xls, .csv" 
              onChange={handleExcelUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="flex items-center px-6 py-2.5 bg-[#881337] text-white rounded-xl hover:bg-[#f43f5e] transition-colors font-medium shadow-sm">
              <Upload className="h-4 w-4 mr-2" /> Upload Sales Data
            </button>
          </div>
        </div>

        {salesData.length > 0 ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Sales Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wider">Total Revenue</p>
                <p className="text-3xl font-bold text-[#10b981]">₹{salesMetrics.totalRevenue.toLocaleString()}</p>
                <div className="mt-2 flex items-center text-xs text-green-600 font-medium">
                  <TrendingUp className="h-3 w-3 mr-1" /> from {salesData.length} records
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wider">Total Investment</p>
                <p className="text-3xl font-bold text-[#f59e0b]">₹{salesMetrics.totalInvestment.toLocaleString()}</p>
              </div>
              <div className="bg-[#fdf2f8] rounded-2xl p-6 border border-[#f43f5e]/20">
                <p className="text-sm text-[#881337] font-bold mb-1 uppercase tracking-wider">Net Profit</p>
                <p className="text-3xl font-bold text-[#881337]">₹{salesMetrics.netProfit.toLocaleString()}</p>
                <div className="mt-2 text-xs text-[#f43f5e] font-bold bg-white/50 inline-block px-2 py-1 rounded-md text-center">
                  Markup: {Math.round((salesMetrics.netProfit / salesMetrics.totalInvestment) * 100)}%
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wider">Pieces Sold</p>
                <p className="text-3xl font-bold text-[#1c1917]">{salesMetrics.totalPieces}</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
              <div className="h-80 w-full">
                <h3 className="text-lg font-bold text-[#1c1917] mb-6 flex items-center"><Activity className="h-5 w-5 mr-2 text-[#881337]" /> Daily Profit Growth</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{fontSize: 12, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fontSize: 12, fill: '#9ca3af'}} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend />
                    <Line type="monotone" dataKey="profit" name="Net Profit" stroke="#881337" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="h-80 w-full">
                <h3 className="text-lg font-bold text-[#1c1917] mb-6 flex items-center"><DollarSign className="h-5 w-5 mr-2 text-[#f59e0b]" /> Revenue vs Investment</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{fontSize: 12, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fontSize: 12, fill: '#9ca3af'}} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} />
                    <Tooltip cursor={{fill: '#fcf8f9'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="investment" name="Investment" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
            <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <TrendingUp className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-[#1c1917] mb-2">No Sales Data Available</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">Upload an Excel file containing Date, Pieces Sold, Revenue, Invested Amount, and Net Profit to generate your charts.</p>
            <div className="relative inline-block border border-gray-300 rounded-lg px-6 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
              <input 
                type="file" 
                accept=".xlsx, .xls, .csv" 
                onChange={handleExcelUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              Select Excel File
            </div>
          </div>
        )}
      </div>

      {/* --- CATALOG METRICS SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center transition-transform hover:-translate-y-1 hover:shadow-md">
          <div className="h-16 w-16 rounded-full bg-[#fdf2f8] flex items-center justify-center text-[#f43f5e] mr-5">
            <PackageOpen className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Catalog Size</p>
            <p className="text-2xl font-bold text-[#1c1917]">{isLoading ? '-' : stats.total}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center transition-transform hover:-translate-y-1 hover:shadow-md">
          <div className="h-16 w-16 rounded-full bg-[#ecfdf5] flex items-center justify-center text-[#10b981] mr-5">
            <TrendingUp className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Active Items</p>
            <p className="text-2xl font-bold text-[#1c1917]">{isLoading ? '-' : stats.active}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center transition-transform hover:-translate-y-1 hover:shadow-md">
          <div className="h-16 w-16 rounded-full bg-[#fffbeb] flex items-center justify-center text-[#f59e0b] mr-5">
            <ListOrdered className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">New Arrivals</p>
            <p className="text-2xl font-bold text-[#1c1917]">{isLoading ? '-' : stats.newArrivals}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center transition-transform hover:-translate-y-1 hover:shadow-md">
          <div className="h-16 w-16 rounded-full bg-[#fef2f2] flex items-center justify-center text-[#ef4444] mr-5">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Out of Stock</p>
            <p className="text-2xl font-bold text-[#1c1917]">{isLoading ? '-' : stats.outOfStock}</p>
          </div>
        </div>
      </div>

      {/* --- QUICK ACTIONS & RECENT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 border border-gray-100 shadow-sm bg-white rounded-3xl p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#1c1917] mb-6">Catalog Actions</h2>
            <div className="space-y-4">
              <Link href="/admin/products/new" className="w-full flex items-center justify-center h-14 bg-[#881337] hover:bg-[#f43f5e] text-white rounded-xl font-bold text-[15px] shadow-sm transition-colors">
                + Add New Product
              </Link>
              <Link href="/admin/products" className="w-full flex items-center justify-center h-14 bg-[#fdf2f8] text-[#881337] hover:bg-[#f43f5e] hover:text-white border border-[#fdf2f8] rounded-xl font-bold text-[15px] transition-colors">
                View All Products
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 border border-gray-100 shadow-sm bg-white rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#1c1917]">Recently Added Products</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100 text-gray-500 font-bold uppercase tracking-wider text-xs">
                  <th className="pb-4 font-bold">Product</th>
                  <th className="pb-4 font-bold">Status</th>
                  <th className="pb-4 font-bold">Price</th>
                  <th className="pb-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center"><Loader2 className="w-6 h-6 animate-spin text-[#881337] mx-auto" /></td>
                  </tr>
                ) : recentProducts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">No products found. Add some!</td>
                  </tr>
                ) : (
                  recentProducts.map((item) => (
                    <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-[#e2ced4] rounded-lg mr-3 overflow-hidden">
                            {item.image && item.image.startsWith('/') && (
                              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }}></div>
                            )}
                          </div>
                          <span className="font-bold text-[#1c1917] line-clamp-1">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        {item.status === 'out_of_stock' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Out of Stock</span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Available</span>
                        )}
                      </td>
                      <td className="py-4 font-bold text-[#1c1917]">₹{item.price}</td>
                      <td className="py-4 text-right">
                        <Link href={`/admin/products/edit/${item._id}`} className="text-[#2563eb] hover:text-blue-800 font-medium">Edit</Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
