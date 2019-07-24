import React from "react";
import { Form, Input, Checkbox, Button, Icon} from "antd";
import { Link } from "react-router-dom";
import "./style.css";
import style from "./style.module.scss";
import 'antd/dist/antd.css';
import Tips from "../tips/Tips";


function Login(props) {
  const { getFieldDecorator } = props.form;
  return (
    <div className={style.container}>
      <Tips/>
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
               <Form.Item>
                 {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Введите ваш пароль!' }],
                })(
                  <Input.Password
                    size="large"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Пароль"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>Запомнить меня</Checkbox>)}
                  <Link to={"#"} className="login-form-forgot">
                   Забыли пароль?
                </Link>
              </Form.Item>         
            </Form>  
            <Button type="primary" href="#">
              Войти
            </Button>
              или <Link to={"#"}>зарегистрироваться</Link>   
        </div>  
      </div>
    </div>
     

  );
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;
