import React from "react";
import {
  Form,
  DatePicker,
  Input,
  Steps,
  Radio,
  Button,
  Col,
  Row,
  Modal,
  Collapse
} from "antd";
import style from "../registerForm/style.module.scss";
import AuthService from "../../services/AuthService";
import { withRouter } from "react-router-dom";
import moment from "moment";

const { Step } = Steps;
const { Panel } = Collapse;

function disabledDate(current) {
  return current && current > moment().endOf("day");
}
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      currentStep: 0
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        AuthService.register(values)
          .then(data => {
            Modal.success({
              title: "Пользователь успешно зарегистрирован!",
              content:
                "Спасибо за проявленный интерес к нашему продукту. Приятного Вам использования!",
              okText: "Войти",
              cancelText: "На главную",
              onOk: () => {
                this.props.history.push("/login");
              },
              onCancel: () => {
                this.props.history.push("/");
              }
            });
          })
          .catch(err => {
            console.log(err);
            Modal.error({
              title: "К сожалению произошла ошибка!",
              content: JSON.stringify(err.response.data.errors[0].message),
              okText: "Исправить данные"
            });
          });
      }
    });
  };

  check = (rule, value, callback) => {
    AuthService.check(value)
      .then(data => {
        callback();
      })
      .catch(err => {
        callback("Пользователь существует!");
      });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Пароли не совпадают!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  normalize = value => {
    return value && value.replace(/ /g, "").trim();
  };
 

  prev() {
    const current = this.state.currentStep - 1;
    this.setState({ currentStep: current });
  }

  next() {
    var validation = [
      ["first_name", "last_name", "f_name"],
      ["sex", "birthday", "city"],
      []
    ];
    var fields = this.props.form.getFieldsValue();

    this.props.form.validateFieldsAndScroll(
      validation[this.state.currentStep],
      (err, values) => {
        if (!err) {
          const current = this.state.currentStep + 1;
          this.setState({ form: fields, currentStep: current });
        }
      }
    );
  }

  render() {
    const { currentStep } = this.state;
    const {
      form: { getFieldDecorator, getFieldsError}
    } = this.props;
    const steps = [1,2,3];
    return (
      <div className={style.container + " " + this.props.className}>
        <Form onSubmit={this.handleSubmit}>
        <Steps current={currentStep} className={style.steps}>
            <Step /><Step /><Step />
        </Steps>
          <Collapse 
          className={style.collapsePanel}
          bordered={false}
          activeKey = {`${currentStep+1}`}
          >
            <Panel key="1">
            <Form.Item label="Фамилия">
              {getFieldDecorator("last_name", {
                rules: [
                  {
                    required: true,
                    message: "Поле фамилия должно быть заполнено!",
                    whitespace: true
                  },
                  {
                    // eslint-disable-next-line
                    pattern: /(^[А-я]{1,20}$)|(^[А-я]{1,20}\-([А-я]{1,16})$)/,
                    message: "Используйте только буквы русского алфавита"
                  }
                ],
                normalize: this.normalize,
                initialValue: this.state.form.last_name,
                validateTrigger: "onChange"
              })(<Input placeholder="Введите свою фамилию" />)}
            </Form.Item>
            <Form.Item label="Имя">
              {getFieldDecorator("first_name", {
                rules: [
                  {
                    required: true,
                    message: "Поле имя должно быть заполнено!",
                    whitespace: true
                  },
                  {
                    // eslint-disable-next-line
                    pattern: /(^[А-я]{1,20}$)|(^[А-я]{1,20}\-([А-я]{1,16})$)/,
                    message: "Используйте только буквы русского алфавита"
                  }
                ],
                normalize: this.normalize,
                initialValue: this.state.form.first_name,
                validateTrigger: "onChange"
              })(<Input placeholder="Введите своё имя" />)}
            </Form.Item>
            <Form.Item label="Отчетсво">
              {getFieldDecorator("f_name", {
                rules: [
                  {
                    pattern: /(^[А-я]{1,20}$)/,
                    message: "Используйте только буквы русского алфавита"
                  }
                ],
                normalize: this.normalize,
                initialValue: this.state.form.f_name
              })(<Input placeholder="Введите свое отчество" />)}
            </Form.Item>
            </Panel>
            <Panel key="2">
            <Row type="flex" justify="space-between">
               <Col>
                 <Form.Item label="Пол">
                   {getFieldDecorator("sex", {
                    rules: [{ required: true, message: "Пол не выбран!" }],
                    initialValue: this.state.form.sex
                  })(
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value={"men"}>Мужской</Radio.Button>
                      <Radio.Button value={"woman"}>Женский</Radio.Button>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="Дата рождения">
                  {getFieldDecorator("birthday", {
                    initialValue: this.state.form.birthday
                  })(
                    <DatePicker
                      disabledDate={disabledDate}
                      placeholder="Дата рождения"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Кафедра, отдел или факультет">
              {getFieldDecorator("department", {
                initialValue: this.state.form.department
              })(<Input placeholder="Введите отдел, кафедру или факультет" />)}
            </Form.Item>
            <Form.Item label="Должность">
              {getFieldDecorator("position", {
                initialValue: this.state.form.position
              })(<Input placeholder="Введите должность" />)}
            </Form.Item>
            <Form.Item label="Научное звание">
              {getFieldDecorator("title", {
                initialValue: this.state.form.title
              })(<Input placeholder="Введите научное звание" />)}
            </Form.Item>
            </Panel>
            <Panel key="3">
            <Form.Item label="Электронная почта">
             {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: "Введите свою электронную почту!"
                  },
                  {
                    type: "email",
                    message: "Некорректная электронная почта!"
                  },
                  {
                    validator: this.check
                  }
                ],
                normalize: this.normalize,
                initialValue: this.state.form.email,
                validateTrigger: "onBlur",
                validateFirst: true
              })(<Input placeholder="Введите электронную почту" />)}
            </Form.Item>
            <Form.Item label="Телефон">
              {getFieldDecorator("phone", {
                rules: [
                  {
                    required: true,
                    message: "Введите свой номер телефона!"
                  },
                  {
                    pattern: /(^\+375[0-9]{7,9}$)/,
                    message: "Введите корректный номер телефона"
                  },
                  {
                    validator: this.check
                  }
                ],
                normalize: this.normalize,
                initialValue: this.state.form.phone,
                validateTrigger: "onBlur",
                validateFirst: true
              })(<Input placeholder="Введите свой номер телефона" />)}
            </Form.Item>
            <Form.Item label="Пароль" hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Придумайте пароль!"
                  },
                  {
                    min: 8,
                    message: "Пароль должен быть больше 8 символов!"
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ],
                validateTrigger: "onBlur",
                validateFirst: true
              })(<Input.Password placeholder="Введите пароль" />)}
            </Form.Item>
            <Form.Item label="Подтвердите пароль" hasFeedback>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Пожалуйста подтвердите свой пароль!"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ],
                validateTrigger: "onBlur",
                validateFirst: true
              })(<Input.Password placeholder="Подтвердите пароль" />)}
            </Form.Item>
            </Panel>
          </Collapse>

          <div className={style.stepsContent}>{steps[currentStep].content}</div>
          <div className={style.stepsAction}>
            <Button disabled={currentStep === 0} onClick={() => this.prev()}>
              Назад
            </Button>
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                Далее
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                Зарегистрироваться
              </Button>
            )}
          </div>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);
export default withRouter(WrappedRegistrationForm);
