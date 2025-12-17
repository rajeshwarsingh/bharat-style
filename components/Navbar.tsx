import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LOGO_URL } from '../constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToCollection = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-stone-600 hover:text-stone-900 p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo Section */}
          <div className="flex-1 flex justify-center sm:justify-start">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-3 group focus:outline-none">
              <img src={LOGO_URL} alt="TheTidbit Logo" className="h-10 w-auto" />
              <div className="flex flex-col items-start">
                 <span className="font-serif text-2xl font-bold text-stone-900 tracking-tight leading-none group-hover:text-brand-green transition-colors">
                    Bharat<span className="text-brand-green">.style</span>
                 </span>
                 <span className="text-[11px] text-stone-500 font-medium tracking-wide leading-none mt-0.5">
                    by TheTidbit
                 </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links - SEO Friendly Links */}
          <div className="hidden sm:flex sm:space-x-8">
            <a 
              href="#collection"
              onClick={handleScrollToCollection}
              className={`text-sm font-medium border-b-2 transition-colors px-3 py-2 ${location.pathname === '/' ? 'text-stone-900 border-brand-green' : 'text-stone-600 border-transparent hover:text-stone-900'}`}
            >
              Shop
            </a>
            <Link 
              to="/about"
              className={`text-sm font-medium border-b-2 transition-colors px-3 py-2 ${location.pathname === '/about' ? 'text-stone-900 border-brand-green' : 'text-stone-600 border-transparent hover:text-stone-900'}`}
            >
              About Bharat.style
            </Link>
            <Link 
              to="/story"
              className={`text-sm font-medium border-b-2 transition-colors px-3 py-2 ${location.pathname === '/story' ? 'text-stone-900 border-brand-green' : 'text-stone-600 border-transparent hover:text-stone-900'}`}
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-stone-100 absolute w-full left-0 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a 
              href="#collection"
              onClick={handleScrollToCollection} 
              className="block w-full text-left px-3 py-2 text-base font-medium text-stone-900 bg-stone-50 rounded-md"
            >
              Shop
            </a>
            <Link 
              to="/about"
              onClick={closeMenu}
              className="block w-full text-left px-3 py-2 text-base font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-900 rounded-md"
            >
              About Bharat.style
            </Link>
            <Link 
              to="/story"
              onClick={closeMenu}
              className="block w-full text-left px-3 py-2 text-base font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-900 rounded-md"
            >
              Our Story
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;