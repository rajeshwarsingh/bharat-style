import React, { useState } from 'react';
import { Instagram, Phone, Mail, MapPin, X, CreditCard } from 'lucide-react';
import { INSTAGRAM_HANDLE, WHATSAPP_NUMBER } from '../constants';

const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const POLICIES: Record<string, { title: string; content: React.ReactNode }> = {
    track: {
      title: "Track Your Order",
      content: (
        <div className="space-y-4 text-stone-600">
          <p><strong>WhatsApp Orders:</strong> You will receive a tracking link directly on your WhatsApp number once your order is dispatched (usually within 24 hours of placing the order).</p>
          <p><strong>Amazon Orders:</strong> Please check the 'My Orders' section in your Amazon App for real-time tracking.</p>
          <p className="pt-2 border-t border-stone-100">Need help? Click the WhatsApp button below to chat with our support team.</p>
        </div>
      )
    },
    returns: {
      title: "Returns & Exchange Policy",
      content: (
        <div className="space-y-4 text-stone-600">
          <p>We offer a hassle-free <strong>10-Day No-Questions-Asked Return Policy</strong>.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>If you receive a damaged item or don't love the product, you can return it within 10 days of delivery.</li>
            <li>The product must be unused and in original packaging with tags intact.</li>
            <li>Refunds are processed to your original payment mode within 48 hours of pickup.</li>
          </ul>
          <p className="text-sm text-stone-500 italic pt-2">To initiate a return, simply message us on WhatsApp with your Order ID.</p>
        </div>
      )
    },
    shipping: {
      title: "Shipping Policy",
      content: (
        <div className="space-y-4 text-stone-600">
          <p><strong>Free Shipping:</strong> We offer free shipping on all prepaid orders across India. Cash on Delivery (COD) may carry a small handling fee.</p>
          <p><strong>Dispatch Time:</strong> Orders are packed and dispatched within 24-48 hours.</p>
          <div>
            <strong>Estimated Delivery Time:</strong>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li>Metro Cities: 3-5 Business Days</li>
              <li>Rest of India: 5-7 Business Days</li>
              <li>Remote Areas: 7-10 Business Days</li>
            </ul>
          </div>
          <p className="text-sm">We use premium courier partners like Bluedart, Delhivery, and Xpressbees.</p>
        </div>
      )
    },
    faqs: {
      title: "Frequently Asked Questions",
      content: (
        <div className="space-y-5 text-stone-600">
          <div>
            <p className="font-bold text-stone-900">Q: Is the bag washable?</p>
            <p className="mt-1">A: Jute is a natural fiber. We recommend spot cleaning with a damp cloth for stains. Do not machine wash or soak in water.</p>
          </div>
          <div>
            <p className="font-bold text-stone-900">Q: Is the strap adjustable?</p>
            <p className="mt-1">A: Yes, the long strap is fully adjustable, making it perfect for both shoulder and crossbody use for women of all heights.</p>
          </div>
          <div>
            <p className="font-bold text-stone-900">Q: Does it have a zip closure?</p>
            <p className="mt-1">A: Yes, the main compartment has a high-quality zip closure to keep your essentials safe. It also has a small inner pocket.</p>
          </div>
          <div>
            <p className="font-bold text-stone-900">Q: Is it eco-friendly?</p>
            <p className="mt-1">A: Absolutely! The bag is made from 100% biodegradable jute and cotton, making it a sustainable choice.</p>
          </div>
        </div>
      )
    }
  };

  const openModal = (e: React.MouseEvent, modalType: string) => {
    e.preventDefault();
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <footer className="bg-stone-900 text-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-white text-2xl font-serif font-bold">Bharat<span className="text-brand-green">.style</span></h3>
              <p className="text-stone-400 text-sm mb-2">by TheTidbit</p>
              <p className="mt-4 max-w-xs text-sm text-stone-400">
                Sustainable fashion for the conscious soul. Handmade in India 🇮🇳 with love and jute.
              </p>
              <div className="mt-6 flex space-x-6">
                <a 
                  href={`https://instagram.com/${INSTAGRAM_HANDLE}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-white transition"
                >
                  <span className="sr-only">Instagram</span>
                  <Instagram size={24} />
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-stone-400 hover:text-white transition">
                  <span className="sr-only">WhatsApp</span>
                  <Phone size={24} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h4>
              <ul className="mt-4 space-y-4">
                <li><a href="#" onClick={(e) => openModal(e, 'track')} className="text-sm hover:text-white transition">Track Order</a></li>
                <li><a href="#" onClick={(e) => openModal(e, 'returns')} className="text-sm hover:text-white transition">Returns & Exchange</a></li>
                <li><a href="#" onClick={(e) => openModal(e, 'shipping')} className="text-sm hover:text-white transition">Shipping Policy</a></li>
                <li><a href="#" onClick={(e) => openModal(e, 'faqs')} className="text-sm hover:text-white transition">FAQs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Contact</h4>
              <ul className="mt-4 space-y-4">
                <li className="flex items-center gap-2 text-sm">
                  <Mail size={16} /> support@thetidbit.in
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <MapPin size={16} /> Mumbai(Ambernath), India
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-stone-400">&copy; {new Date().getFullYear()} Bharat.style by TheTidbit. All rights reserved.</p>
            
            {/* Payment Icons */}
            <div className="flex gap-3 items-center opacity-70 grayscale hover:grayscale-0 transition-all">
              {/* Visa */}
              <div className="h-6 w-10 bg-stone-200 rounded flex items-center justify-center border border-stone-300 overflow-hidden" title="Visa">
                 <span className="text-[10px] font-extrabold text-blue-900 italic tracking-tighter">VISA</span>
              </div>
              {/* Mastercard */}
              <div className="h-6 w-10 bg-stone-200 rounded flex items-center justify-center border border-stone-300 overflow-hidden" title="Mastercard">
                 <div className="flex -space-x-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-600/90 mix-blend-multiply"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/90 mix-blend-multiply"></div>
                 </div>
              </div>
              {/* UPI */}
              <div className="h-6 w-10 bg-stone-200 rounded flex items-center justify-center border border-stone-300 overflow-hidden" title="UPI">
                 <span className="text-[9px] font-bold text-stone-800">UPI</span>
              </div>
              {/* Generic Card */}
              <div className="h-6 w-10 bg-stone-200 rounded flex items-center justify-center border border-stone-300 overflow-hidden" title="Secure Payment">
                <CreditCard size={14} className="text-stone-600" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Info Modal */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
               <h3 className="text-xl font-serif font-bold text-stone-900">
                 {POLICIES[activeModal].title}
               </h3>
               <button 
                 onClick={closeModal}
                 className="text-stone-400 hover:text-stone-800 transition p-1 rounded-full hover:bg-stone-200"
               >
                 <X size={20} />
               </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
               {POLICIES[activeModal].content}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex justify-end">
               <button 
                 onClick={closeModal}
                 className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-800 transition"
               >
                 Close
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;