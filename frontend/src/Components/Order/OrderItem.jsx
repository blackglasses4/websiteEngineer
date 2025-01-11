import React, { useEffect, useState } from 'react';

const OrderItem = ({ setOrderItems }) => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const storedOrderData = localStorage.getItem('order');
    
    if (storedOrderData) {
        let parsedData;
        try {
            parsedData = JSON.parse(storedOrderData);
        } catch (error) {
            console.error("Błąd parsowania JSON:", error);
            return;
        }

        // Jeżeli dane to tablica z jednym obiektem, wyciągamy obiekt
        const cleanedData = Array.isArray(parsedData) && parsedData.length === 1
            ? parsedData[0]
            : parsedData;

        setOrderData(cleanedData);
        setOrderItems(cleanedData);
    } else {
        setOrderData([]);
        setOrderItems([]);
    }
  }, [setOrderItems]); 

  const calculateTotal = () => {
    return orderData.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      {orderData.length > 0 ? (
        <>
          <h1>Podsumowanie</h1>
          <h4>Łączna kwota: {calculateTotal().toFixed(2)} zł</h4>
        </>
      ) : (
        <p>Brak produktów w zamówieniu.</p>
      )}
    </>
  );
};

export default OrderItem;