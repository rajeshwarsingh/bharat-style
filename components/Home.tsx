import React, { useState } from 'react';
import Hero from './Hero';
import Features from './Features';
import ColorPalette from './ColorPalette';
import ProductDetails from './ProductDetails';
import AmazonTrust from './AmazonTrust';
import Story from './Story';
import Reviews from './Reviews';
import StickyCTA from './StickyCTA';
import SEO from './SEO';
import { PRODUCT, LOGO_URL } from '../constants';

const Home: React.FC = () => {
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Product Schema for Google Rich Snippets
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": PRODUCT.name,
    "image": PRODUCT.colors[0].images,
    "description": PRODUCT.features.join('. '),
    "sku": PRODUCT.id,
    "brand": {
      "@type": "Brand",
      "name": "TheTidbit",
      "logo": LOGO_URL
    },
    "offers": {
      "@type": "Offer",
      "url": "https://bharat.style/",
      "priceCurrency": "INR",
      "price": PRODUCT.price,
      "priceValidUntil": "2026-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Bharat.style"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "48"
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://bharat.style/"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Women",
      "item": "https://bharat.style/#/women"
    },{
      "@type": "ListItem",
      "position": 3,
      "name": "Handbags",
      "item": "https://bharat.style/#/women/handbags"
    },{
      "@type": "ListItem",
      "position": 4,
      "name": "Sling Bags",
      "item": "https://bharat.style/"
    }]
  };

  return (
    <>
      <SEO 
        title="Handmade Jute Embroidered Round Sling Bag"
        description="Shop the eco-friendly, artistic, handmade jute embroidered round sling bag. Sustainable fashion for the modern boho soul. Free Delivery & Easy Returns."
        canonicalUrl="https://bharat.style/"
        type="product"
        image={PRODUCT.colors[0].images[0]}
        schema={[productSchema, breadcrumbSchema]}
      />
      <Hero appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} />
      <Features />
      <ColorPalette />
      <ProductDetails />
      <AmazonTrust />
      <Story />
      <Reviews />
      <StickyCTA appliedCoupon={appliedCoupon} />
    </>
  );
};

export default Home;