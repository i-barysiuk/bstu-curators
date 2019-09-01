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
  Table,
  Alert
} from "antd";
import {closeStudentModal} from "../../redux/actions/modal"
import moment from "moment";
import style from "./style.module.scss"

const { Option } = Select;
const { Panel } = Collapse;
const { Step } = Steps;

///////////////EDITABLE TABLE/////////////////////////////

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: true,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record } = this.props;
    const { editing } = this.state;
    const pattern = (dataIndex) => {
      switch (dataIndex) {
        case "status": return /(^[А-я]{3,12}$)/;
        case "full_name": return /(^[А-я ---]{3,40}$)/;
        case "position": return /(^[А-я ---]{3,40}$)/;
        case "phone": return /(^[+()0-9---]{6,17}$)/;
        default: return null;
      }
    };
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: "Это поле не может быть пустым",
            },
            {
              required: true,
              pattern: pattern(dataIndex),
              message: "Неверный формат"
            }
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////////

function disabledDate(current) {
  return current && current > moment().endOf("day");
}

class StudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      form: {
        representatives: []
      },
      count: 0,
    };
    this.columns = [
      {
        title: 'Статус',
        dataIndex: 'status',
        editable: true,
      },
      {
        title: 'ФИО',
        dataIndex: 'full_name',
        editable: true,
      },
      {
        title: 'Место работы/Должность',
        dataIndex: 'position',
        editable: true,
      },
      {
        title: 'Телефон',
        dataIndex: 'phone',
        editable: true,
      },
      {
        title: 'Действия',
        dataIndex: 'action',
        width: "10%",
        render: (text, record) =>
          this.state.form.representatives.length >= 1 ? (
            <Button onClick={() => this.handleDelete(record.key)}>
            <Icon type="delete"/>Удалить
            </Button>
          ) : null,
      },
    ];
  }

  clearTable = () => {
    this.setState({ form: { representatives: []}, count: 0 });
  }

  handleDelete = key => {
    const representatives = [...this.state.form.representatives];
    this.setState({ form: {representatives: representatives.filter(item => item.key !== key) } });
  };

  handleAdd = () => {
    const { count } = this.state;
    const { representatives } = this.state.form;
    const newData = { key: count };
    this.setState({
      form: { representatives: [...representatives, newData]},
      count: count + 1,
    });
  };

  handleSave = row => {
    const newData = [...this.state.form.representatives];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ form: { representatives: newData } });
  };

  changeStep = current => {
    this.setState({ current });
  };

  validTable = () => {
    var pattern = [
      /(^[А-я]{3,12}$)/,
      /(^[А-я ---]{3,40}$)/,
      /(^[А-я ---]{3,40}$)/,
      /(^[+()0-9---]{6,15}$)/
    ]
    return (
    this.state.form.representatives.filter(
      item => 
      !(
        pattern[0].test(item.status)
      &&pattern[1].test(item.full_name)
      &&pattern[2].test(item.position)
      &&pattern[3].test(item.phone)
      )
      ).length
      )
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    const { 
      form: { representatives },
      current
     } = this.state;

    const {
      form: { getFieldDecorator, getFieldError },
      isOpen,
      closeStudentModal
    } = this.props;
    
    var steps = [
      'Общие сведения',
      'Паспортные данные',
      'Место жительства',
      'Законные представители',
      'Медицинские данные',
      'Хобби',
      'Контакты'
    ];

    var validStep = [
      {
        valid:
        getFieldError('last_name')
      ||getFieldError('full_name')
      ||getFieldError('f_name')
      ||getFieldError('position')
      ||getFieldError('faculty')
      ||getFieldError('group')
      ||getFieldError('sex')
      ||getFieldError('birthday')
      },
      {
        valid:
        getFieldError('nationality')
      ||getFieldError('passport_series')
      ||getFieldError('passportId')
      ||getFieldError('issuing_authority')
      ||getFieldError('date_issue')
      },
      {
        valid:
        getFieldError('home_adress')
      ||getFieldError('study_adress')
      },
      {
        valid:
        this.validTable()
      },
      {
        valid:
        getFieldError('hronic_disease')
      ||getFieldError('health_group')
      ||getFieldError('pe_group')
      },
      {
        valid:
        null
      },
      {
        valid:
        getFieldError('phone')
      ||getFieldError('email')
      ||getFieldError('studentId')
      },
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
        onCancel={() => closeStudentModal()|this.setState({current: 0})|this.clearTable()}
        //onOk={() => this.save() ? closeModal() : null}
        visible={isOpen}
        zIndex={1030}
      >
      <Form>
      <Steps current={current} onChange={this.changeStep} style={{paddingBottom:20}} labelPlacement='vertical'>
        {steps.map((item, index) => {
                  return (
                    <Step 
                    key={index}
                    status={index === current ? 'process' : validStep[index].valid ? 'error' : 'wait'} 
                    title={item}
                    />
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
                          type: "array",
                          required: true,
                          message: "Пожалуйста укажите дату рождения"
                        },
                      ],
                      initialValue: this.state.form.birthday
                    })(<DatePicker 
                    disabledDate={disabledDate}
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
          <Row type='flex' gutter={20}>
          <Col span={6} push={2}>
          <label>Домашний адрес:</label>
          </Col>
          <Col span={12}>
          <Form.Item>
                {getFieldDecorator("home_adress", {
                          rules: [
                            {
                              required: true,
                              message: "Пожалуйста укажите адрес"
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
            </Row>
            <Row type='flex' gutter={20}>
            <Col span={6} push={2}>
          <label>Адрес в период обучения:</label>
          </Col>
            <Col span={12}>
            <Form.Item>
                {getFieldDecorator("study_adress", {
                          rules: [
                            {
                              required: true,
                              message: "Пожалуйста укажите адрес"
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
          </Panel>
          <Panel key="4">
          <Button onClick={this.handleAdd} type="primary" style={{ margin: 16 }}>
          <Icon type="plus" />Добавить
          </Button>
          <Collapse 
          className={style.collapsePanel}
          bordered={false}
          activeKey = {
            this.state.form.representatives.length >= 1 
            ? "tableIsVisible"
            : "tableIsNotVisible"
            }
          >
          <Panel key="tableIsVisible">
          <Table
          components={components}
          dataSource={representatives}
          columns={columns}
          />
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
          <Col span={6} push={4}>
          <Alert
            className={style.alert}
            message="Подсказка"
            description="Текст подсказки"
            type="info"
            showIcon
          />
          </Col>
          </Row>
          </Panel>
          <Panel key="7">
          <Row type='flex' gutter={20} style={{paddingTop:30}}>
          <Col span={8} push={2}>
          <Form.Item label="Телефон">
          <Row>
                <Col span={3}>
                <div style={{width:40}}><label>+375</label></div>
                </Col>
                <Col span={21}>
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
                </Col>
                </Row>
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
  isOpen: state.modal.studentIsOpen
});

const mapDispatchToProps = {
  closeStudentModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedStudentForm);