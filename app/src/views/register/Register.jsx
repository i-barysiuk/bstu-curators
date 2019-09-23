import React from "react";
import { Button } from "antd";
import style from "./style.module.scss";
import RegistrationForm from "../../components/registerForm/RegisterForm";
import logo from "../../assets/images/logos/curators.png";
import Tips from "../../components/tips/Tips";

const Register = props => {
  return (
    <div className={style.container}>
      <div className={style.main}>
        <p className={style.pageName}>
          Регистрация
          <span>/ SignUp</span>
        </p>
        <RegistrationForm className={style.registrationForm} />
        <div>@БрГТУ 2019</div>
      </div>
      <div className={style.bar}>
        <div className={style.darkBackground}>
          <img src={logo} className={style.logo} alt="logo" />
          <p>Система заботы о студентах</p>
          <h2 className={style.header}>Добрый день, давайте знакомится!</h2>
          <div className={style.textbar}>
            БрГТУ.Кураторы - уникальная система для мониторинга успеваемости и
            активности студентов. Чтобы начать использовать данный продукт вы
            должны быть авторизованы в системе. Пожалуйста, зарегистрируйтесь.
          </div>
          <Tips className={style.tips} />
          <div className={style.buttons}>
            <Button
              type="primary"
              shape="round"
              icon="left"
              onClick={() => props.history.push("/")}
            >
              На главную
            </Button>
            <Button type="primary" shape="round">
              Помощь
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
