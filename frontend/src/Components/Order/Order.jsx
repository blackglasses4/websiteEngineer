import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderItem from './OrderItem';
import { addOrder } from '../../backend';

import "./Order.scss";

const Order = () => {
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    phone: "",
    street: "",
    postalCode: "",
    city: "",
    houseNumber: "",
    apartmentNumber: "",
    comments: "",
  });

  const [errors, setErrors] = useState({});

  const changeDataOrder = (e) => {
    const { name, value } = e.target;

    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const validatePhone = (phone) => /^[0-9]{9}$/.test(phone);

  const validatePostalCode = (postalCode) => /^\d{2}-\d{3}$/.test(postalCode);

  const validateRequiredFields = () => {
    const requiredFields = [
      "phone",
      "street",
      "postalCode",
      "city",
    ];
    let isValid = true;
    const newErrors = {};
  
    requiredFields.forEach((field) => {
      if (!orderDetails[field]) {
        newErrors[field] = "To pole jest wymagane.";
        isValid = false;
      }
    });
  
    // Niestandardowa walidacja
    if (orderDetails.phone && !validatePhone(orderDetails.phone)) {
      newErrors.phone = "Podaj prawidłowy numer telefonu (9 cyfr).";
      isValid = false;
    }
  
    if (orderDetails.postalCode && !validatePostalCode(orderDetails.postalCode)) {
      newErrors.postalCode = "Podaj prawidłowy kod pocztowy (np. 00-000).";
      isValid = false;
    }
  
    // Logika walidacji - jedno z pól (dom lub mieszkanie) musi być wypełnione
    if (!orderDetails.houseNumber && !orderDetails.apartmentNumber) {
      newErrors.houseNumber = "Musisz podać numer domu lub mieszkania!";
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };  

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const sendDataOrder = async (e) => {
    e.preventDefault();

    if(orderItems.length === 0) {
      toast.error("Nie można złożyć zamówienia bez produktów!");
      return;
    }

    const isValid = validateRequiredFields();
    if (!isValid) {
      toast.error("Proszę poprawnie uzupełnić formularz!");
      return;
    }

    const usernameUser = localStorage.getItem('usernameUser');

    const orderData = {
      customerDetails: orderDetails,
      items: orderItems,
      totalAmount: calculateTotal(),
      date: new Date().toISOString(),
      status: "W trakcie realizacji",
      customer: usernameUser || "Anonimowy użytkownik",
    };

    try {

      const response = await addOrder(orderData);
      
      if (!response.ok) {
        throw new Error("Wystąpił błąd podczas przesyłania zamówienia.");
      }

      toast.success("Zamówienie zostało pomyślnie złożone!");
      setOrderDetails({
        phone: "",
        street: "",
        postalCode: "",
        city: "",
        houseNumber: "",
        apartmentNumber: "",
        comments: "",
      });
      setOrderItems([]);
      localStorage.removeItem("order");
      localStorage.removeItem("cart");

      navigate("/order_summary", {
        state: {
          orderDetails,
          orderItems,
          totalAmount: calculateTotal(),
        }
      });

    } catch (error) {
      console.error("Błąd składania zamówienia:", error.message);
      toast.error("Wystąpił błąd podczas składania zamówienia.");
    }
  };

  return (
    <section className="order">
      <div className="order-form-wrapper">
        <div className="order-form">
          <OrderItem setOrderItems={setOrderItems} />

          <div className="form-container">
            <h1>Twoje dane</h1>
            <form onSubmit={sendDataOrder}>
              <label htmlFor="phone" className={errors.phone ? "error" : ""}>
                Telefon:
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={orderDetails.phone}
                  onChange={changeDataOrder}
                  placeholder="Np. 000000000"
                  minLength={9}
                  maxLength={9}
                  required
                />
                {errors && errors.phone && <span className="error-message">{errors.phone}</span>}
              </label>

              <label htmlFor="street" className={errors.street ? "error" : ""}>
                Ulica:
                <input
                  type="text"
                  name="street"
                  id="street"
                  value={orderDetails.street}
                  onChange={changeDataOrder}
                  placeholder="Np. Przemysłowa"
                  required
                />
                {errors && errors.street && <span className="error-message">{errors.street}</span>}
              </label>

              <label htmlFor="postalCode" className={errors.postalCode ? "error" : ""}>
                Kod pocztowy:
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  value={orderDetails.postalCode}
                  onChange={changeDataOrder}
                  placeholder="Np. 00-000"
                  inputMode="numeric"
                  maxLength={6}
                  required
                />
                {errors && errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
              </label>

              <label htmlFor="city" className={errors.city ? "error" : ""}>
                Miejscowość:
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={orderDetails.city}
                  onChange={changeDataOrder}
                  placeholder="Np. Poznań"
                  required
                />
                {errors && errors.city && <span className="error-message">{errors.city}</span>}
              </label>

              <label htmlFor="houseNumber" className={errors.houseNumber ? "error" : ""}>
                Numer domu:
                <input
                  type="number"
                  name="houseNumber"
                  id="houseNumber"
                  value={orderDetails.houseNumber}
                  onChange={changeDataOrder}
                  placeholder="Np. 4"
                  min={1}
                />
                {errors && errors.houseNumber && <span className="error-message">{errors.houseNumber}</span>}
              </label>

              <label htmlFor="apartmentNumber">
                Numer mieszkania:
                <input
                  type="number"
                  name="apartmentNumber"
                  id="apartmentNumber"
                  value={orderDetails.apartmentNumber}
                  onChange={changeDataOrder}
                  placeholder="Np. 15"
                  min={1}
                />
                {errors && errors.apartmentNumber && <span className="error-message">{errors.apartmentNumber}</span>}
              </label>

              <label htmlFor="comments">
                Uwagi: (opcjonalnie)
                <textarea
                  id="comments"
                  name="comments"
                  rows="5"
                  cols="33"
                  value={orderDetails.comments}
                  onChange={changeDataOrder}
                  placeholder="Napisz swoje uwagi"
                />
              </label>

              <button type="submit">Przejdź do płatności</button>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </section>
  );
};

export default Order;
