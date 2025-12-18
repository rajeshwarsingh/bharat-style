import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const MetaPixel = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (typeof window.fbq !== 'function') return;

    window.fbq('track', 'PageView');
  }, [location.pathname, location.search]);

  return null;
};

export default MetaPixel;


