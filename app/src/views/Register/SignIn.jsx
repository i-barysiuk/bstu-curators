import React from "react";
import { Button } from "antd";
import style from "./style.module.scss";
import RegistrationForm from "../../components/signIn/RegisterForm";
import logo from "../../assets/images/logos/curators.png";

const SignIn = props => {
  return (
    <div className={style.container}>
      <div className={style.bar}>
        <div className={style.darkBackground}>
          <img src={logo} className={style.logo} alt="logo" />
          <p>Система заботы о студентах</p>
          <h2 className={style.header}>Рады видеть Вас снова!</h2>
          <p>
            Что бы начать использовать данный продукт вы должны быть
            авторизованы в системе. Пожалуйста введите ваш логин и пароль в
            форме справа.
          </p>
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

      <div className={style.main}>
        <p className={style.pageName}>
          Регистрация
          <span>/ Registration</span>
        </p>
        <RegistrationForm />
        <div>@БрГТУ 2019</div>
      </div>
    </div>
  );
};

export default SignIn;