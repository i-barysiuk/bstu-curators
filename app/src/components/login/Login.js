import React from "react";
import { Input, Checkbox, Button, Carousel, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './style.css'
import style from "./style.module.scss";
import logo from "../../assets/images/logos/logo.png";

function Login() {
  return (
    <div className={style.container}>
      
      <div className={style.bar}> 

        <div className={style.logoAndCarousel}>
          <img src={logo} className={style.logo} alt="logo"/>
          <Carousel autoplay>
            <div>
              <span>Test 1</span>
            </div>
            <div>
              <span >Test 2</span>
            </div>
            <div>
              <span >Test 3</span>
            </div>
            <div>
              <span>Что-то прекрасное о вузе</span>
            </div>
          </Carousel>
        </div>
        <div className={style.buttons}>
          <span className={style.mainButton}>
            <Button type="primary" href="#">
              <Icon type="left" />
              На главную
            </Button>
          </span>
          <span className={style.helpButton}>
            <Button type="primary" shape="round" size={'medium'} href="#">
              Помощь
            </Button>
          </span>
        </div>
      </div>

      <div className={style.rightSide}>
        <div className={style.loginForm}>
          <span className={style.textCenter}>Вход</span>
          <Input size="large" placeholder="Email" />
          <span className={style.passAndCheckBox}>
            <Input.Password size="large" placeholder="Password" />
            <span className={style.boxAndForget}>
              <span className={style.checkBox}><Checkbox>Запомнить меня</Checkbox></span>
              <Link to={'#'}><span className={style.forgetPass}>Забыли пароль?</span></Link>  
            </span>
          </span>
          <Button type="primary" href="#">Войти</Button>
        </div>
      </div>
    </div>
      
  );
}

export default Login;
