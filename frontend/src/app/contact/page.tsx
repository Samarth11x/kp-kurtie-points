import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-[#fffbeb] min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#fdf2f8] py-16 md:py-24 border-b border-[#f43f5e]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#881337] mb-6">Contact Us</h1>
          <p className="text-lg text-[#f43f5e] font-medium max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about sizes, in-store availability, or just want to say hi!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Contact Information */}
          <div className="w-full lg:w-1/3">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1c1917] mb-8">Get In Touch</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#f43f5e] shadow-sm shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-[#1c1917] text-lg mb-1">Our Location</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    Near CHM Park, Closed to Hoysala Nagar, Indira Nagar <br />
                    Bangalore, Karnataka <br />
                    India 560038
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#f43f5e] shadow-sm shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-[#1c1917] text-lg mb-1">Phone / WhatsApp</h3>
                  <p className="text-gray-600 font-medium">+91 94809 71996</p>
                  <p className="text-gray-500 text-sm mt-1">24/7</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#f43f5e] shadow-sm shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-[#1c1917] text-lg mb-1">Email</h3>
                  <p className="text-gray-600 font-medium">kp.kurtiepoint@gmail.com</p>
                  <p className="text-gray-600 font-medium mt-1">support@kp.kurtiepoints.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#f43f5e] shadow-sm shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-[#1c1917] text-lg mb-1">Business Hours</h3>
                  <p className="text-gray-600 font-medium">Everyday</p>
                  <p className="text-[#881337] font-bold mt-1">5:30 PM - 09:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-[#881337] p-8 rounded-3xl text-white text-center shadow-lg">
              <h3 className="font-serif text-2xl font-bold mb-3">Quick Support?</h3>
              <p className="text-white/80 mb-6 font-medium">Message us on WhatsApp for lightning fast replies.</p>
              <button className="bg-[#25D366] text-white hover:bg-white hover:text-[#25D366] w-full py-4 rounded-full font-bold text-lg shadow-md transition-colors flex items-center justify-center">
                Chat on WhatsApp
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-sm border border-gray-100 h-full">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1c1917] mb-2">Send us a message</h2>
              <p className="text-gray-500 font-medium mb-8">We usually reply within 24 hours.</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                    <input type="text" className="w-full h-14 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-medium bg-gray-50 focus:bg-white transition-colors" placeholder="Jane" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                    <input type="text" className="w-full h-14 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-medium bg-gray-50 focus:bg-white transition-colors" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input type="email" className="w-full h-14 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-medium bg-gray-50 focus:bg-white transition-colors" placeholder="jane@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number (Optional)</label>
                    <input type="tel" className="w-full h-14 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-medium bg-gray-50 focus:bg-white transition-colors" placeholder="+91" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                  <select className="w-full h-14 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-medium bg-gray-50 focus:bg-white transition-colors text-gray-700">
                    <option>Order Inquiry</option>
                    <option>Product Exchange</option>
                    <option>Product Information</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea rows={5} className="w-full rounded-xl border border-gray-200 p-4 focus:outline-none focus:border-[#881337] focus:ring-1 focus:ring-[#881337] font-medium bg-gray-50 focus:bg-white transition-colors resize-none" placeholder="How can we help you today?"></textarea>
                </div>

                <div className="pt-2">
                  <button type="button" className="inline-flex items-center justify-center px-10 h-14 bg-[#881337] hover:bg-[#f43f5e] text-white rounded-full font-bold text-lg shadow-md transition-all transform hover:-translate-y-0.5 w-full sm:w-auto">
                    <Send className="w-5 h-5 mr-2" /> Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
