import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Truck, RefreshCcw, Share2, Heart, User, Package, Camera, Tag, X, Check } from 'lucide-react';
import { PRODUCT, WHATSAPP_NUMBER, VALID_COUPONS } from '../constants';

interface HeroProps {
  appliedCoupon: string | null;
  setAppliedCoupon: (code: string | null) => void;
}

const Hero: React.FC<HeroProps> = ({ appliedCoupon, setAppliedCoupon }) => {
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  // Calculate prices
  const currentPrice = appliedCoupon 
    ? Math.round(PRODUCT.price * 0.95) 
    : PRODUCT.price;
  
  const savings = PRODUCT.mrp - currentPrice;

  // Reset to the model shot (index 0) whenever color changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedColor]);

  const handleApplyCoupon = () => {
    if (!couponInput) return;
    
    if (VALID_COUPONS.includes(couponInput.toUpperCase())) {
      setAppliedCoupon(couponInput.toUpperCase());
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
  };

  const handleWhatsAppBuy = () => {
    let message = `Hi Bharat.style, I would like to buy the ${PRODUCT.name} in ${selectedColor.name}.`;
    if (appliedCoupon) {
      message += ` I have applied coupon ${appliedCoupon}. Price: ₹${currentPrice}.`;
    }
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getImageLabel = (idx: number) => {
    switch (idx) {
      case 0: return "Model";
      case 1: return "Product";
      case 2: return "Flat Lay";
      default: return `View ${idx + 1}`;
    }
  };

  const getImageIcon = (idx: number) => {
    switch (idx) {
      case 0: return <User size={16} />;
      case 1: return <Package size={16} />;
      case 2: return <Camera size={16} />;
      default: return <Package size={16} />;
    }
  };

  return (
    <div className="bg-stone-50 pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          
          {/* Image Gallery Section */}
          <div className="lg:col-span-7">
            <div className="flex flex-col-reverse sm:flex-row gap-4">
              
              {/* Vertical Thumbnails (Hidden on small screens, shown on sm+) */}
              <div className="hidden sm:flex flex-col gap-4 w-24">
                 {selectedColor.images.map((img, idx) => (
                   <div 
                     key={idx}
                     onClick={() => setActiveImageIndex(idx)}
                     className={`
                       aspect-square rounded-lg bg-stone-200 overflow-hidden cursor-pointer relative
                       transition-all duration-300 border-2
                       ${activeImageIndex === idx 
                         ? 'border-brand-green opacity-100 ring-1 ring-brand-green/50' 
                         : 'border-transparent opacity-70 hover:opacity-100'}
                     `}
                   >
                      <img 
                        src={img} 
                        className="w-full h-full object-cover" 
                        alt={`${PRODUCT.name} view ${idx + 1}`}
                        width="96"
                        height="96"
                      />
                      {/* View Type Label */}
                      <div className="absolute bottom-0 inset-x-0 bg-black/50 text-[10px] text-white text-center py-1 font-medium">
                        {getImageLabel(idx)}
                      </div>
                   </div>
                 ))}
              </div>

              {/* Main Image Area */}
              <div className="flex-1 relative aspect-square sm:aspect-[4/3] lg:aspect-[1/1] overflow-hidden rounded-2xl bg-stone-200 shadow-xl group">
                <img
                  src={selectedColor.images[activeImageIndex]} 
                  alt={`${PRODUCT.name} - ${selectedColor.name}`}
                  className="object-cover w-full h-full transform transition duration-700 hover:scale-105"
                  width="800"
                  height="800"
                  // Main product image is critical, so we use eager loading
                  loading="eager"
                  fetchPriority="high"
                />
                
                {/* Image Overlays */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-md">
                    {PRODUCT.discountPercentage}% OFF
                  </span>
                </div>
                <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-red-500 transition shadow-sm">
                  <Heart size={20} />
                </button>

                {/* Mobile Thumbnail Overlay (Dots) */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 sm:hidden z-10">
                  {selectedColor.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-2 w-2 rounded-full transition-all shadow-sm ${activeImageIndex === idx ? 'bg-brand-green w-6' : 'bg-white/80'}`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Horizontal Buttons (Visible only on small screens) */}
            <div className="mt-4 grid grid-cols-3 gap-3 sm:hidden">
                {selectedColor.images.map((img, idx) => (
                   <button 
                     key={idx}
                     onClick={() => setActiveImageIndex(idx)}
                     className={`
                       flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium border
                       ${activeImageIndex === idx 
                         ? 'bg-stone-900 text-white border-stone-900' 
                         : 'bg-white text-stone-600 border-stone-200'}
                     `}
                   >
                      {getImageIcon(idx)}
                      {getImageLabel(idx)}
                   </button>
                 ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="lg:col-span-5 mt-10 lg:mt-0">
            {/* Breadcrumbs */}
            <nav className="flex text-sm text-stone-500 mb-4">
              <ol className="flex items-center space-x-2">
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="hover:text-stone-900 transition font-serif font-bold">
                    Bharat.style
                  </a>
                </li>
                <li>/</li>
                <li>
                  <span className="text-stone-500 cursor-default">Women</span>
                </li>
                <li>/</li>
                <li className="text-stone-900 font-medium">Sling Bags</li>
              </ol>
            </nav>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              {PRODUCT.name}
            </h1>
            <p className="mt-2 text-lg text-stone-600 font-medium">{PRODUCT.tagline}</p>

            {/* Ratings */}
            <div className="mt-3 flex items-center">
              <div className="flex items-center text-yellow-500">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star key={rating} className="flex-shrink-0 h-5 w-5 fill-current" />
                ))}
              </div>
              <p 
                onClick={() => scrollToSection('reviews')}
                className="ml-3 text-sm text-stone-500 hover:text-stone-700 cursor-pointer underline decoration-stone-300 hover:decoration-stone-500 underline-offset-2 transition"
              >
                48 reviews
              </p>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-end flex-wrap gap-2">
              <p className="text-4xl font-serif font-bold text-stone-900 tracking-tight">₹{currentPrice}</p>
              
              {appliedCoupon ? (
                <div className="flex flex-col mb-1 ml-2">
                    <p className="text-sm text-stone-400 line-through">₹{PRODUCT.price}</p>
                    <p className="text-sm text-stone-400 line-through">MRP ₹{PRODUCT.mrp}</p>
                </div>
              ) : (
                <p className="ml-1 text-lg text-stone-400 line-through mb-1">₹{PRODUCT.mrp}</p>
              )}
              
              <p className="ml-2 text-sm font-semibold text-red-600 mb-2">
                (Save ₹{savings})
              </p>
            </div>
            <p className="mt-1 text-sm text-stone-500">Inclusive of all taxes</p>

            <hr className="my-6 border-stone-200" />

            {/* Color Selector */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-stone-900">Colour: <span className="text-stone-600 font-normal">{selectedColor.name}</span></h3>
              <div className="mt-3 flex items-center space-x-3">
                {PRODUCT.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`
                      relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-offset-2
                      ${selectedColor.name === color.name ? 'ring-2 ring-stone-900' : 'ring-transparent hover:ring-1 hover:ring-stone-300'}
                    `}
                    aria-label={color.name}
                  >
                    <span
                      aria-hidden="true"
                      className="h-8 w-8 rounded-full border border-black border-opacity-10"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Coupon Section */}
            <div className="mt-6 bg-stone-100/50 p-4 rounded-xl border border-stone-200">
               <div className="flex items-center gap-2 mb-2">
                 <Tag size={16} className="text-stone-500" />
                 <span className="text-sm font-bold text-stone-800">Have a coupon?</span>
               </div>
               
               {appliedCoupon ? (
                 <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                       <div className="bg-green-100 p-1 rounded-full">
                         <Check size={14} className="text-green-600" />
                       </div>
                       <div>
                         <p className="text-sm font-bold text-green-800">Code {appliedCoupon} applied!</p>
                         <p className="text-xs text-green-600">You saved extra 5%</p>
                       </div>
                    </div>
                    <button 
                      onClick={handleRemoveCoupon} 
                      className="text-stone-400 hover:text-stone-600 p-1"
                      title="Remove coupon"
                    >
                      <X size={18} />
                    </button>
                 </div>
               ) : (
                 <div className="flex gap-2">
                    <div className="flex-1 relative">
                       <input 
                         type="text" 
                         value={couponInput}
                         onChange={(e) => {
                           setCouponInput(e.target.value);
                           setCouponError('');
                         }}
                         placeholder="Enter code" 
                         className={`w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400 uppercase ${couponError ? 'border-red-300 bg-red-50' : 'border-stone-300'}`}
                       />
                       {couponError && <p className="absolute -bottom-5 left-0 text-xs text-red-500">{couponError}</p>}
                    </div>
                    <button 
                      onClick={handleApplyCoupon}
                      className="bg-stone-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-stone-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!couponInput}
                    >
                      Apply
                    </button>
                 </div>
               )}
            </div>

            {/* Main CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleWhatsAppBuy}
                className="flex-1 bg-green-600 border border-transparent rounded-xl py-4 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg shadow-green-200 transition-all transform hover:-translate-y-0.5"
              >
                <span>Buy Now on WhatsApp</span>
              </button>
              <button
                className="flex-0.5 bg-white border border-stone-300 rounded-xl py-4 px-4 flex items-center justify-center text-stone-700 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 transition"
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* Features / Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <Truck size={18} className="text-brand-green" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <RefreshCcw size={18} className="text-brand-green" />
                <span>10-Day Returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <ShieldCheck size={18} className="text-brand-green" />
                <span>Secure Payment</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;