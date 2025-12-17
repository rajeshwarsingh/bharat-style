import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { INSTAGRAM_HANDLE } from '../constants';

const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

const InstagramCTA: React.FC = () => {
  const handleClick = () => {
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'instagram_click', { placement: 'instagram_cta' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-stone-50 to-white border-y border-stone-200 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <div className="bg-pink-50 text-pink-600 rounded-full p-3">
              <Instagram size={22} />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Follow us on Instagram
              </h3>
              <p className="mt-2 text-stone-600 max-w-2xl">
                New drops, real customer photos, styling ideas, and behind-the-scenes artisan stories.
              </p>
              <p className="mt-2 text-sm text-stone-500">
                @{INSTAGRAM_HANDLE}
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-pink-700 hover:to-purple-700 transition shadow-md"
            >
              <span>Follow @{INSTAGRAM_HANDLE}</span>
              <ExternalLink size={18} />
            </a>
            <p className="mt-2 text-xs text-stone-500 text-center md:text-left">
              Opens in Instagram
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramCTA;


