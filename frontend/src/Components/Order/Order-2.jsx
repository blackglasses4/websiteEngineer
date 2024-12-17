import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCart } from "../Cart/CartContext";
import OrderItems from "./OrderItem"; 

import "./Order.scss";

const Order = ({ OrderSubmit }) => {
  const { cart } = useCart();
  const [OrderItem, set]

  const [orderDetails, setOrderDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    postalCode: "",
    city: "",
    houseNumber: "",
    apartmentNumber: "",
  });

  // Stan przechowujący błędy formularza
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    street: false,
    postalCode: false,
    city: false,
    houseNumber: false,
    apartmentNumber: false,
  });

  const changeDataOrder = (e) => {
    const { name, value } = e.target;

    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    // Zresetowanie błędu, kiedy użytkownik edytuje dane
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{9}$/;
    return phoneRegex.test(phone);
  };

  const validatePostalCode = (postalCode) => {
    const postalCodeRegex = /^\d{2}-\d{3}$/; // 12-345
    return postalCodeRegex.test(postalCode);
  };

  // Funkcja walidacji wymaganych pól
  const validateRequiredFields = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "houseNumber",
      "street",
      "postalCode",
      "city",
    ];
    let isValid = true;
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!orderDetails[field]) {
        newErrors[field] = true;
        isValid = false;
      }
    });

    setErrors(newErrors); // Zaktualizuj stan błędów
    return isValid;
  };

  const sendDataOrder = (e) => {
    e.preventDefault();

    let isValid = validateRequiredFields();
    const newErrors = { ...errors };

    // Walidacja numeru telefonu
    if (orderDetails.phone && !validatePhone(orderDetails.phone)) {
      newErrors.phone = true;
      isValid = false;
    }

    // Walidacja kodu pocztowego
    if (
      orderDetails.postalCode &&
      !validatePostalCode(orderDetails.postalCode)
    ) {
      newErrors.postalCode = true;
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      toast.error("Proszę uzupełnić poprawnie wymagane pola!");
      return; // Zatrzymanie wysyłania formularza, jeśli są błędy
    }

    // Przekazanie danych do nadrzędnego komponentu
    OrderSubmit(orderDetails);
  };

  return (
    <section className="order-form-wrapper">
      <div className="order-form">
        <h1>Dane do zamówienia</h1>

        <OrderItems />

        <div className="form-container">
          <form onSubmit={sendDataOrder}>
            <label
              htmlFor="firstName"
              className={errors.firstName ? "error" : ""}
            >
              Imię:
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={orderDetails.firstName}
                onChange={changeDataOrder}
                placeholder="Np. Ada"
                required
              />
            </label>

            <label
              htmlFor="lastName"
              className={errors.lastName ? "error" : ""}
            >
              Nazwisko:
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={orderDetails.lastName}
                onChange={changeDataOrder}
                placeholder="Np. Kowalska"
                required
              />
            </label>

            <label htmlFor="phone" className={errors.phone ? "error" : ""}>
              Telefon:
              <input
                type="tel"
                name="phone"
                id="phone"
                value={orderDetails.phone}
                onChange={changeDataOrder}
                placeholder="Np. 000000000"
                required
              />
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
            </label>

            <label
              htmlFor="postalCode"
              className={errors.postalCode ? "error" : ""}
            >
              Kod pocztowy:
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                value={orderDetails.postalCode}
                onChange={changeDataOrder}
                placeholder="Np. 00-000"
                required
              />
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
            </label>

            <label
              htmlFor="houseNumber"
              className={errors.houseNumber ? "error" : ""}
            >
              Numer domu:
              <input
                type="number"
                name="houseNumber"
                id="houseNumber"
                value={orderDetails.houseNumber}
                onChange={changeDataOrder}
                placeholder="Np. 4"
                required
              />
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
              />
            </label>

            <button type="submit">Złóż zamówienie</button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Order;
