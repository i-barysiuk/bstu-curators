import React from 'react';
import 'antd/dist/antd.css';
import {Form, Input,Tooltip, Icon, Select, Col, Checkbox, Button,} from 'antd';
import style from "../loginForm/style.module.scss";
import {Link } from "react-router-dom";

const { Option } = Select;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Пароли не совпадают!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '375',
    })(
      <Select style={{ width: 100 }}>
        <Option value="375">+375</Option>
      </Select>
    );
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="E-mail">
        <Col span={14}>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'Введите правильный email!',
              },
              {
                required: true,
                message: 'Пожалуйства введите свой E-mail!',
              },
            ],
          })(<Input />)}
          </Col>
        </Form.Item>
        <Form.Item label="Пароль" hasFeedback>
        <Col span={14}>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Введите свой пароль!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
          </Col>
        </Form.Item >
        <Form.Item label="Подтвердите свой пароль" hasFeedback>
        <Col span={14}>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Пожалуйста подтвердите свой пароль!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Col>
        </Form.Item>
        <Form.Item
          label={
            <span>
              UserName&nbsp;
              <Tooltip title="Как вы хотите, чтобы вас называли?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }><Col span={14}>
          {getFieldDecorator('Username', {
            rules: [{ required: true, message: 'Введите свой Username!', whitespace: true }],
          })(<Input />)}
          </Col>
        </Form.Item>
        <Form.Item label="Номер телефона">
          <Col span={14}>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Введите номер телефона!' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
          </Col>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              Я прочитал и принимаю  <Link >Условия соглашения</Link>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
export default WrappedRegistrationForm;
