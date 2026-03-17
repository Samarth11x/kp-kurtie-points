'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  const updateQuantity = (id: string, size: string, increment: number) => {
    const updatedCart = cartItems.map(item => {
      if (item._id === id && item.size === size) {
        const newQuantity = Math.max(1, item.quantity + increment);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id: string, size: string) => {
    const updatedCart = cartItems.filter(item => !(item._id === id && item.size === size));
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (!isLoaded) {
    return <div className="bg-[#fffbeb] min-h-screen py-12 flex justify-center"><p>Loading...</p></div>;
  }

  return (
    <div className="bg-[#fffbeb] min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#881337] mb-8 lg:mb-12 text-center lg:text-left">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-12 text-center shadow-sm max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-[#fdf2f8] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🛍️</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1c1917] mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 font-medium">Looks like you haven&apos;t added any lovely kurties to your cart yet.</p>
            <Link href="/shop" className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-full shadow-sm text-white bg-[#881337] hover:bg-[#f43f5e] transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Cart Items List */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm">
                
                {/* Progress Bar for Store Pickup */}
                <div className="mb-8 p-4 bg-[#fdf2f8] rounded-2xl border border-[#f43f5e]/20 text-center">
                  <p className="font-bold text-[#881337]">🛍️ In-Store Pickup Available!</p>
                  <p className="text-sm text-gray-600 mt-1 font-medium">Send your cart via WhatsApp to confirm the order and collect it at our store.</p>
                </div>

                {/* Items */}
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item, idx) => (
                    <div key={`${item._id}-${item.size}-${idx}`} className="py-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                      
                      <Link href={`/product/${item.slug}`} className="w-24 h-32 sm:w-32 sm:h-40 shrink-0 bg-[#e2ced4] rounded-xl overflow-hidden shadow-inner flex items-center justify-center text-[#881337] text-sm font-medium relative group">
                        {item.image && item.image.startsWith('/') ? (
                          <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: `url(${item.image})` }}></div>
                        ) : (
                          <span className="opacity-60 text-center p-2 text-xs">{item.name}</span>
                        )}
                      </Link>
                      
                      <div className="flex-1 w-full text-center sm:text-left flex flex-col h-full justify-between">
                        <div>
                          <div className="flex flex-col sm:flex-row justify-between mb-1">
                            <Link href={`/product/${item.slug}`}>
                              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1c1917] hover:text-[#f43f5e] transition-colors cursor-pointer line-clamp-1">
                                {item.name}
                              </h3>
                            </Link>
                            <span className="font-bold text-[#881337] text-xl mt-2 sm:mt-0">₹{item.price * item.quantity}</span>
                          </div>
                          <p className="text-gray-500 font-medium text-sm">Size: <span className="text-[#1c1917] font-bold">{item.size}</span></p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-gray-200 rounded-full h-10 px-3 bg-gray-50">
                            <button onClick={() => updateQuantity(item._id, item.size, -1)} className="text-gray-500 hover:text-[#881337] font-bold px-2">−</button>
                            <span className="font-bold text-[#1c1917] w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item._id, item.size, 1)} className="text-gray-500 hover:text-[#881337] font-bold px-2">+</button>
                          </div>
                          
                          <button onClick={() => removeItem(item._id, item.size)} className="text-gray-400 hover:text-red-500 flex items-center text-sm font-semibold transition-colors bg-[#fdf2f8] hover:bg-red-50 px-3 py-2 rounded-full">
                            <Trash2 className="h-4 w-4 mr-1.5" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-100 text-center sm:text-left">
                  <Link href="/shop" className="inline-flex items-center text-gray-500 font-bold hover:text-[#881337] transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm sticky top-28">
                <h2 className="font-serif text-2xl font-bold text-[#1c1917] mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 font-medium mt-3 border-b border-gray-100 pb-4">
                    <span>Delivery</span>
                    <span className="text-[#f43f5e] font-bold">Offline Store Only</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center mt-2">
                    <span className="text-lg font-bold text-[#1c1917]">Total</span>
                    <span className="text-2xl font-bold text-[#881337]">₹{total}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6 relative">
                  <input type="text" placeholder="Enter promo code" className="w-full h-12 rounded-full border border-gray-200 px-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-medium placeholder-gray-400" />
                  <button className="absolute right-1 top-1 bottom-1 px-4 bg-[#1c1917] text-white rounded-full font-bold text-sm hover:bg-[#881337] transition-colors">
                    Apply
                  </button>
                </div>

                <a 
                  href={`https://wa.me/919480971996?text=${encodeURIComponent(
                    `Hi KP Kurtie Points,\nI'd like to reserve these products for pickup:\n\n${cartItems.map((item, idx) => `${idx + 1}. ${item.name} - Size ${item.size} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`).join('\n')}\n\n*Total: ₹${total}*\n\nPlease confirm availability!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center h-14 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-full font-bold text-lg shadow-md transition-all transform hover:-translate-y-0.5 mb-4 group"
                >
                  <img src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png" alt="WhatsApp" className="w-5 h-5 mr-3 brightness-0 invert group-hover:scale-110 transition-transform" />
                  Send Cart on WhatsApp
                </a>

                <div className="flex items-center justify-center text-sm font-medium text-gray-500 bg-[#fdf2f8] py-2 rounded-xl mt-4">
                  <ShieldCheck className="h-4 w-4 text-[#881337] mr-1.5" /> Fast & easy manual processing
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
