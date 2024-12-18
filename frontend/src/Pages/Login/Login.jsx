import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../../Components/config";
import ThemeSwitch from '../../Components/ThemeSwitch/ThemeSwitch';

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
      const response = await fetch(`${BACKEND_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      if (!response.ok) {
        throw new Error("Błędna nazwa użytkownika, email lub hasło.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Wystąpił błąd podczas logowania.");
      }

      toast.success("Zalogowano pomyślnie!");
      setTimeout(() => {
        navigate("/Home");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Wystąpił problem podczas logowania.");
    }
  };

  return (
    <div className="page-container">
      <header className="login-header">
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
                name="emailOrUsername"
                id="emailOrUsername"
                value={loginDetails.emailOrUsername}
                onChange={changeLoginDetails}
                placeholder="Wpisz swój email"
                required
              />
              {errors.emailOrUsername && <span className="error-message">{errors.emailOrUsername}</span>}
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
