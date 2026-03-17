import Link from 'next/link';
import { Instagram, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1c1917] text-[#fffbeb] pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div>
            <h3 className="font-serif text-2xl font-bold tracking-tight text-[#fdf2f8] mb-4">
              KP Kurtie Points
            </h3>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Trendy, comfortable, and elegant short kurties for everyday wear. Style that speaks for itself.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/kp.kurtipoint" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-[#3f3f46] flex items-center justify-center hover:bg-[#f43f5e] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-[#3f3f46] flex items-center justify-center hover:bg-[#25D366] transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-lg mb-4 text-[#fdf2f8]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/shop" className="hover:text-[#fdf2f8] transition-colors">Shop All</Link></li>
              <li><Link href="/shop?category=new" className="hover:text-[#fdf2f8] transition-colors">New Arrivals</Link></li>
              <li><Link href="/about" className="hover:text-[#fdf2f8] transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-[#fdf2f8] transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-[#fdf2f8] transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-medium text-lg mb-4 text-[#fdf2f8]">Policies</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-[#fdf2f8] transition-colors">Store Locations</Link></li>
              <li><Link href="/returns" className="hover:text-[#fdf2f8] transition-colors">Exchange Policy</Link></li>
              <li><Link href="/privacy" className="hover:text-[#fdf2f8] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#fdf2f8] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-lg mb-4 text-[#fdf2f8]">Get In Touch</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 text-[#f43f5e]" />
                <span>Near CHM Park, Closed to Hoysala Nagar, Indira Nagar, Bangalore, Karnataka 560038</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0 text-[#f43f5e]" />
                <span>+91 94809 71996</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0 text-[#f43f5e]" />
                <span>kp.kurtiepoint@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} KP Kurtie Points. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4 items-center">
            <Link href="/admin" className="text-gray-600 hover:text-gray-400 font-medium transition-colors mr-2">Admin Portal</Link>
            <span className="font-semibold text-gray-400 tracking-widest text-[10px] uppercase border-l border-gray-700 pl-4">Secure Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
