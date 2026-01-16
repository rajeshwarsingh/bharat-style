import React, { useEffect, useState } from 'react';
import { X, Sparkles, Star, Truck, Shield, ArrowRight } from 'lucide-react';
import { PRODUCT, REVIEWS } from '../constants';
import { cloudinaryTransform } from '../utils/cloudinary';
import { Link } from 'react-router-dom';

const WelcomeModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasSeenWelcome = localStorage.getItem('bharat-style-welcome-seen');
    
    if (!hasSeenWelcome) {
      let closeTimer: NodeJS.Timeout;
      let markSeenTimer: NodeJS.Timeout;
      
      // Wait 2.5 seconds before showing (gives page time to load)
      const initialDelay = setTimeout(() => {
        setShouldRender(true);
        // Small delay for smooth entrance animation
        setTimeout(() => setIsVisible(true), 300);
        
        // Mark as seen after 4 seconds
        markSeenTimer = setTimeout(() => {
          localStorage.setItem('bharat-style-welcome-seen', 'true');
        }, 4300);
        
        // Auto-close after 8 seconds (longer for sales)
        closeTimer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => setShouldRender(false), 500);
        }, 8300);
      }, 2500);
      
      return () => {
        clearTimeout(initialDelay);
        if (closeTimer) clearTimeout(closeTimer);
        if (markSeenTimer) clearTimeout(markSeenTimer);
      };
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('bharat-style-welcome-seen', 'true');
    setTimeout(() => setShouldRender(false), 500);
  };

  const handleShopClick = () => {
    handleClose();
    // Track conversion event
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'welcome_modal_cta_click', { cta: 'shop_now' });
    }
    // Scroll to product section
    setTimeout(() => {
      document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  if (!shouldRender) return null;

  // Use first color variant image
  const productImage = PRODUCT.colors[0]?.images[1] || PRODUCT.colors[0]?.images[0];
  const savings = PRODUCT.mrp - PRODUCT.price;
  const avgRating = REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Main Sales-Optimized Modal */}
      <div
        className={`relative bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md mx-4 transform transition-all duration-500 border-2 border-stone-200 dark:border-stone-700 dark:bg-stone-800 ${
          isVisible ? 'scale-100 rotate-0' : 'scale-90 opacity-0'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300 transition-colors p-1.5"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Exclusive Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 border border-pink-200 dark:border-pink-800">
            <Sparkles size={14} className="text-pink-600 dark:text-pink-400" />
            <span className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wide">
              Exclusive Welcome Offer
            </span>
          </span>
        </div>

        {/* Product Image */}
        <div className="mb-5">
          <div className="relative w-40 h-40 mx-auto rounded-2xl overflow-hidden ring-2 ring-pink-200 dark:ring-pink-900/50 shadow-xl">
            <img
              src={cloudinaryTransform(productImage, { w: 300, h: 300, c: 'fill' })}
              alt={PRODUCT.name}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Social Proof - Rating */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={`${i < Math.round(avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-stone-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">{avgRating.toFixed(1)}</span>
          <span className="text-xs text-stone-500 dark:text-stone-400">({REVIEWS.length}+ reviews)</span>
        </div>

        {/* Value Proposition */}
        <div className="text-center mb-5">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-3">
            Save ₹{savings} Today!
          </h2>
          
          {/* Price with savings */}
          <div className="flex items-baseline justify-center gap-3 mb-3">
            <span className="text-4xl font-bold text-stone-900 dark:text-stone-100">Only ₹{PRODUCT.price}</span>
            <span className="text-xl text-stone-400 dark:text-stone-500 line-through">₹{PRODUCT.mrp}</span>
          </div>
          
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
            <span className="text-sm font-bold text-red-600 dark:text-red-400">{PRODUCT.discountPercentage}% OFF</span>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
            <Truck size={16} className="text-green-600 dark:text-green-400" />
            <span>Free Delivery</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
            <Shield size={16} className="text-blue-600 dark:text-blue-400" />
            <span>10-Day Returns</span>
          </div>
        </div>

        {/* Primary CTA */}
        <Link
          to="/"
          onClick={handleShopClick}
          className="block w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white py-4 px-6 rounded-2xl font-bold text-center shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] mb-3 flex items-center justify-center gap-2"
        >
          <span>Shop Now & Save</span>
          <ArrowRight size={18} />
        </Link>

        {/* Secondary CTA */}
        <button
          onClick={handleClose}
          className="w-full text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors py-2"
        >
          Continue Browsing
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
