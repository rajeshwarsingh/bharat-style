import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
  schema?: Record<string, any> | Record<string, any>[];
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonicalUrl = 'https://bharat.style', 
  type = 'website',
  image = 'https://res.cloudinary.com/thetidbit23024/image/upload/v1765954770/ChatGPT_Image_Dec_17_2025_12_27_11_PM_afaonp.png',
  schema 
}) => {
  const fullTitle = `${title} | Bharat.style by TheTidbit`;
  
  const schemaList = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {schemaList.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;