import React from 'react';
import { Star } from 'lucide-react';
import { REVIEWS } from '../constants';

const Reviews: React.FC = () => {
  return (
    <div id="reviews" className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif font-bold text-center text-stone-900 mb-12">
          Loved by <span className="text-brand-green italic">Desi Girls</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-stone-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={`${i < review.rating ? 'text-yellow-400 fill-current' : 'text-stone-300'}`} 
                  />
                ))}
              </div>
              <p className="text-stone-700 italic mb-6">"{review.text}"</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900">{review.author}</span>
                <span className="text-xs text-stone-400">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;