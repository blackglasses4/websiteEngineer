import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL} from "../../config";
import ThemeSwitch from '../../Components/ThemeSwitch/ThemeSwitch';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import "./Register.scss";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
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

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    let isValid = true;

    if (!userDetails.first_name && !userDetails.last_name && !userDetails.username) {
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
      first_name: userDetails.first_name,
      last_name: userDetails.last_name,
      username: userDetails.username,
      email: userDetails.email,
      password: userDetails.password,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/register`, {
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
        first_name: "",
        last_name: "",
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
          <LazyLoadImage
            src="/images/logo_dark.svg"
            effect="blur"
            alt="Logo sklepu"
            className="theme-dependent-logo"
            width="100px"
            height="auto"
          />
        <div className="theme-switch-container">
          <ThemeSwitch/>
        </div>
      </header>

      <section className="register">
        <div className="register-form-wrapper">
          <h1>Rejestracja</h1>
          <form onSubmit={registerUser}>

            <label htmlFor="first_name" className={errors.first_name ? "error" : ""}>
              Imię:
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={userDetails.first_name}
                onChange={changeUserData}
                placeholder="Wpisz swoje imię"
                required
              />
              {errors.first_name && <span className="error-message">{errors.first_name}</span>}
            </label>

            <label htmlFor="last_name" className={errors.last_name ? "error" : ""}>
              Nazwisko:
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={userDetails.last_name}
                onChange={changeUserData}
                placeholder="Wpisz swoje nazwisko"
                required
              />
              {errors.last_name && <span className="error-message">{errors.last_name}</span>}
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
        </div>
      </section>
    </div>
  );
};

export default Register;
