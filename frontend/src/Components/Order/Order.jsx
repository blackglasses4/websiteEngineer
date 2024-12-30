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
    postal_code: "",
    city: "",
    house_number: "",
    apartment_number: "",
    comment: "",
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
      "postal_code",
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
  
    if (orderDetails.postal_code && !validatePostalCode(orderDetails.postal_code)) {
      newErrors.postal_code = "Podaj prawidłowy kod pocztowy (np. 00-000).";
      isValid = false;
    }
  
    // Logika walidacji - jedno z pól (dom lub mieszkanie) musi być wypełnione
    if (!orderDetails.house_number && !orderDetails.apartment_number) {
      newErrors.house_number = "Musisz podać numer domu lub mieszkania!";
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

    //const usernameUser = localStorage.getItem('usernameUser');

    const orderData = {
      phone: parseInt(orderDetails.phone, 10),
      street: orderDetails.street,
      postal_code: orderDetails.postal_code,
      city: orderDetails.city,
      apartment_number: orderDetails.apartment_number || null,
      house_number: orderDetails.house_number || null,
      comment: orderDetails.comment,
      status: "W trakcie realizacji",
      total_amount: calculateTotal(),
      products_order: JSON.stringify(orderItems),
    };

    try {
      console.log(orderData);
      const response = await addOrder(orderData);
      
      if (!response.ok) {
        throw new Error("Wystąpił błąd podczas przesyłania zamówienia.");
      }

      toast.success("Zamówienie zostało pomyślnie złożone!");
      setOrderDetails({
        phone: "",
        street: "",
        postal_code: "",
        city: "",
        house_number: "",
        apartment_number: "",
        comment: "",
      });
      setOrderItems([]);
      localStorage.removeItem("order");
      localStorage.removeItem("cart");

      navigate("/order_summary", {
        state: {
          orderDetails,
          orderItems,
          total_amount: calculateTotal(),
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

              <label htmlFor="postal_code" className={errors.postal_code ? "error" : ""}>
                Kod pocztowy:
                <input
                  type="text"
                  name="postal_code"
                  id="postal_code"
                  value={orderDetails.postal_code}
                  onChange={changeDataOrder}
                  placeholder="Np. 00-000"
                  inputMode="numeric"
                  maxLength={6}
                  required
                />
                {errors && errors.postal_code && <span className="error-message">{errors.postal_code}</span>}
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

              <label htmlFor="house_number" className={errors.house_number ? "error" : ""}>
                Numer domu:
                <input
                  type="number"
                  name="house_number"
                  id="house_number"
                  value={orderDetails.house_number}
                  onChange={changeDataOrder}
                  placeholder="Np. 4"
                  min={1}
                />
                {errors && errors.house_number && <span className="error-message">{errors.house_number}</span>}
              </label>

              <label htmlFor="apartment_number">
                Numer mieszkania:
                <input
                  type="number"
                  name="apartment_number"
                  id="apartment_number"
                  value={orderDetails.apartment_number}
                  onChange={changeDataOrder}
                  placeholder="Np. 15"
                  min={1}
                />
                {errors && errors.apartment_number && <span className="error-message">{errors.apartment_number}</span>}
              </label>

              <label htmlFor="comment">
                Uwagi: (opcjonalnie)
                <textarea
                  id="comment"
                  name="comment"
                  rows="5"
                  cols="33"
                  value={orderDetails.comment}
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
