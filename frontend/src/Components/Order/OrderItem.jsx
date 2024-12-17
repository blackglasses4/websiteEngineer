import React, { useEffect, useState } from 'react';

const OrderItem = ({ setOrderItems }) => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    // Pobieranie danych zamówienia z localStorage
    const storedOrderData = JSON.parse(localStorage.getItem('order'));

    // Jeśli dane istnieją w localStorage, ustawiamy je w stanie
    if (storedOrderData) {
      setOrderData(storedOrderData);
      setOrderItems(storedOrderData); // Przekazujemy dane do rodzica
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