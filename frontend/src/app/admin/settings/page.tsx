'use client';

import { Save } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1c1917]">Store Settings</h1>
        <p className="text-gray-500 mt-1">Manage your business contact details and preferences</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-[#fcf8f9]">
          <h2 className="font-bold text-[#881337] text-lg">Contact Information</h2>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Store Name</label>
              <input type="text" defaultValue="KP Kurtie Points" className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#881337] transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Contact Email</label>
              <input type="email" defaultValue="kp.kurtiepoint@gmail.com" className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#881337] transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">WhatsApp Number</label>
              <input type="text" defaultValue="+91 94809 71996" className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#881337] transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Instagram Handle</label>
              <input type="text" defaultValue="kp.kurtipoint" className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#881337] transition-colors" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Physical Store Address</label>
            <textarea rows={3} defaultValue="Near CHM Park, Closed to Hoysala Nagar, Indira Nagar, Bangalore, Karnataka 560038" className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#881337] transition-colors"></textarea>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-[#fcf8f9]">
          <h2 className="font-bold text-[#881337] text-lg">Sales Dashboard Data Source</h2>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center">
            <p className="font-medium text-gray-600 mb-2">Upload your Daily Sales Excel sheet here</p>
            <p className="text-sm text-gray-400 mb-4">.xlsx or .csv files up to 5MB</p>
            <button className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors">
              Browse Files
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button className="flex items-center px-8 py-3 bg-[#881337] text-white rounded-xl hover:bg-[#f43f5e] transition-colors font-bold shadow-md">
          <Save className="h-5 w-5 mr-2" /> Save Changes
        </button>
      </div>
    </div>
  );
}
