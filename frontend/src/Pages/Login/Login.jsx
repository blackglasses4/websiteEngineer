import React, { useState } from "react";
import { StatusCodes } from 'http-status-codes';
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
    //   // Zaktualizuj ten URL, aby wskazywał na prawdziwe API backendu (np. FastAPI)
    // const response = await fetch(`http://`${BACKEND_URL}/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     usernameOrEmail: loginDetails.usernameOrEmail,
    //     password: loginDetails.password,
    //   }),
    // });

    // const data = await response.json();

    // if (!response.ok) {
    //   throw new Error(data.message || "Błędna nazwa użytkownika, email lub hasło.");
    // }

    // // Zakładając, że odpowiedź zawiera dane użytkownika, zapisujemy je w localStorage
    // localStorage.setItem("user", JSON.stringify({ username: data.username }));
    // toast.success("Zalogowano pomyślnie!");

      //chwilowy do server-json.
      const response = await fetch(`${BACKEND_URL}/users`);
      const users = await response.json();

      if (response.status === StatusCodes.UNAUTHORIZED) { //401
        throw new Error("Błędna nazwa użytkownika, email lub hasło.");
      }

      // Sprawdzanie, czy użytkownik istnieje i hasło jest poprawne
      const user = users.find(
        (user) =>
          (user.username === loginDetails.usernameOrEmail ||
            user.email === loginDetails.usernameOrEmail) &&
            user.password === loginDetails.password
      );

      if (!user) {
        throw new Error("Błędna nazwa użytkownika, email lub hasło.");
      }

      localStorage.setItem("user", JSON.stringify({ username: user.username }));
      toast.success("Zalogowałeś się!");

      if(user.username.toLowerCase().includes('admin')) {
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      }
      else {
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
