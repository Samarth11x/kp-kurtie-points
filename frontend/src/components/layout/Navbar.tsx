'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Heart, Search, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full glass bg-[#fffbeb]/90 border-b border-[#fdf2f8]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#1c1917] hover:text-[#881337] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/logo.jpg" alt="KP Kurtie Points Logo" className="h-[52px] w-[52px] sm:h-16 sm:w-16 object-cover rounded-full shadow-md group-hover:scale-105 transition-transform" />
              <span className="font-serif text-[22px] sm:text-[28px] font-bold tracking-tight text-[#881337] group-hover:opacity-90 transition-opacity">
                KP.Kurtie Point
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 items-center font-medium text-[15px]">
            <Link href="/" className="text-[#1c1917] hover:text-[#f43f5e] transition-colors">Home</Link>
            <Link href="/shop" className="text-[#1c1917] hover:text-[#f43f5e] transition-colors">Shop</Link>
            <Link href="/shop?category=new" className="text-[#1c1917] hover:text-[#f43f5e] transition-colors">New Arrivals</Link>
            <Link href="/about" className="text-[#1c1917] hover:text-[#f43f5e] transition-colors">About Us</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button className="hidden sm:block text-[#1c1917] hover:text-[#f43f5e] transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {user ? (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center text-[#1c1917] hover:text-[#f43f5e] transition-colors"
              >
                <LogOut className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            ) : (
              <Link href="/login" className="hidden sm:block text-[#1c1917] hover:text-[#f43f5e] transition-colors">
                <User className="h-5 w-5" />
              </Link>
            )}

            <Link href="/wishlist" className="hidden sm:block text-[#1c1917] hover:text-[#f43f5e] transition-colors">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="text-[#1c1917] hover:text-[#f43f5e] transition-colors relative">
              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="absolute -top-1 -right-2 bg-[#881337] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-[#fffbeb] border-t border-[#fdf2f8]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-[#1c1917] hover:bg-[#fdf2f8] rounded-md">Home</Link>
            <Link href="/shop" className="block px-3 py-2 text-base font-medium text-[#1c1917] hover:bg-[#fdf2f8] rounded-md">Shop</Link>
            <Link href="/shop?category=new" className="block px-3 py-2 text-base font-medium text-[#1c1917] hover:bg-[#fdf2f8] rounded-md">New Arrivals</Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-[#1c1917] hover:bg-[#fdf2f8] rounded-md">About Us</Link>
            <div className="border-t border-[#fdf2f8] mt-2 pt-2 flex flex-col gap-2 px-3">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center text-sm font-medium text-[#1c1917] hover:text-[#f43f5e]"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </button>
              ) : (
                <Link href="/login" className="flex items-center text-sm font-medium text-[#1c1917] hover:text-[#f43f5e]">
                  <User className="h-4 w-4 mr-2" /> Account
                </Link>
              )}

              <Link href="/wishlist" className="flex items-center text-sm font-medium text-[#1c1917] hover:text-[#f43f5e]">
                <Heart className="h-4 w-4 mr-2" /> Wishlist
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
