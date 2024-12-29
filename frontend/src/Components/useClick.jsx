import { useEffect } from 'react';

// Hook do zamykania na kliknięcie poza element lub naciśnięcie Escape
const useClick = (ref, closeCallback) => {
    // Obsługuje kliknięcie poza elementem
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            closeCallback();
        }
    };

    // Obsługuje naciśnięcie klawisza Escape
    const handleEscKey = (e) => {
        if (e.key === 'Escape') {
            closeCallback();
        }
    };

    useEffect(() => {
        // Dodajemy nasłuchiwanie zdarzeń
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscKey);

        // Usuwamy nasłuchiwanie po odmontowaniu komponentu
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);
};

export default useClick;
