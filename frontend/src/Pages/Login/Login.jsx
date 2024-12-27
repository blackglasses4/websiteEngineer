import React, { useState } from "react";
import { StatusCodes } from 'http-status-codes';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL,  BACKEND_URL2} from "../../Components/config";
import ThemeSwitch from '../../Components/ThemeSwitch/ThemeSwitch';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import "./Login.scss";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const changeLoginDetails = (e) => {
    const { name, value } = e.target;

    setLoginDetails((prevDetails) => ({
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

    if (!loginDetails.usernameOrEmail) {
      newErrors.usernameOrEmail = "Podaj email lub nazwę użytkownika.";
      isValid = false;
    }

    if (!loginDetails.password || loginDetails.password.length < 6) {
      newErrors.password = "Hasło musi mieć co najmniej 6 znaków.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const loginUser = async (e) => {
    e.preventDefault();
  
    const isValid = validateFields();
    if (!isValid) {
      toast.error("Proszę poprawnie uzupełnić formularz!");
      return;
    }
  
    try {
      // Tworzymy dane w formacie x-www-form-urlencoded
      const body = new URLSearchParams({
        username: loginDetails.usernameOrEmail,
        password: loginDetails.password,
      });
  
      // Wysyłamy żądanie do backendu
      const response = await fetch(`${BACKEND_URL2}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Właściwy nagłówek
        },
        body: body.toString(), // Dane w formacie x-www-form-urlencoded
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.detail || "Błędna nazwa użytkownika, email lub hasło.");
      }
  
      // Zapisujemy dane użytkownika w localStorage
      localStorage.setItem("user", JSON.stringify({ username: data.username }));
      toast.success("Zalogowano pomyślnie!");
  
      // Przekierowanie w zależności od użytkownika
      if (data.is_admin) {
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      } else {
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error(error.message || "Wystąpił problem podczas logowania.");
    }
  };

  return (
    <div className="page-container">
      <header className="login-header">
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

      <section className="login">
        <div className="login-form-wrapper">
          <h1>Logowanie</h1>
          <form onSubmit={loginUser}>
            <label htmlFor="usernameOrEmail" className={errors.usernameOrEmail ? "error" : ""}>
              Email lub Nazwa użytkownika:
              <input
                type="text"
                name="usernameOrEmail"
                id="usernameOrEmail"
                value={loginDetails.usernameOrEmail}
                onChange={changeLoginDetails}
                placeholder="Wpisz swój email"
                required
              />
              {errors.usernameOrEmail && <span className="error-message">{errors.usernameOrEmail}</span>}
            </label>

            <label htmlFor="password" className={errors.password ? "error" : ""}>
              Hasło:
              <input
                type="password"
                name="password"
                id="password"
                value={loginDetails.password}
                onChange={changeLoginDetails}
                placeholder="Wpisz swoje hasło"
                required
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </label>

            <button type="submit">Zaloguj się</button>
          </form>
          <p className="register-redirect">
            Nie masz jeszcze konta? <Link className="register-link" to="/register">Zarejestruj się</Link>
          </p>
          <ToastContainer />
        </div>
      </section>
    </div>
  );
};

export default Login;
