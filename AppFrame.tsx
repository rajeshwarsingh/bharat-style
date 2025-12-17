import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BlogPage from './components/BlogPage';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import GoogleAnalytics from './components/GoogleAnalytics';

// Component to ensure page scrolls to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export function AppFrame({ enableAnalytics = true }: { enableAnalytics?: boolean }) {
  return (
    <>
      <ScrollToTop />
      {enableAnalytics ? <GoogleAnalytics /> : null}
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}


