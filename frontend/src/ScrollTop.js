// ScrollToTop.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      if (navigator.userAgent.includes('Mobi') || navigator.userAgent.includes('Android')) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    scrollToTop();

  }, [pathname]);

  return null;
};

export default ScrollToTop;