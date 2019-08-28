import React from "react";
import { connect } from "react-redux";
import locale from "antd/es/date-picker/locale/ru_RU";
import {
  Form,
  Modal,
  Row,
  Col,
  Input,
  Select,
  Collapse,
  DatePicker,
  Steps,
  Button,
  Radio,
  Icon,
  Card
} from "antd";
import {closeStudentModal} from "../../redux/actions/modal"
import style from "./style.module.scss"

const { Option } = Select;
const { Panel } = Collapse;
const { Step } = Steps;

class StudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      cardState: "card",
      form: {}
    };
  }

  changeStep = current => {
    this.setState({ current });
  };

  setCardVisible = () => {
    if(this.state.cardState==="card") this.setState({cardState: "add"});
    else this.setState({cardState:"card"});
  }

  render() {
    const { current } = this.state;
    const {
      form: { getFieldDecorator, getFieldValue },
      isOpen,
      closeStudentModal
    } = this.props;

    var cardContent = [];

    for (var i = 1; i <= 3; i++) {
      cardContent.push(i);
    }
    
    var steps = [];

    for (let i = 0; i < 7; i++){
      steps.push(i);
    }

    const stepName = [
      'Общие сведения',
      'Паспортные данные',
      'Место жительства',
      'Законные представители',
      'Медицинские данные',
      'Хобби',
      'Контакты'
    ]
    
    return (
      <Modal
        width={"70%"}
        title="Добавление студента"
        centered
        className={style.modal}
        destroyOnClose={true}
        maskClosable={false}
        okText={"Сохранить"}
        cancelText={"Отмена"}
        onCancel={() => closeStudentModal()|this.setState({current: 0})}
        //onOk={() => this.save() ? closeModal() : null}
        visible={isOpen}
        zIndex={1030}
      >
      <Form>
        <Steps current={current} onChange={this.changeStep} style={{paddingBottom:20}} labelPlacement='vertical'>
        {steps.map(item => {
                  return (
                    <Step status={item === current ? 'process' : 'wait'} title={stepName[item]}/>
                  );
                })}
          </Steps>
        <Collapse 
        className={style.collapsePanel}
        bordered={false}
        activeKey = {`${current+1}`}
        >
          <Panel key="1">
            <Row type="flex" gutter={20} style={{paddingTop:30}}>
            <Col span={8} push={2}>
            <Form.Item label="Фамилия">
            {getFieldDecorator("last_name", {
                      rules: [
                        {
                          required: true,
                          message: "Укажите фамилию"
                        },
                        {
                          pattern: /(^[А-Я]{1}[а-я]{1,20}$)|(^[А-Я]{1}[а-я]{1,20}-[А-я]{1,20}$)/,
                          message: "Введены некорректные данные"
                        }
                      ],
                      validateTrigger: "onBlur",
                      initialValue: this.state.form.last_name
                    })(<Input />)}
            </Form.Item>
            </Col>
            <Col span={8} push={4}>
            <Form.Item label="Имя">
            {getFieldDecorator("full_name", {
                      rules: [
                        {
                          required: true,
                          message: "Укажите имя"
                        },
                        {
                          pattern: /(^[А-Я]{1}[а-я]{1,20}$)/,
                          message: "Введены некорректные данные"
                        }
                      ],
                      validateTrigger: "onBlur",
                      initialValue: this.state.form.full_name
                    })(<Input />)}
            </Form.Item>
            </Col>
            </Row>
            <Row type="flex" gutter={20}>
            <Col span={8} push={2}>
            <Form.Item label="Отчество">
            {getFieldDecorator("f_name", {
                      rules: [
                        {
                          required: true,
                          message: "Укажите отчество"
                        },
                        {
                          pattern: /(^[А-Я]{1}[а-я]{1,20}$)/,
                          message: "Введены некорректные данные"
                        }
                      ],
                      validateTrigger: "onBlur",
                      initialValue: this.state.form.f_name
                    })(<Input />)}
            </Form.Item>
            </Col>
            <Col span={8} push={4}>
            <Form.Item label="Должность">
            {getFieldDecorator("position", {
                      rules: [
                        {
                          required: true,
                          message: "Укажите должность"
                        },
                        {
                          pattern: /(^[А-Я]{1}[а-я]{1,20}$)/,
                          message: "Введены некорректные данные"
                        }
                      ],
                      validateTrigger: "onBlur",
                      initialValue: this.state.form.position
                    })(<Input />)}
                    </Form.Item>
                    </Col>
                    </Row>
                    <Row type="flex" gutter={20}>
                    <Col span={8} push={2}>
                    <Form.Item label="Факультет">
                    {getFieldDecorator("faculty", {
                      rules: [
                        {
                          required: true,
                          message: "Выберите факультет",
                          whitespace: true
                        }
                      ],
                      initialValue: this.state.form.faculty,
                      validateTrigger: "onBlur"
                    })(
                      <Select
                        dropdownClassName={style.select}
                        showSearch
                        placeholder="Выберите..."
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="ФЭИС">ФЭИС</Option>
                        <Option value="ФИСЭ">ФИСЭ</Option>
                        <Option value="СФ">СФ</Option>
                        <Option value="ЭФ">ЭФ</Option>
                        <Option value="МСФ">МСФ</Option>
                        <Option value="Заочное">Заочное</Option>
                        <Option value="Иностранные">Иностранные</Option>
                      </Select>
                    )}
                  </Form.Item>
                  </Col>
                  <Col span={8} push={4}>
                  <Form.Item label="Группа">
                  {getFieldDecorator("group", {
                      rules: [
                        {
                          required: true,
                          message: "Укажите группу"
                        },
                        {
                          pattern: /(^[А-Я]{1}[а-я]{1,20}$)/,
                          message: "Введены некорректные данные"
                        }
                      ],
                      validateTrigger: "onBlur",
                      initialValue: this.state.form.group
                    })(<Input />)}
                    </Form.Item>
                    </Col>
                    </Row>
                    <Row type="flex" gutter={20}>
                    <Col span={8} push={2}>
                    <Form.Item label="Пол">
                  {getFieldDecorator("sex", {
                    rules: [{ required: true, message: "Пол не выбран!" }],
                    initialValue: this.state.form.sex
                  })(
                    <Radio.Group buttonStyle="solid" className={style.radio}>
                      <Radio.Button value={"men"}>Мужской</Radio.Button>
                      <Radio.Button value={"women"}>Женский</Radio.Button>
                    </Radio.Group>
                  )}
                  </Form.Item>
                  </Col>
                  <Col span={8} push={4}>
                     <Form.Item label="Дата рождения">
                      {getFieldDecorator("birthday", {
                      rules: [
                        {
                          required: true,
                          message: "Пожалуйста укажите дату рождения"
                        },
                        {
                          pattern: /(^[А-Я]{1}[а-я]{1,20}$)/,
                          message: "Введены некорректные данные"
                        }
                      ],
                      validateTrigger: "onBlur",
                      initialValue: this.state.form.birthday
                    })(<DatePicker 
                    locale={locale} 
                    className={style.datePicker}
                    dropdownClassName={style.datePickerDD}
                    /> 
                    )}
                    </Form.Item>
                    </Col>
                    </Row>
          </Panel>
          <Panel key="2">
          <Row type="flex" gutter={20} style={{paddingTop:30}}>
            <Col span={8} push={2}>
              <Form.Item label="Гражданство">
                {getFieldDecorator("nationality", {
                          rules: [
                            {
                              required: true,
                              message: "Пожалуйста укажите гражданство"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.nationality
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type="flex" gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Серия и номер паспорта">
                {getFieldDecorator("passport_series", {
                          rules: [
                            {
                              required: true,
                              message: "Пожалуйста укажите серию и номер паспорта"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.passport_series
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Идентификационный номер">
                {getFieldDecorator("passportId", {
                          rules: [
                            {
                              required: true,
                              message: "Пожалуйста укажите идентификационный номер"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.passportId
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type="flex" gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Кем выдан">
                {getFieldDecorator("issuing_authority", {
                          rules: [
                            {
                              required: true,
                              message: "Пожалуйста укажите кем выдан паспорт"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.issuing_authority
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Когда выдан">
                      {getFieldDecorator("date_issue", {
                      rules: [
                        {
                          required: true,
                          message: "Пожалуйста укажите дату"
                        },
                        {
                          pattern: /(^[А-Я]{1}[а-я]{1,20}$)/,
                          message: "Введены некорректные данные"
                        }
                      ],
                      validateTrigger: "onBlur",
                      initialValue: this.state.form.date_issue
                    })(<DatePicker 
                    locale={locale} 
                    className={style.datePicker}
                    dropdownClassName={style.datePickerDD}
                    /> 
                    )}
                </Form.Item>
                </Col>
                </Row>
          </Panel>
          <Panel key="3">
          <Row type='flex' gutter={20} style={{paddingTop:30}}>
          <Col span={8} push={2}>
          <label>Домашний адрес</label>
          </Col>
          <Col span={8} push={4}>
          <label>Адрес в период обучения</label>
          </Col>
          </Row>
          <Row type='flex' gutter={20}>
          <Col span={8} push={2}>
          <Form.Item label="Город">
                {getFieldDecorator("home_city", {
                          rules: [
                            {
                              required: true,
                              message: "Пожалуйста укажите город"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.home_city
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Город">
                {getFieldDecorator("study_city", {
                          rules: [
                            {
                              required: true,
                              message: "Пожалуйста укажите город"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.study_city
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type='flex' gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Улица">
                {getFieldDecorator("home_street", {
                          rules: [
                            {
                              required: true,
                              message: "Пожалуйста укажите улицу"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.home_street
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Улица">
                {getFieldDecorator("study_street", {
                          rules: [
                            {
                              required: true,
                              message: "Пожалуйста укажите улицу"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.study_street
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type='flex' gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Дом">
                {getFieldDecorator("home_number", {
                          rules: [
                            {
                              required: true,
                              message: "Пожалуйста укажите номер дома"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.home_number
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Дом">
                {getFieldDecorator("study_number", {
                          rules: [
                            {
                              required: true,
                              message: "Пожалуйста укажите номер дома"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.study_number
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type='flex' gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Квартира">
                {getFieldDecorator("home_room", {
                          rules: [
                            {
                              required: true,
                              message: "Пожалуйста укажите номер квартиры"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.home_room
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Квартира">
                {getFieldDecorator("study_room", {
                          rules: [
                            {
                              required: true,
                              message: "Пожалуйста укажите номер квартиры"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.study_room
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
          </Panel>
          <Panel key="4">
            <Collapse 
            style={{paddingTop:30}}
            className={style.collapsePanel}
            bordered={false}
            activeKey = {this.state.cardState}
            >
            <Panel key="card">
            <Row type='flex'>
              <Col span={4} push={2}>
              <Button onClick={this.setCardVisible}><Icon type="plus"/>Добавить</Button>
              </Col>
            </Row>
            <Row type='flex'>
            {cardContent.map(item => {
                  return (
                    <Card 
                    title="Статус"
                    extra=
                    {
                    <Button 
                    onClick={this.setCardVisible}
                    >
                    <Icon type='edit'/>
                    </Button>
                    }
                    bordered={false}
                    style={{background: "#E1E1E1", borderRadius: 15, width: 300, height: 350, margin: 20 }}>
                    <Row type='flex'>
                    ФИО<br/><br/>
                    Должность<br/><br/>
                    Номер
                    </Row>
                    </Card>
                  );
                  })}
                  </Row>
            </Panel>
            <Panel key="add">
            <Row type='flex' gutter={20}>
            <Col span={8} push={2}>
                <Form.Item label="Статус">
                {getFieldDecorator("representatives.status", {
                          rules: [
                            {
                              required: true,
                              message: "Заполните это поле"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.representatives.status
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type='flex' gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Фамилия">
                {getFieldDecorator("representatives.last_name", {
                          rules: [
                            {
                              required: true,
                              message: "Заполните это поле"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.representatives.last_name
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Имя">
                {getFieldDecorator("representatives.full_name", {
                          rules: [
                            {
                              required: true,
                              message: "Заполните это поле"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.representatives.full_name
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type='flex' gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Отчество">
                {getFieldDecorator("representatives.f_name", {
                          rules: [
                            {
                              required: true,
                              message: "Заполните это поле"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.representatives.f_name
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type='flex' gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Место работы/Должность">
                {getFieldDecorator("representatives.position", {
                          rules: [
                            {
                              required: true,
                              message: "Заполните это поле"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.representatives.position
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Телефон">
                {getFieldDecorator("representatives.phone", {
                          rules: [
                            {
                              required: true,
                              message: "Заполните это поле"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.representatives.phone
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type='flex'>
              <Col span={4} push={18}>
              <Button onClick={this.setCardVisible} type="primary"><Icon type="edit"/>Записать</Button>
              </Col>
              </Row>
                </Panel>
                </Collapse>
          </Panel>
          <Panel key="5">
            <Row type='flex' gutter={20} style={{paddingTop:30}}>
            <Col span={8} push={2}>
            <Form.Item label="Хронические заболевания">
                {getFieldDecorator("hronic_disease", {
                          rules: [
                            {
                              required: true,
                              message: "Заполните это поле"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.hronic_disease
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type='flex' gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Группа здоровья">
                {getFieldDecorator("health_group", {
                          rules: [
                            {
                              required: true,
                              message: "Заполните это поле"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.health_group
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Группа по физкультуре">
                {getFieldDecorator("pe_group", {
                          rules: [
                            {
                              required: true,
                              message: "Заполните это поле"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.pe_group
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
          </Panel>
          <Panel key="6">
          <Row type='flex' style={{paddingTop:30}}>
          <Col span={12} push={2}>
          {getFieldDecorator("hobbies", {
            initialValue: this.state.form.hobbies
          })(<Select mode="tags" className={style.tags} dropdownClassName={style.select}></Select>)}
          </Col>
          <Col span={8} push={4}>
          Здесь что-то будет
          </Col>
          </Row>
          </Panel>
          <Panel key="7">
          <Row type='flex' gutter={20} style={{paddingTop:30}}>
          <Col span={8} push={2}>
          <Form.Item label="Телефон">
                {getFieldDecorator("phone", {
                          rules: [
                            {
                              required: true,
                              message: "Заполните это поле"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.phone
                        })(<Input/>)}
                </Form.Item>
                </Col>
                </Row>
                <Row type='flex' gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="UID">
                {getFieldDecorator("uid", {
                          rules: [
                            {
                              required: true,
                              message: "Заполните это поле"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.uid
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Номер студенческого билета">
                {getFieldDecorator("studentId", {
                          rules: [
                            {
                              required: true,
                              message: "Заполните это поле"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.studentId
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type='flex' gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Email">
                {getFieldDecorator("email", {
                          rules: [
                            {
                              required: true,
                              message: "Заполните это поле"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.email
                        })(<Input type="email"/>)}
                </Form.Item>
                </Col>
                </Row>
          </Panel>
        </Collapse>
        </Form>
      </Modal>
    );
  }
}

const WrappedStudentForm = Form.create({ name: "student" })(StudentForm);

const mapStateToProps = state => ({
  profileId: state.users.profile.id,
  isOpen: state.modal.studentsIsOpen
});

const mapDispatchToProps = {
  closeStudentModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedStudentForm);