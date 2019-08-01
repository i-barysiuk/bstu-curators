import React from 'react';
import 'antd/dist/antd.css';
import {Form, DatePicker, Select, Input, Steps, message, Col, Button,} from 'antd';
import style from "../loginForm/style.module.scss";

const { Step } = Steps;
const { Option } = Select;
class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Заполните все поля !: ", values);
      }
    });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('Пароль')) {
      callback('Пароли не совпадают!');
    } else {
      callback();
    }
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    const { getFieldDecorator } = this.props.form;
    const steps = [
      {
        title: 'Основное',
        content : 
        <Form onSubmit={this.handleSubmit}>
         <Form.Item label="Фамилия" size = "large">
          <Col span={24}>
          {getFieldDecorator('Фамилия', {
            rules: [{ required: true, message: 'Введите свою фамилию!', whitespace: true }],
          })(<Input placeholder="Введите свою фамилию"/>)}
          </Col>
         </Form.Item>
         <Form.Item label="Имя">
          <Col span={24}>
          {getFieldDecorator('Имя', {
                        rules: [{ required: true, message: 'Введите своё Имя!', whitespace: true }],
          })(<Input placeholder="Введите своё имя" />)}
          </Col>
         </Form.Item>
         <Form.Item label="Отчетсво">
          <Col span={24}>
          {getFieldDecorator('Отчество', {
                        rules: [{ required: true, message: 'Выберите дату рождения!', whitespace: true }],
          })(<Input placeholder="Введите свое отчество" style={{ width: 300 }}/>)}
          </Col>
         </Form.Item> 
        </Form>
      },
      {
        title: 'Прочее',
        content :
        <Form onSubmit={this.handleSubmit}>
         <Form.Item label="Пол:" >
            <Button>Мужской</Button>
              <Button style = {{marginLeft: "5px"}}>Женский</Button>
         </Form.Item>
         <Form.Item label="Дата рождения" >
          {getFieldDecorator('Выберите дату рождения', {
            rules: [{ required: true, message: 'Выберите дату рождения!' }],
          })(<DatePicker style={{ width: 300 }} />)}
         </Form.Item>
         <Form.Item label="Город" hasFeedback>
          {getFieldDecorator('Выберете город', {
            rules: [{ required: true, message: 'Выберете свой город!' }],
          })(
            <Select placeholder="Выберете свой город!">
              <Option value="Брест">Брест</Option>
              <Option value="Минск">Минск</Option>
            </Select>,
          )}
         </Form.Item>
       </Form>
      },
      {
        title: 'Контакты',
        content :
        <Form  onSubmit={this.handleSubmit}>
                  <Form.Item label="Электронная почта">
          {getFieldDecorator('Электронная почта', {
            rules: [
              {
                type: 'email',
                message: 'Некорректная электронная почта!',
              },
              {
                required: true,
                message: 'Введите свою электронную почту!',
              },
            ],
          })(<Input placeholder="Введите электронную почту" style={{ width: 300 }}/>)}
         </Form.Item>
         <Form.Item label="Телефон">
          {getFieldDecorator('Телефон', {
            rules: [{ required: true, message: 'Введите свой номер телефона!' }],
          })(<Input placeholder="Введите свой номер телефона"/>)}
         </Form.Item>
         <Form.Item label="Пароль" hasFeedback>
          {getFieldDecorator('Пароль', {
            rules: [
              {
                required: true,
                message: 'Придумайте пароль!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password placeholder="Введите пароль"/>)}
         </Form.Item>
         <Form.Item label="Подтвердите пароль" hasFeedback>
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
          })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="Подтвердите пароль" />)}
         </Form.Item>
        </Form>
      },
    ];
    return (
      
      <div className={style.s}>
      <Steps  size = "small" current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
       <div className={style.steps}>
        <div className={style.stepsContent}>{steps[current].content}</div>
         <div className={style.stepsAction}>
          {current > 0 && (
            <Button htmlType="submit" style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Назад
            </Button>
          )}
                    {current < steps.length - 1 && (
            <Button htmlType="submit" style={{ marginLeft: 200 }} type="primary" onClick={() => this.next()}>
              Далее
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button  htmlType="submit" type="primary" style={{ marginLeft: 80 }} onClick={() => message.success('Вы успешно зарегестрировались!')}>
              Зарегистрироваться
            </Button>
          )}
         </div>
       </div>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
export default WrappedRegistrationForm;
