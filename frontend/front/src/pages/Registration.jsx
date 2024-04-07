import { Link, Route, Routes, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import Login from "./Login";
import { Context } from "../index";
import React, { useContext, useState } from "react";
import { register } from "../API/userAPI";

export default function Registration() {
  const { users } = useContext(Context);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Валидация полей
  const registerUserValidation = async () => {
    // Сброс ошибок при попытке входа
    setEmailError("");
    setPasswordError("");

    if (!email || !username || !password) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    const emailIsValid = isEmailValid(email);
    const passwordIsValid = isPasswordValid(password);

    if (!emailIsValid) {
      setEmailError("Пожалуйста, введите корректный email.");
    }

    if (!passwordIsValid) {
      setPasswordError("Пароль должен содержать как минимум 6 символов.");
    }

    if (emailIsValid && passwordIsValid) {
      // Если все поля заполнены и прошли валидацию, выполняем регистрацию.
      registerUser();
    }
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6; // Пример: минимальная длина 6 символов
  };

  // Обработчик регистрации
  const registerUser = async () => {
    const user = {
      email: email,
      username: username,
      password: password,
    };

    try {
      // Отправляем данные на сервер и ждем ответ
      const response = await register(user);

      // Если регистрация прошла успешно, устанавливаем флаг loggedIn и переходим на главную страницу
      //users.setLoggedIn(true);
      navigate("/Login");
    } catch (error) {
      alert("Ошибка! Пользователь с такой почтой уже существует");
    }
  };

  return (
    <>
      <div className={classes.MainBlock}>
        <div className={classes.Left}>
          <div className={classes.Title}>Присоединяйтесь к нам!</div>
          <div className={classes.Text}>
            Регистрация на нашей платформе позволит вам начать захватывающее
            путешествие к улучшению вашей памяти с помощью игр и тренажеров.
            Заполните форму справа, чтобы создать свой аккаунт.
          </div>
        </div>
        <div className={classes.Right}>
          <div className={classes.vhodText}>Регистрация</div>
          <div className={classes.LoginBlock}>
            <div className={classes.EmailText}>Имя*</div>
            <div className={classes.EmailInput}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={classes.EmailText}>Email*</div>
            <div className={classes.EmailInput}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className={classes.ErrorMessage}>{emailError}</div>
            </div>
            <div className={classes.PassText}>Пароль*</div>
            <div className={classes.PassInput}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className={classes.ErrorMessage}>{passwordError}</div>
            </div>

            <div className={classes.LoginBtn}>
              <button onClick={registerUserValidation}>
                Зарегистрироваться
              </button>
            </div>
            <div className={classes.LinkReg}>
              У вас уже есть аккаунт?
              <Link to="/Login">
                <div className={classes.a}>Войти</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}
