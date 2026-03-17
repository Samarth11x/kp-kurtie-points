import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Hero Section */}
      <div className="relative bg-[#fdf2f8] py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex flex-col items-center justify-center mb-8">
            <Image 
              src="/icon-192x192.png" 
              alt="KP Kurtie Points Logo" 
              width={100} 
              height={100} 
              className="rounded-full shadow-lg border-4 border-white mb-6"
            />
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#881337] mb-6 tracking-tight">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-[#f43f5e] font-serif max-w-2xl mx-auto italic">
              "Style that speaks for itself, comfort that feels like home."
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f43f5e]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#881337]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[550px] mb-16 lg:mb-0 flex justify-center items-center">
            {/* Decorative background circle */}
            <div className="absolute w-[90%] md:w-[70%] max-w-[400px] aspect-square bg-[#fdf2f8] rounded-full -z-10 blur-xl opacity-70"></div>
            
            <div className="relative w-full max-w-[420px] h-[450px] md:h-[550px] mx-auto md:ml-auto">
              {/* Top Right: Fun sticker selfie (Now on Top) */}
              <div className="absolute -top-6 md:-top-8 right-0 w-[70%] h-[75%] rounded-[2rem] overflow-hidden shadow-2xl z-20 border-[6px] border-white bg-white translate-x-[20px] -translate-y-[20px]">
                <Image 
                  src="/images/founder2.png" 
                  alt="Khushi & Pooja - fun sticker selfie" 
                  fill 
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 70vw, 40vw"
                  priority
                />
              </div>
              
              {/* Bottom Left: Outdoor image (Now Underneath) */}
              <div className="absolute bottom-0 left-0 w-[65%] h-[70%] rounded-[2rem] overflow-hidden shadow-xl z-10 border-[6px] border-white bg-white">
                <Image 
                  src="/images/founder3.png" 
                  alt="Khushi & Pooja outdoors" 
                  fill 
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 60vw, 30vw"
                />
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 lg:pl-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1c1917] mb-6">
              Meet Khushi & Pooja
            </h2>
            <div className="space-y-6 text-[#3f3f46] text-lg leading-relaxed font-medium">
              <p>
                What started as a shared passion for fashion between two college friends has now blossomed into KP Kurtie Points — a brand built on the belief that every girl deserves to feel beautiful and comfortable without breaking the bank.
              </p>
              <p>
                We noticed a gap in the market: beautiful ethnic wear was often too expensive, while affordable options compromised on fabric quality and style. We wanted the best of both worlds.
              </p>
              <p>
                That's when we decided to start curating our own collection. Our short kurties are specifically handpicked keeping in mind the modern Indian girl. Whether you're heading to a morning lecture, an office meeting, or a festive get-together, our designs ensure you step out in style.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-[#881337] text-xl mb-2">Our Mission</h3>
                <p className="text-gray-600 font-medium">To provide trendy, affordable, and comfortable ethnic wear for every mood.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#881337] text-xl mb-2">Our Promise</h3>
                <p className="text-gray-600 font-medium">No compromises on fabric quality. What you see is exactly what you get.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-32 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1c1917] mb-16">Why Choose KP Kurtie Points?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-[#fffbeb] p-10 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#fdf2f8] text-[#f43f5e] rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">✨</div>
              <h3 className="font-bold text-xl text-[#1c1917] mb-4">Handpicked Designs</h3>
              <p className="text-gray-600 font-medium leading-relaxed">Every piece in our collection is personally selected to ensure it meets current fashion trends while remaining timeless.</p>
            </div>
            
            <div className="bg-[#f5f5f5] p-10 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#e2ced4] text-[#881337] rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">🧵</div>
              <h3 className="font-bold text-xl text-[#1c1917] mb-4">Premium Fabrics</h3>
              <p className="text-gray-600 font-medium leading-relaxed">We prioritize breathable cottons and comfortable blends so you can wear our kurties all day without discomfort.</p>
            </div>
            
            <div className="bg-[#fdf2f8] p-10 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-white text-[#f43f5e] rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">💖</div>
              <h3 className="font-bold text-xl text-[#1c1917] mb-4">Made With Love</h3>
              <p className="text-gray-600 font-medium leading-relaxed">As a small business, every order matters to us. We pack each piece with care, love, and a personal touch.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-32 text-center bg-[#881337] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[#f43f5e]/20" style={{ backgroundImage: 'radial-gradient(circle at 20% 150%, rgba(255,255,255,0.15) 0%, transparent 50%)' }}></div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 relative z-10">Join Our Family</h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-medium relative z-10">
            Be part of our growing community of fashion lovers. Follow us on Instagram to see how our customers style their KP Kurties.
          </p>
          <Link href="/shop" className="inline-block bg-white text-[#881337] hover:bg-[#fffbeb] px-10 py-4 rounded-full font-bold text-lg shadow-lg transition-transform hover:-translate-y-1 relative z-10">
            Explore The Collection
          </Link>
        </div>
      </div>
      
    </div>
  );
}
