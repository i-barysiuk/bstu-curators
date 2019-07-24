import React from "react";
import { Form, Input, Checkbox, Button, Carousel, Icon} from "antd";
import { Link } from "react-router-dom";
import "./style.css";
import style from "./style.module.scss";
import logo from "../../assets/images/logos/logo.png";

function Login(props) {
  const { getFieldDecorator } = props.form;
  return (
    <div className={style.container}>
      <div className={style.bar}>
        <div className={style.logoAndCarousel}>
          <img src={logo} className={style.logo} alt="logo" />
          <Carousel autoplay>
            <div>
              <span>Test 1</span>
            </div>
            <div>
              <span>Test 2</span>
            </div>
            <div>
              <span>Test 3</span>
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
          <Button type="primary" size={"medium"} href="#">
            Помощь
          </Button>
        </span>
        </div>
      </div>

      <div className={style.rightSide}>
        <div className={style.loginForm}>
          <span className={style.textCenter}>Вход</span>
            <Form className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Введите имя пользователя!' }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Имя пользователя"
                  />,
                )}
              </Form.Item>
              <span className={style.passAndCheckBox}>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Введите ваш пароль!' }],
                  })(
                    <Input.Password
                      size="large"
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="Парольawdaw"
                    />,
                  )}
                </Form.Item>
                <span className={style.boxAndForget}>
                  <Form.Item>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(<Checkbox>Запомнить меня</Checkbox>)}
                  </Form.Item>     
                </span> 
              </span>
            </Form>  
            <Button type="primary" href="#">
              Войти
            </Button>
              или <Link to={"#"}>зарегистрироваться</Link>   
            <Link to={"#"}>
              забыли пароль?
            </Link>   

          {/* <Input size="large" placeholder="Email" />
          <span className={style.passAndCheckBox}>
            <Input.Password size="large" placeholder="Password" />
            <span className={style.boxAndForget}>
              <span className={style.checkBox}>
                <Checkbox>Запомнить меня</Checkbox>
              </span>
              <Link to={"#"}>
                <span className={style.forgetPass}>Забыли пароль?</span>
              </Link>
            </span>
          </span>
          <Button type="primary" href="#">
            Войти
          </Button>
          <a href="">или зарегестрироваться</a>  */}

        </div>  
      </div> 
    
    </div>
  );
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm;
