import React, { useState, useEffect } from 'react';
import './CookieBanner.scss';

const CookieBanner = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent === 'accepted') {
      setIsAccepted(true);
    } else if (cookieConsent === 'rejected') {
      setIsRejected(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsAccepted(true);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsRejected(true);
  };

  if (isAccepted || isRejected) {
    return null;
  }

  return (
    <div className="cookie-banner">
      <p className="cookie-text">
        Używamy plików cookie i podobnych technologii (w tym localStorage), aby poprawić jakość naszych usług.
        Możesz zaakceptować wszystkie, odrzucić lub dostosować swoje preferencje.
      </p>
      <div className="cookie-buttons">
        <button onClick={handleAccept}>Akceptuj wszystko</button>
        <button onClick={handleReject}>Odrzuć wszystkie</button>
      </div>
    </div>
  );
};

export default CookieBanner;
