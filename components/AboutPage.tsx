import React, { useEffect } from 'react';
import { ArrowLeft, Users, Globe, Heart, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ARTISAN_STORY_IMAGE, MISSION_IMAGE, LOGO_URL, WHATSAPP_NUMBER, INSTAGRAM_HANDLE } from '../constants';
import SEO from './SEO';
import { cloudinarySrcSet, cloudinaryTransform } from '../utils/cloudinary';

const AboutPage: React.FC = () => {
  // Scroll to top handled by ScrollToTop component in App.tsx

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TheTidbit",
    "alternateName": "Bharat.style",
    "url": "https://bharat.style",
    "logo": LOGO_URL,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": `+${WHATSAPP_NUMBER}`,
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "en"
    },
    "sameAs": [
      `https://instagram.com/${INSTAGRAM_HANDLE}`,
      "https://facebook.com/thetidbit"
    ]
  };

  const values = [
    {
      icon: Leaf,
      title: "Sustainability First",
      desc: "We believe fashion shouldn't cost the Earth. Our primary material, Jute, is 100% biodegradable and requires minimal water to grow."
    },
    {
      icon: Users,
      title: "Artisan Empowerment",
      desc: "We work directly with rural artisans in West Bengal, eliminating middlemen to ensure fair wages and dignified working conditions."
    },
    {
      icon: Heart,
      title: "Handmade with Love",
      desc: "In a world of mass production, we celebrate the imperfect perfection of handmade goods. Every stitch tells a story."
    },
    {
      icon: Globe,
      title: "Indian Roots, Global Spirit",
      desc: "Proudly 'Make in India', we aim to showcase the rich heritage of Indian craftsmanship to the modern global consumer."
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen">
      <SEO 
        title="About Us - Sustainable Fashion Mission"
        description="Discover the story behind Bharat.style by TheTidbit. Connecting rural Indian artisans with the modern world through sustainable, handmade jute fashion."
        canonicalUrl="https://bharat.style/about"
        type="website"
        image={MISSION_IMAGE}
        schema={organizationSchema}
      />
      {/* Hero Section */}
      <div className="relative bg-stone-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
             <img 
               src={cloudinaryTransform(ARTISAN_STORY_IMAGE, { w: 1600 })}
               srcSet={cloudinarySrcSet(ARTISAN_STORY_IMAGE, [768, 1200, 1600, 1920])}
               sizes="100vw"
               alt="Background" 
               className="w-full h-full object-cover" 
               width="1920"
               height="1080"
               decoding="async"
             />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
           <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-6">Welcome to Bharat<span className="text-brand-green-100">.style</span></h1>
           <p className="text-xl text-stone-200 max-w-2xl mx-auto">
             The exclusive online destination for <strong>TheTidbit</strong>'s handcrafted sustainable fashion.
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Navigation Back */}
        <Link 
          to="/"
          className="flex items-center text-stone-500 hover:text-brand-green mb-12 transition group w-fit"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </Link>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
           <div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Our Mission</h2>
              <div className="prose prose-stone prose-lg">
                <p>
                  <strong>Bharat.style</strong> is an initiative by the makers at <strong>TheTidbit</strong>. We started with a simple question: <em>Why must sustainable fashion be boring?</em>
                </p>
                <p>
                  We noticed that while the world was waking up to eco-friendly living, the options for stylish, affordable, and sustainable accessories were limited. At the same time, the incredible skill of traditional jute artisans in India was fighting to survive against plastic and fast fashion.
                </p>
                <p>
                  Through Bharat.style, we connect these two worlds. We curate TheTidbit's designs that appeal to the modern aesthetic—minimal, functional, and chic—while staying true to the raw, earthy beauty of jute.
                </p>
              </div>
           </div>
           <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl bg-stone-200">
               <img 
                src={cloudinaryTransform(MISSION_IMAGE, { w: 1000 })}
                srcSet={cloudinarySrcSet(MISSION_IMAGE, [600, 800, 1000, 1200])}
                sizes="(min-width: 768px) 40vw, 100vw"
                 alt="Natural Jute Texture" 
                 className="w-full h-full object-cover"
                 loading="lazy"
                 width="800"
                 height="600"
                decoding="async"
               />
           </div>
        </div>

        {/* Brand Identity Section (New) */}
        <div className="mb-24 py-16 bg-white rounded-3xl shadow-sm border border-stone-100 text-center px-6">
           <div className="max-w-3xl mx-auto">
              <img 
                src={LOGO_URL} 
                alt="Bharat.style Logo" 
                className="h-32 sm:h-48 mx-auto mb-8 object-contain"
                loading="lazy"
                width="400"
                height="200"
              />
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">
                The Symbol of Authenticity
              </h2>
              <p className="text-lg text-stone-600 leading-relaxed">
                Our logo reflects the core of who we are. <strong>Bharat.style</strong> stands for the timeless elegance of India wrapped in modern sustainability. 
                Every product bearing this mark is a pledge—to the planet, to the artisan, and to you.
              </p>
           </div>
        </div>

        {/* Values Grid */}
        <div className="mb-24">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-serif font-bold text-stone-900">Our Core Values</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, idx) => (
                <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-stone-100">
                   <div className="w-12 h-12 bg-jute-100 rounded-full flex items-center justify-center text-stone-800 mb-6">
                     <v.icon size={24} />
                   </div>
                   <h3 className="text-xl font-bold text-stone-900 mb-3">{v.title}</h3>
                   <p className="text-stone-600 leading-relaxed">{v.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* CTA */}
        <div className="bg-brand-green rounded-3xl p-12 text-center text-white relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="text-3xl font-serif font-bold mb-6">Join Our Journey</h2>
             <p className="text-brand-green-100 max-w-2xl mx-auto mb-8 text-lg">
               Be a part of the slow fashion movement. Carry a bag that looks good and does good.
             </p>
             <Link 
               to="/"
               className="inline-block bg-white text-brand-green px-8 py-3 rounded-xl font-bold hover:bg-stone-100 transition shadow-lg"
             >
               Shop the Collection
             </Link>
           </div>
           {/* Decorative circles */}
           <div className="absolute top-0 left-0 -ml-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5"></div>
           <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 rounded-full bg-white opacity-5"></div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;