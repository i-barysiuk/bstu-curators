
import React from "react";
import {  Form,
  Input,
  Tooltip,
  Icon,
  Checkbox,
  Button,
  Carousel,
 } from "antd";
import "./style.css";
import style from "./style.module.scss";
import logo from "../../assets/img/logo.png";
import 'antd/dist/antd.css';

function SignUp(props) {
  const { getFieldDecorator } = this.props.form;
  const tailFormItemLayout  = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const formItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
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
<Button type="primary" href="#">
  <Icon type="left" />
    На главную
</Button>
<Button type="primary" size={"medium"} href="#">
  Помощь
</Button>
</div>
</div>

<div className={style.rightSide}>
<div className={style.loginForm}>
  <span className={style.textCenter}>Регистрация</span>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
</div>  
</div> 
</div>
);
}


const WrappedRegistrationForm = Form.create({ name: 'register' })(SignUp);
export default WrappedRegistrationForm;