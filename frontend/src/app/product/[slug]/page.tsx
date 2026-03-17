'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ChevronRight, Star, Heart, Share2, Store, RefreshCw, ShieldCheck, Loader2 } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';

export default function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'store'>('description');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const addToCartHandler = () => {
    if (!product) return;
    
    const displayPrice = product.discountPrice && product.discountPrice > 0 ? product.discountPrice : product.price;

    const cartItem = {
      _id: product._id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      price: displayPrice,
      size: selectedSize,
      quantity: quantity
    };
    
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex((item: any) => item._id === product._id && item.size === selectedSize);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert(`${product.name} (Size: ${selectedSize}) added to cart!`);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/slug/${slug}`);
        if (!res.ok) {
          setError('Product not found');
          return;
        }
        const data = await res.json();
        setProduct(data);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (err) {
        setError('Error loading product details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  // Related products for suggestions
  const relatedProducts = Array.from({ length: 4 }).map((_, i) => ({
    id: `related-${i + 1}`,
    slug: `related-${i + 1}`,
    name: 'Elegant Pink Floral Kurti',
    category: 'Casual Wear',
    price: 499 + (i * 50),
    image: '/images/sample.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    isBestSeller: false,
    isNewArrival: true,
  }));

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#881337]" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || 'Product Not Found'}</h2>
        <Link href="/shop" className="text-[#881337] font-semibold hover:underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  const displayPrice = product.discountPrice && product.discountPrice > 0 ? product.discountPrice : product.price;
  const originalPrice = product.discountPrice && product.discountPrice > 0 && product.discountPrice < product.price ? product.price : null;

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex text-sm font-medium text-gray-500 space-x-2">
          <Link href="/" className="hover:text-[#f43f5e]">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="hover:text-[#f43f5e]">Shop</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#1c1917] line-clamp-1">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col md:flex-row gap-4">
            {/* Thumbnails (hidden on mobile, shown on md) */}
            <div className="hidden md:flex flex-col space-y-4 w-24">
              {[1, 2, 3, 4].map((item) => (
                <button key={item} className={`h-32 bg-[#f5f5f5] rounded-xl overflow-hidden border-2 ${item === 1 ? 'border-[#881337]' : 'border-transparent hover:border-gray-300'} transition-all`}>
                  <div className="w-full h-full bg-[#ead6db] flex items-center justify-center text-[#881337] opacity-60 text-xs text-center p-2">
                    Angle {item}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-1 rounded-2xl md:rounded-[2rem] overflow-hidden bg-[#f5f5f5] relative group aspect-[4/5] md:aspect-auto md:h-[600px]">
              {product.isBestSeller && (
                <div className="absolute top-4 left-4 z-10 bg-[#881337] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Best Seller
                </div>
              )}
              {product.isNewArrival && !product.isBestSeller && (
                <div className="absolute top-4 left-4 z-10 bg-[#f59e0b] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  New Arrival
                </div>
              )}
              
              {product.image && product.image.startsWith('/') ? (
                <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${product.image})` }}></div>
              ) : (
                <div className="w-full h-full bg-[#ead6db] flex items-center justify-center text-[#881337]/40 text-2xl font-serif">
                  {product.name}
                </div>
              )}
              
              {/* Mobile Thumbnails overlay format */}
              <div className="absolute bottom-4 left-4 right-4 flex space-x-2 md:hidden overflow-x-auto pb-2 snap-x">
                {[1, 2, 3, 4].map((item) => (
                  <button key={item} className={`snap-center shrink-0 w-16 h-20 bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden border-2 ${item === 1 ? 'border-[#881337]' : 'border-transparent'}`}>
                    <div className="w-full h-full bg-[#ead6db] flex items-center justify-center text-[10px] text-[#881337]">
                      {item}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col lg:py-6">
            <div className="mb-2 flex items-center justify-between mt-6 lg:mt-0">
              <span className="text-sm font-bold text-[#f43f5e] uppercase tracking-widest">{product.category}</span>
              <div className="flex space-x-2">
                <button className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-[#f43f5e] hover:border-[#f43f5e] transition-colors bg-white shadow-sm">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-[#1c1917] hover:border-gray-400 transition-colors bg-white shadow-sm">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1c1917] mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center text-[#f59e0b]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-gray-500 font-medium">({product.numReviews || 0} Reviews)</span>
            </div>
            
            <div className="text-[#881337] font-bold text-3xl md:text-4xl tracking-tight mb-8 flex items-center">
              ₹{displayPrice} 
              {originalPrice && (
                <>
                  <span className="text-gray-400 text-xl md:text-2xl line-through ml-3 font-medium">₹{originalPrice}</span>
                  <span className="text-[#f43f5e] text-sm md:text-base ml-4 font-bold bg-[#fdf2f8] px-3 py-1 rounded-lg">
                    {Math.round(((originalPrice - displayPrice) / originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 font-medium mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Sizing */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-[#1c1917] text-lg">Select Size</span>
                <button className="text-[#f43f5e] text-sm font-semibold underline hover:text-[#881337]">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes && product.sizes.map((size: string) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-base font-semibold transition-all shadow-sm ${selectedSize === size ? 'bg-[#881337] text-white border-none' : 'bg-white border text-gray-600 border-gray-200 hover:border-[#f43f5e] hover:text-[#f43f5e]'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity selector */}
                <div className="flex items-center border border-gray-200 rounded-full h-14 w-full sm:w-32 justify-between px-4 bg-gray-50">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-[#881337] font-bold text-xl px-2">−</button>
                  <span className="font-bold text-[#1c1917]">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-[#881337] font-bold text-xl px-2">+</button>
                </div>
                
                <button onClick={addToCartHandler} className="flex-1 h-14 bg-white border-2 border-[#881337] text-[#881337] hover:bg-[#881337] hover:text-white rounded-full font-bold text-lg shadow-sm transition-colors">
                  Add to Cart
                </button>
              </div>

              {/* Direct Ordering Methods */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <a 
                  href={`https://wa.me/919480971996?text=${encodeURIComponent(`Hi KP Kurtie Points,\nI want to order this product:\n\nProduct Name: ${product.name}\nPrice: ₹${displayPrice}\nSize: ${selectedSize}\nQuantity: ${quantity}\n\nPlease share availability and payment details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center h-14 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-full font-bold text-lg shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  <img src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png" alt="WhatsApp" className="w-5 h-5 mr-2 brightness-0 invert" />
                  Order on WhatsApp
                </a>
                
                <a 
                  href="https://instagram.com/kp.kurtipoint"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center h-14 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white rounded-full font-bold text-lg shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram" className="w-5 h-5 mr-2 brightness-0 invert" />
                  DM on Instagram
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-gray-100 py-6 mb-8">
              <div className="flex items-center text-gray-600">
                <Store className="h-5 w-5 text-[#f43f5e] mr-3" />
                <span className="text-sm font-medium">Store Pickup</span>
              </div>
              <div className="flex items-center text-gray-600">
                <RefreshCw className="h-5 w-5 text-[#f43f5e] mr-3" />
                <span className="text-sm font-medium">7 Days Exchange</span>
              </div>
              <div className="flex items-center text-gray-600">
                <ShieldCheck className="h-5 w-5 text-[#f43f5e] mr-3" />
                <span className="text-sm font-medium">Secure Checkout</span>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div>
              <div className="flex space-x-6 border-b border-gray-200 mb-6 font-medium text-lg">
                <button 
                  onClick={() => setActiveTab('description')}
                  className={`pb-3 border-b-2 transition-colors ${activeTab === 'description' ? 'border-[#881337] text-[#881337]' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
                >
                  Description
                </button>
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`pb-3 border-b-2 transition-colors ${activeTab === 'details' ? 'border-[#881337] text-[#881337]' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
                >
                  Details
                </button>
                <button 
                  onClick={() => setActiveTab('store')}
                  className={`pb-3 border-b-2 transition-colors ${activeTab === 'store' ? 'border-[#881337] text-[#881337]' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
                >
                  In-Store Experience
                </button>
              </div>
              
              <div className="text-gray-600 font-medium text-[15px] leading-relaxed">
                {activeTab === 'description' && (
                  <p>{product.description}</p>
                )}
                {activeTab === 'details' && (
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Fabric:</strong> {product.fabric || 'Premium Cotton Blend'}</li>
                    <li><strong>Category:</strong> {product.category}</li>
                    <li><strong>Brand:</strong> {product.brand}</li>
                    <li><strong>Status:</strong> <span className={product.status === 'out_of_stock' ? 'text-red-500' : 'text-green-500'}>{product.status === 'out_of_stock' ? 'Out of Stock' : 'Available'}</span></li>
                  </ul>
                )}
                {activeTab === 'store' && (
                  <div>
                    <p className="mb-2"><strong>Offline Only:</strong> We believe in you seeing and feeling the quality firsthand.</p>
                    <p>All purchases are finalized via WhatsApp and picked up locally at our Bangalore store.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <h2 className="font-serif text-3xl font-bold text-[#1c1917] mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>

    </div>
  );
}
