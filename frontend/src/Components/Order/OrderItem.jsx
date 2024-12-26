import React, { useEffect, useState } from 'react';

const OrderItem = ({ setOrderItems }) => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const storedOrderData = JSON.parse(localStorage.getItem('order'));
  
    if (storedOrderData && storedOrderData.length > 0) {
      setOrderData(storedOrderData);
      setOrderItems(storedOrderData);
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