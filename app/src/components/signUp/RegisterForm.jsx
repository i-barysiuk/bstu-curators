import React from 'react';
import 'antd/dist/antd.css';
import {Form, Input, Cascader, Steps, message, Col, Button, Row,} from 'antd';
import style from "../loginForm/style.module.scss";

const { Step } = Steps;
const residences = [
  {
    value: 'Брест',
    label: 'Брест',
  },
  {
    value: 'Минск',
    label: 'Минск',
  }
]


class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
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
    const steps = [
      {
        title: 'Основное',
        content : 
        <Form className = {style.FirstStep}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}></Form>
        <Form.Item label="Фамилия" size = "large">
        <Col span={24}>
          {getFieldDecorator('Фамилия', {
            rules: [{ required: true, message: 'Введите свою фамилию!', whitespace: true }],
          })(<Input  />)}
          </Col>
        </Form.Item>
        <Form.Item label="Имя">
        <Col span={24}>
          {getFieldDecorator('Имя', {
                        rules: [{ required: true, message: 'Введите своё Имя!', whitespace: true }],
          })(<Input />)}
          </Col>
        </Form.Item>
        <Form.Item label="Отчетсво">
        <Col span={24}>
          {getFieldDecorator('Отчество', {
                        rules: [{ required: true, message: 'Выберите дату рождения!', whitespace: true }],
          })(<Input style={{ width: 300 }}/>)}
          </Col>
        </Form.Item> 
        </Form>
      },
      {
        title: 'Прочее',
        content :
        <Form>
        <Form.Item label="Пол:" >
            <Col span={24}>
            <Button>Мужской</Button>
              <Button style = {{marginLeft: "5px"}}>Женский</Button>
            </Col>
        </Form.Item>
      <Form.Item label="Дата рождения:">
      <Col span={24}>
        {getFieldDecorator('Дата рождения', {
                      rules: [{ required: true, message: 'Выберите дату рождения!', whitespace: true }],
        })(<Input  style={{ width: 300 }}/>)}
        </Col>
      </Form.Item> 
      <Form.Item label="Город: ">
       <Col span={24}>
          {getFieldDecorator('Город', {
            initialValue: ['', 'Брест', 'Минск'],
            rules: [
              { required: true, message: 'Выберете ваш город!' },
            ],
          })(<Cascader options={residences} />)}
       </Col>
      </Form.Item>
    </Form>
      },
      {
        title: 'Контакты',
        
      },
    ];
    return (
      <div>
      <Steps size="small" current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className={style.steps}>
        <div className={style.stepsContent}>{steps[current].content}</div>
        <div className={style.stepsAction}>
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Вы успешно зарегестрировались!')}>
              Зарегистрироваться
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Назад
            </Button>
          )}
                    {current < steps.length - 1 && (
            <Button style={{ marginLeft: 100 }} type="primary" onClick={() => this.next()}>
              Далее
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
