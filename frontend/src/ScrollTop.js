import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        if (isMobile) {
          // Specjalne przewijanie dla urządzeń mobilnych
          document.body.scrollTop = 0; // Safari
          document.documentElement.scrollTop = 0; // Inne przeglądarki
        } else {
          document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [pathname]);

    return null;
};

export default ScrollToTop;
