import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import SEO from './SEO';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-stone-50 px-4 text-center">
      <SEO 
        title="Page Not Found" 
        description="The page you are looking for does not exist. Return to Bharat.style shop."
        canonicalUrl="https://bharat.style/404"
        noindex
      />
      <h1 className="text-9xl font-serif font-bold text-jute-300">404</h1>
      <h2 className="text-2xl font-bold text-stone-900 mt-4">Page Not Found</h2>
      <p className="text-stone-600 mt-2 max-w-md">
        Oops! The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link 
        to="/"
        className="mt-8 flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-stone-800 transition"
      >
        <Home size={20} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;