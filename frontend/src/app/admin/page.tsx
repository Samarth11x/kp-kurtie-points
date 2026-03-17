'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (!data.isAdmin) {
          setError('Not authorized as an admin');
          setIsLoading(false);
          return;
        }
        localStorage.setItem('userInfo', JSON.stringify(data));
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffbeb] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link href="/" className="font-serif text-3xl font-bold tracking-tight text-[#881337]">
            KP Kurtie Points
          </Link>
          <p className="text-gray-500 font-medium mt-3">Admin Dashboard Login</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl p-8 sm:p-10 border border-gray-100">
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl font-medium text-sm text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-14 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-medium bg-gray-50 focus:bg-white transition-colors" 
                placeholder="admin@kpkurtiepoints.com" 
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

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full flex items-center justify-center h-14 bg-[#1c1917] hover:bg-[#881337] text-white rounded-xl font-bold text-lg shadow-sm transition-colors transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                {isLoading ? 'Authenticating...' : 'Secure Login'}
              </button>
            </div>
          </form>

          <div className="mt-8 flex items-center justify-center text-sm font-medium text-gray-500">
            <ShieldCheck className="w-4 h-4 mr-1.5 text-green-500" /> Authorized personnel only
          </div>
        </div>
      </div>
    </div>
  );
}
