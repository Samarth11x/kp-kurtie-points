'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, LayoutDashboard, Settings, LogOut, Tags, Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin';
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isLoginPage) return;

    const checkAuth = () => {
      try {
        const userInfoStr = localStorage.getItem('userInfo');
        if (!userInfoStr) {
          router.replace('/admin');
          return;
        }
        
        const userInfo = JSON.parse(userInfoStr);
        if (!userInfo || !userInfo.isAdmin) {
          router.replace('/admin');
          return;
        }
        
        setIsAuthorized(true);
      } catch (e) {
        router.replace('/admin');
      }
    };

    checkAuth();
  }, [pathname, router, isLoginPage]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    router.replace('/admin');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f5f5f5]">
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#881337] mb-4" />
          <p className="text-gray-500 font-medium">Verifying authorization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#1c1917] text-white flex flex-col hidden md:flex">
        <div className="h-20 flex items-center justify-center border-b border-gray-800">
          <Link href="/admin/dashboard" className="font-serif text-xl font-bold tracking-tight text-[#fdf2f8]">
            KP Admin Panel
          </Link>
        </div>
        
        <nav className="flex-1 py-8 px-4 space-y-2">
          <Link href="/admin/dashboard" className="flex items-center px-4 py-3 rounded-xl bg-[#881337] text-white font-medium hover:bg-[#f43f5e] transition-colors">
            <LayoutDashboard className="h-5 w-5 mr-3" /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center px-4 py-3 rounded-xl text-gray-400 font-medium hover:bg-gray-800 hover:text-white transition-colors">
            <Package className="h-5 w-5 mr-3" /> Products
          </Link>
          <Link href="/admin/categories" className="flex items-center px-4 py-3 rounded-xl text-gray-400 font-medium hover:bg-gray-800 hover:text-white transition-colors">
            <Tags className="h-5 w-5 mr-3" /> Categories
          </Link>
          <Link href="/admin/settings" className="flex items-center px-4 py-3 rounded-xl text-gray-400 font-medium hover:bg-gray-800 hover:text-white transition-colors">
            <Settings className="h-5 w-5 mr-3" /> Settings
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-3 rounded-xl text-red-400 font-medium hover:bg-gray-800 hover:text-red-300 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white shadow-sm flex items-center justify-between px-4 z-10">
          <Link href="/admin/dashboard" className="font-serif text-xl font-bold tracking-tight text-[#881337]">
            KP Admin
          </Link>
          <button className="text-gray-500 hover:text-[#1c1917]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        {/* Topbar (Desktop) */}
        <header className="hidden md:flex h-20 bg-white shadow-sm items-center justify-between px-8 z-10">
          <h2 className="text-xl font-bold text-[#1c1917]">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-500">Welcome, Admin</span>
            <div className="h-10 w-10 bg-[#e2ced4] rounded-full flex items-center justify-center text-[#881337] font-bold">
              KP
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f5f5f5] p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
