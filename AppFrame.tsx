import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import GoogleAnalytics from './components/GoogleAnalytics';
import MetaPixel from './components/MetaPixel';
import SlingTryModal from './components/SlingTryModal';
import SlingTryFloatingButton from './components/SlingTryFloatingButton';
import { SlingTryProvider } from './components/SlingTryContext';

const AboutPage = React.lazy(() => import('./components/AboutPage'));
const BlogPage = React.lazy(() => import('./components/BlogPage'));

// Component to ensure page scrolls to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export function AppFrame({ enableAnalytics = true }: { enableAnalytics?: boolean }) {
  const [isSlingTryOpen, setIsSlingTryOpen] = useState(false);

  return (
    <SlingTryProvider value={{ openSlingTry: () => setIsSlingTryOpen(true) }}>
      <ScrollToTop />
      {enableAnalytics ? <GoogleAnalytics /> : null}
      {enableAnalytics ? <MetaPixel /> : null}
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Suspense
            fallback={
              <div className="min-h-[40vh] flex items-center justify-center text-stone-500">
                Loading…
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/story" element={<BlogPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>

      <SlingTryFloatingButton onClick={() => setIsSlingTryOpen(true)} />
      <SlingTryModal
        open={isSlingTryOpen}
        onClose={() => setIsSlingTryOpen(false)}
        iframeSrc="https://slingtry-ai-virtual-try-on-955247528706.us-west1.run.app/"
      />
    </SlingTryProvider>
  );
}


