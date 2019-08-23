import React from "react";
import { connect } from "react-redux";
import { Avatar, Form, Input, Button, Icon } from "antd";
import style from "./style.module.scss";
import { login } from "../../redux/actions/auth";
import { whoAmI } from "../../redux/actions/users";
import AuthService from "../../services/AuthService";
import { Link } from 'react-router-dom'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "user",
      user: {}
    };
  }
  onclick () {
    window.location.assign('/');
  }
  
  checkUser = (rule, value, callback) => {
    AuthService.info(value)
      .then(res => {
        this.setState({ user: res.data, icon: null });
        callback();
      })
      .catch(err => {
        this.setState({ user: {}, icon: "user" });
        callback("Что-то пошло не так:(");
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.login(values);
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    return (
      <div className={style.container}>
        <Avatar size={100} icon={this.state.icon}>
          {this.state.user.initials}
        </Avatar>
        <h3 className={style.userName}>
          {this.state.user.first_name} {this.state.user.last_name}
        </h3>
        <Form className={style.loginForm} onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator("login", {
              validateFirst: true,
              rules: [
                {
                  required: true,
                  message: "Пожалуйста введите email или телефон"
                },
                { validator: this.checkUser }
              ],
              validateTrigger: "onBlur"
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email или телефон"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "Введите ваш пароль" }],
              validateTrigger: "onBlur"
            })(
              <Input.Password
                size="large"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Пароль"
              />
            )}
          </Form.Item>
          <p className={style.errorMessage}>{this.props.auth.message}</p>
          <Form.Item>
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              className={style.loginButton}
              disabled={hasErrors(getFieldsError())}
              loading={this.props.auth.loading}
              onClick={(e) => this.onclick(e)}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
        <div >
          Нет аккаунта?  <Link to="/register"> Зарегистрируйтесь</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = {
  login,
  whoAmI
};

const WrappedLoginForm = Form.create({ name: "login" })(LoginForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedLoginForm);
