import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GA_TRACKING_ID } from '../constants';

// Declare global window property for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if the script exists, if not, create it
    if (typeof window !== 'undefined' && GA_TRACKING_ID && GA_TRACKING_ID.startsWith('G-')) {
      const scriptId = 'google-analytics-script';
      
      if (!document.getElementById(scriptId)) {
        // Inject the Google Analytics script tag dynamically
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
        document.head.appendChild(script);

        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];
        window.gtag = function(){window.dataLayer.push(arguments);}
        window.gtag('js', new Date());
        window.gtag('config', GA_TRACKING_ID);
      }
    }
  }, []);

  useEffect(() => {
    // Send page view events on route change
    if (typeof window.gtag !== 'undefined' && GA_TRACKING_ID && GA_TRACKING_ID.startsWith('G-')) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

export default GoogleAnalytics;