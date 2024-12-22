import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL2, BACKEND_URL} from "../../Components/config";
import ThemeSwitch from '../../Components/ThemeSwitch/ThemeSwitch';

import "./Register.scss";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const changeUserData = (e) => {
    const { name, value } = e.target;

    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    // Reset błędów dla danego pola
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    let isValid = true;

    // Sprawdzamy wymagane pola
    if (!userDetails.firstName && !userDetails.lastName && !userDetails.username) {
      newErrors.name = "Pole jest wymagane.";
      isValid = false;
    }

    if (!userDetails.email || !/\S+@\S+\.\S+/.test(userDetails.email)) {
      newErrors.email = "Podaj poprawny adres email.";
      isValid = false;
    }

    if (!userDetails.password || userDetails.password.length < 6) {
      newErrors.password = "Hasło musi mieć co najmniej 6 znaków.";
      isValid = false;
    }

    if (userDetails.password !== userDetails.confirmPassword) {
      newErrors.confirmPassword = "Hasła muszą się zgadzać.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const registerUser = async (e) => {
    e.preventDefault();

    const isValid = validateFields();
    if (!isValid) {
      toast.error("Proszę poprawnie uzupełnić formularz!");
      return;
    }

    const userData = {
      first_name: userDetails.firstName,
      last_name: userDetails.lastName,
      username: userDetails.username,
      email: userDetails.email,
      password: userDetails.password,
    };

    try {
      //1, Sprawdzanie 
      const checkResponse = await fetch(`${BACKEND_URL2}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userDetails.username,
        email: userDetails.email,
      }),
    });



      //2. Rejestracja użytkownika, jeśli wszystko jest w porządku.
      const response = await fetch(`${BACKEND_URL2}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Wystąpił błąd podczas rejestracji użytkownika.");
      }

      toast.success("Rejestracja zakończona sukcesem!");

      setUserDetails({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("Wystąpił błąd podczas rejestracji. Spróbuj ponownie.");
    }
  };

  return (
    <div className="page-container">
      <header className="register-header">
        <div className="theme-switch-container">
          <ThemeSwitch/>
        </div>
      </header>

      <section className="register">
        <div className="register-form-wrapper">
          <h1>Rejestracja</h1>
          <form onSubmit={registerUser}>

            <label htmlFor="firstName" className={errors.firstName ? "error" : ""}>
              Imię:
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={userDetails.firstName}
                onChange={changeUserData}
                placeholder="Wpisz swoje imię"
                required
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </label>

            <label htmlFor="lastName" className={errors.lastName ? "error" : ""}>
              Nazwisko:
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={userDetails.lastName}
                onChange={changeUserData}
                placeholder="Wpisz swoje nazwisko"
                required
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </label>

            <label htmlFor="username" className={errors.username ? "error" : ""}>
              Nazwa użytkownika:
              <input
                type="text"
                name="username"
                id="username"
                value={userDetails.username}
                onChange={changeUserData}
                placeholder="Wpisz swoją nazwę użytkownika"
                required
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </label>

            <label htmlFor="email" className={errors.email ? "error" : ""}>
              Email:
              <input
                type="email"
                name="email"
                id="email"
                value={userDetails.email}
                onChange={changeUserData}
                placeholder="Wpisz swój email"
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </label>

            <label htmlFor="password" className={errors.password ? "error" : ""}>
              Hasło:
              <input
                type="password"
                name="password"
                id="password"
                value={userDetails.password}
                onChange={changeUserData}
                placeholder="Wpisz swoje hasło"
                required
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </label>

            <label htmlFor="confirmPassword" className={errors.confirmPassword ? "error" : ""}>
              Potwierdź hasło:
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={userDetails.confirmPassword}
                onChange={changeUserData}
                placeholder="Potwierdź swoje hasło"
                required
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </label>

            <button type="submit">Zarejestruj się</button>
          </form>
          <p className="login-redirect">
            Masz już konto? <Link className="login-link" to="/login">Zaloguj się</Link>
          </p>
          <ToastContainer />
        </div>
      </section>
    </div>
  );
};

export default Register;
