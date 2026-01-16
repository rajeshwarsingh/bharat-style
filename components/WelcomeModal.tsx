import React, { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { PRODUCT } from '../constants';
import { cloudinaryTransform } from '../utils/cloudinary';

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
        
        // Auto-close after 6 seconds of being visible
        closeTimer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => setShouldRender(false), 500);
        }, 6300);
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

  if (!shouldRender) return null;

  // Use first color variant image
  const productImage = PRODUCT.colors[0]?.images[1] || PRODUCT.colors[0]?.images[0];

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Background Overlay - Soft pink tint */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-pink-50/80 via-rose-50/60 to-orange-50/80 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Main Welcome Card - Minimal & Elegant */}
      <div
        className={`relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl max-w-sm mx-4 transform transition-all duration-500 border border-pink-100 dark:border-stone-700 dark:bg-stone-800/95 ${
          isVisible ? 'scale-100 rotate-0' : 'scale-90 opacity-0'
        }`}
      >
        {/* Close Button - Subtle */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-stone-300 hover:text-stone-500 dark:text-stone-500 dark:hover:text-stone-300 transition-colors p-1.5"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Product Image Preview - Elegant */}
        <div className="mb-6 -mt-4">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-pink-100 dark:ring-pink-900/30 shadow-lg">
            <img
              src={cloudinaryTransform(productImage, { w: 200, h: 200, c: 'fill', g: 'face' })}
              alt="Handmade jute bag"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent" />
          </div>
        </div>

        {/* Minimal Text */}
        <div className="text-center space-y-4">
          {/* Sparkle icon */}
          <div className="flex justify-center mb-2">
            <Sparkles 
              size={24} 
              className="text-pink-400 dark:text-pink-500 animate-pulse" 
            />
          </div>

          {/* Main heading - Elegant & Feminine */}
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-800 dark:text-stone-100 leading-tight">
            Handcrafted for You
          </h2>
          
          {/* Subtext - Minimal */}
          <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed px-2">
            Unique designs • Made with love
          </p>

          {/* Price - Elegant */}
          <div className="pt-4 pb-2">
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-1 font-light tracking-wide">
              STARTING AT
            </p>
            <p className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
              ₹{PRODUCT.price}
            </p>
          </div>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-pink-400 dark:bg-pink-500"></div>
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
