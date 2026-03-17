'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function CustomerRegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(name, email, password);
      router.push('/');
    } catch (err: any) {
      setError(err?.message ?? 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#fffbeb] min-h-screen py-12 md:py-20 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
        
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-500 hover:text-[#881337] transition-colors font-bold mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Store
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#881337] mb-2">
            Create Account
          </h1>
          <p className="text-gray-500 font-medium">Join KP Kurtie Points for faster checkout and exclusive offers.</p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl font-medium text-sm text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-14 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-medium bg-gray-50 focus:bg-white transition-colors" 
                placeholder="Jane Doe" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-14 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-medium bg-gray-50 focus:bg-white transition-colors" 
                placeholder="you@example.com" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-14 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-medium bg-gray-50 focus:bg-white transition-colors" 
                placeholder="••••••••" 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex items-center justify-center h-14 bg-[#881337] hover:bg-[#f43f5e] text-white rounded-full font-bold text-lg shadow-md transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-8">
            <p className="text-gray-500 font-medium">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-[#881337] hover:text-[#f43f5e]">
                Sign In
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
