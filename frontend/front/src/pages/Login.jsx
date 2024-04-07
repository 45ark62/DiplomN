import React, { useContext, useState, useEffect } from "react";
import classes from "./Login.module.css";
import { Context } from "../index";
import { login } from "../API/userAPI";
import Registration from "./Registration";
import { saveAuthStatus, getAuthStatus } from "./auth";
import { getUserFromLocalStorage, saveUserToLocalStorage } from "../API/index";

import { Link, Route, Routes, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { users } = useContext(Context);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const retrievedUser = getUserFromLocalStorage();
  if (retrievedUser) {
    // Например, восстановите состояние в глобальном хранилище (Redux, Mobx) или в контексте
    // Здесь мы предполагаем, что вы используете контекст
    users.setLoggedIn(true);
    users.setUser(retrievedUser); // Записываем данные о пользователе
  }
  const validateForm = () => {
    let isValid = true;

    // Проверка наличия email
    if (!email) {
      setEmailError("Пожалуйста, введите email");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Введите корректный email");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Проверка наличия пароля
    if (!password) {
      setPasswordError("Пожалуйста, введите пароль");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Минимальная длина пароля - 6 символов");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const loginUser = async () => {
    try {
      if (validateForm()) {
        const response = await login(email, password);
        console.log("ответ на авторизацию: ", response);

        users.setLoggedIn(true);
        saveAuthStatus(true);
        console.log(response.data);
        saveUserToLocalStorage(users);
        users.setUser(response.data);
        console.log("u", users._user);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 301) {
          setError("Неверный логин или пароль");
        } else if (error.response.status === 401) {
          setError(" Неправильный логин или пароль");
        }
      }
    }
  };

  useEffect(() => {
    const isUserLoggedIn = getAuthStatus();
    if (isUserLoggedIn) {
      users.setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <div className={classes.MainBlock}>
        {/* Отображаем сообщение об ошибке, если ошибка есть */}

        <div className={classes.Left}>
          <div className={classes.Title}>ДОБРО ПОЖАЛОВАТЬ!</div>
          <div className={classes.Text}>
            Рады видеть вас снова на нашей платформе. Пожалуйста, войдите в свой
            аккаунт, чтобы продолжить тренировку памяти с увлекательными играми.
            Ваши достижения и прогресс уже ждут вас!
          </div>
        </div>

        <div className={classes.Right}>
          <div className={classes.vhodText}>Войти в аккаунт</div>
          <div className={classes.LoginBlock}>
            <div className={classes.EmailText}>Email*</div>
            <div className={classes.EmailInput}>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <div className={classes.Error}>{emailError}</div>
            </div>
            <div className={classes.PassText}>Пароль*</div>
            <div className={classes.PassInput}>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <div className={classes.Error}>{passwordError}</div>
            </div>

            <div className={classes.Error}>{error}</div>
            <div className={classes.LoginBtn}>
              <button onClick={loginUser}>Войти</button>
            </div>

            <div className={classes.LinkReg}>
              У вас еще нет аккаунта?
              <Link to="/Registration">
                <div className={classes.a}>Создать аккаунт</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/Registration" element={<Registration />} />
      </Routes>
    </>
  );
};

export default Login;
