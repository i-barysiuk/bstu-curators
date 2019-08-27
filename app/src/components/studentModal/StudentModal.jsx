import React from "react";
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
import {closeModal} from "../../redux/actions/modal"
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
      closeModal
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
        //onCancel={() => closeModal()|this.setState({current: 0})}
        //onOk={() => this.save() ? closeModal() : null}
        visible={true}//isOpen
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
            {getFieldDecorator("surname", {
                      rules: [
                        {
                          required: true,
                          message: "Пожалуйста укажите фамилию"
                        },
                        {
                          pattern: /(^[А-Я]{1}[а-я]{1,20}$)|(^[А-Я]{1}[а-я]{1,20}-[А-я]{1,20}$)/,
                          message: "Введены некорректные данные"
                        }
                      ],
                      validateTrigger: "onBlur",
                      initialValue: this.state.form.surname
                    })(<Input />)}
            </Form.Item>
            </Col>
            <Col span={8} push={4}>
            <Form.Item label="Имя">
            {getFieldDecorator("name", {
                      rules: [
                        {
                          required: true,
                          message: "Пожалуйста укажите имя"
                        },
                        {
                          pattern: /(^[А-Я]{1}[а-я]{1,20}$)/,
                          message: "Введены некорректные данные"
                        }
                      ],
                      validateTrigger: "onBlur",
                      initialValue: this.state.form.name
                    })(<Input />)}
            </Form.Item>
            </Col>
            </Row>
            <Row type="flex" gutter={20}>
            <Col span={8} push={2}>
            <Form.Item label="Отчество">
            {getFieldDecorator("patronymic", {
                      rules: [
                        {
                          required: true,
                          message: "Пожалуйста укажите отчество"
                        },
                        {
                          pattern: /(^[А-Я]{1}[а-я]{1,20}$)/,
                          message: "Введены некорректные данные"
                        }
                      ],
                      validateTrigger: "onBlur",
                      initialValue: this.state.form.patronymic
                    })(<Input />)}
            </Form.Item>
            </Col>
            <Col span={8} push={4}>
            <Form.Item label="Должность">
            {getFieldDecorator("post", {
                      rules: [
                        {
                          required: true,
                          message: "Пожалуйста укажите отчество"
                        },
                        {
                          pattern: /(^[А-Я]{1}[а-я]{1,20}$)/,
                          message: "Введены некорректные данные"
                        }
                      ],
                      validateTrigger: "onBlur",
                      initialValue: this.state.form.post
                    })(<Input />)}
                    </Form.Item>
                    </Col>
                    </Row>
                    <Row type="flex" gutter={20}>
                    <Col span={8} push={2}>
                    <Form.Item label="Факультет">
                    {getFieldDecorator("department", {
                      rules: [
                        {
                          required: true,
                          message: "Выберите факультет",
                          whitespace: true
                        }
                      ],
                      initialValue: this.state.form.department,
                      validateTrigger: "onChange"
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
                          message: "Пожалуйста укажите отчество"
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
                      <Radio.Button value={"woman"}>Женский</Radio.Button>
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
                          message: "Пожалуйста укажите отчество"
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
                {getFieldDecorator("series", {
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
                          initialValue: this.state.form.series
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Идентификационный номер">
                {getFieldDecorator("identification", {
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
                          initialValue: this.state.form.identification
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type="flex" gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Кем выдан">
                {getFieldDecorator("issued", {
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
                          initialValue: this.state.form.issued
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Когда выдан">
                      {getFieldDecorator("dateOfIssue", {
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
                      initialValue: this.state.form.dateOfIssue
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
                {getFieldDecorator("homeCity", {
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
                          initialValue: this.state.form.homeCity
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Город">
                {getFieldDecorator("city", {
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
                          initialValue: this.state.form.city
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type='flex' gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Улица">
                {getFieldDecorator("homeStreet", {
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
                          initialValue: this.state.form.homeStreet
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Улица">
                {getFieldDecorator("street", {
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
                          initialValue: this.state.form.street
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type='flex' gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Дом">
                {getFieldDecorator("homeNumber", {
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
                          initialValue: this.state.form.homeNumber
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Дом">
                {getFieldDecorator("number", {
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
                          initialValue: this.state.form.number
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type='flex' gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Квартира">
                {getFieldDecorator("homeRoomNumber", {
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
                          initialValue: this.state.form.homeRoomNumber
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Квартира">
                {getFieldDecorator("roomNumber", {
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
                          initialValue: this.state.form.roomNumber
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
                {getFieldDecorator("rStatus", {
                          rules: [
                            {
                              required: true,
                              message: "Пожалуйста укажите статус"
                            },
                            {
                              pattern: /(^[А-я]{1,20}$)/,
                              message: "Введены некорректные данные"
                            }
                          ],
                          validateTrigger: "onBlur",
                          initialValue: this.state.form.rStatus
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type='flex' gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Фамилия">
                {getFieldDecorator("rSurname", {
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
                          initialValue: this.state.form.rSurname
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Имя">
                {getFieldDecorator("rName", {
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
                          initialValue: this.state.form.rName
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type='flex' gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Отчество">
                {getFieldDecorator("rPatronymic", {
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
                          initialValue: this.state.form.rPatronymic
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type='flex' gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Место работы/Должность">
                {getFieldDecorator("rPost", {
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
                          initialValue: this.state.form.rPost
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Телефон">
                {getFieldDecorator("rPhone", {
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
                          initialValue: this.state.form.rPhone
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
                {getFieldDecorator("diseases", {
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
                          initialValue: this.state.form.diseases
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
                <Row type='flex' gutter={20}>
                <Col span={8} push={2}>
                <Form.Item label="Группа здоровья">
                {getFieldDecorator("health", {
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
                          initialValue: this.state.form.health
                        })(<Input />)}
                </Form.Item>
                </Col>
                <Col span={8} push={4}>
                <Form.Item label="Группа по физкультуре">
                {getFieldDecorator("sport", {
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
                          initialValue: this.state.form.sport
                        })(<Input />)}
                </Form.Item>
                </Col>
                </Row>
          </Panel>
          <Panel key="6">
          <Row type='flex' style={{paddingTop:30}}>
          <Col span={12} push={2}>
          <Select mode="tags" className={style.tags} dropdownClassName={style.select}></Select>
          </Col>
          <Col span={8} push={4}>
          Здесь будет круговая диаграмма
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
                              message: "Пожалуйста укажите город"
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
                              message: "Пожалуйста укажите город"
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
                {getFieldDecorator("studNumber", {
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
                          initialValue: this.state.form.studNumber
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
                              message: "Пожалуйста укажите город"
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
  isOpen: state.modal.isOpen
});

const mapDispatchToProps = {
  closeModal,
}

export default WrappedStudentForm;
//export default connect(mapStateToProps, mapDispatchToProps)(WrappedStudentForm);