import React from "react";
import { useLocation } from "react-router-dom";
import "./OrderSummary.scss";

const OrderSummary = () => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails || {};
  const orderItems = location.state?.orderItems || [];
  const totalAmount = location.state?.totalAmount || 0;

  return (
    <section className="order-summary">
      <h1>Dziękujemy za zamówienie!</h1>
      <p className="summary-p">Twoje zamówienie zostało pomyślnie złożone. Szczegóły zamówienia:</p>

      
    <div className="order-data">
        <div className="customer-details">
            <h2>Dane klienta:</h2>
            <p><span>Telefon:</span> {orderDetails.phone}</p>
            <p><span>Ulica:</span> {orderDetails.street}</p>
            <p><span>Kod pocztowy:</span> {orderDetails.postalCode}</p>
            <p><span>Miejscowość:</span> {orderDetails.city}</p>
            {orderDetails.houseNumber && <p><span>Numer domu:</span> {orderDetails.houseNumber}</p>}
            {orderDetails.apartmentNumber && <p><span>Numer mieszkania:</span> {orderDetails.apartmentNumber}</p>}
            {orderDetails.comments && <p><span>Uwagi:</span> {orderDetails.comments}</p>}
        </div>

        <div className="order-items">
            <h2>Produkty:</h2>
            {orderItems.length > 0 ? (
            <ul>
                {orderItems.map((item, index) => (
                <li key={index}>
                    {item.name} - {item.quantity} x {item.price.toFixed(2)} zł
                </li>
                ))}
            </ul>
            ) : (
            <p>Brak produktów w zamówieniu.</p>
            )}
        </div>
    </div>

    <div className="payment-details">
        <h2>Informacje o płatności:</h2>
        <p>Prosimy o przesłanie płatności na poniższy numer konta bankowego:</p>
        <p className="bank-account"><span>Numer konta:</span> 12 3456 7890 1234 5678 9012 3456</p>
        <p>W tytule przelewu prosimy podać: <span>ID zamówienia</span></p>
        <p>Dziękujemy za zamówienie! W razie pytań prosimy o kontakt.</p>
    </div>

    <div className="total-amount">
    <p>Łączna kwota: {totalAmount.toFixed(2)} zł</p>
    </div>
    </section>
  );
};

export default OrderSummary;