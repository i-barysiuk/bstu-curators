import React from "react";
import { connect } from "react-redux";
import { Pie } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFemale, faMale } from "@fortawesome/free-solid-svg-icons";
import locale from "antd/es/date-picker/locale/ru_RU";
import {
  Form,
  Modal,
  Row,
  Col,
  Input,
  Select,
  InputNumber,
  Slider,
  Collapse,
  Steps,
  DatePicker,
  Alert
} from "antd";
import { getGroupData } from "../../helper/group";
import GroupsService from "../../services/GroupsService";
import {closeModal} from "../../redux/actions/modal"
import style from "./style.module.scss"

const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

function is_valid(diff){
  if (!diff) return 'validating';
  if (diff<0) return 'error';
  else return 'warning';
}

class GroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      form: {}
    };
  }

  changeStep = current => {
    this.setState({ current });
  };

  save = () => {
      this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (err) {
        return;
      }
      let group = getGroupData(values);
      group.curatorId = this.props.profileId;
      try {
        await GroupsService.addGroup(group);
      } catch (e) {
        console.log(e);
      }
      this.setState({current: 0 });
      this.props.closeModal();
    });
  };

  normalize = value => {
    return value && value.replace(/ /g, "").trim();
  };

  normalizeNumber = value => {
    if(!value || value < 0) return 0;
    else return value;
  }

  normalizeCourse = value => {
    if(!value || value < 1) return 1;
    else return value;
  }

  validTotal = (rule, value, callback) => {
    if (!value) callback("Пожалуйста укажите значение");
    else callback();
  };

  validFamily = (rule, value, callback) => {
    const {getFieldValue} = this.props.form;
    let diff = 
    getFieldValue('total') -
    (
      getFieldValue('full') +
      getFieldValue('notfull') +
      getFieldValue('manychild') +
      getFieldValue('orphan')
    );
      if (!diff) callback();
      else callback(' ');
  }

  validGeography = (rule, value, callback) => {
    const {getFieldValue} = this.props.form;
    let diff = 
    getFieldValue('total') -
    (
      getFieldValue('local') +
      getFieldValue('nonresident') +
      getFieldValue('foreign')
    );
    if (!diff) callback();
    else callback(' ');
  }

  validLocation = (rule, value, callback) => {
    const {getFieldValue} = this.props.form;
    let diff =
    getFieldValue('total') -
        (
          getFieldValue('parents') +
          getFieldValue('relatives') +
          getFieldValue('independent') +
          getFieldValue('hostel')
        );

        if (!diff) callback();
        else callback(' ');
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      isOpen,
      closeModal
    } = this.props;

    const current = this.state.current;

    var study = [];

    for (let i = 1; i <= getFieldValue("totalCourse") && i <= 6; i++) {
      study.push(i);
    }

    var steps = [];

    for (let i = 0; i < 7; i++){
      steps.push(i);
    }

    const stepName = [
      'Основное',
      'Состав',
      'Социальное',
      'География',
      'Проживание',
      'Учеба',
      'Прочее'
    ]
    
    //from validate
    
    var familyDiff = 
    getFieldValue('total') -
    (
      getFieldValue('full') +
      getFieldValue('notfull') +
      getFieldValue('manychild') +
      getFieldValue('orphan')
    );

    var geoDiff = 
    getFieldValue('total') -
    (
      getFieldValue('local') +
      getFieldValue('nonresident') +
      getFieldValue('foreign')
    );

    var locDiff =
    getFieldValue('total') -
        (
          getFieldValue('parents') +
          getFieldValue('relatives') +
          getFieldValue('independent') +
          getFieldValue('hostel')
        );

    return (
      <Modal
        width={"70%"}
        title="Добавление группы"
        centered
        className={style.modal}
        destroyOnClose={true}
        maskClosable={false}
        onCancel={() => closeModal()|this.setState({current: 0})}
        visible={isOpen}
        okText={"Сохранить"}
        cancelText={"Отмена"}
        onOk={() => this.save() ? closeModal() : null}
        zIndex={1030}
      >
        <Steps current={current} onChange={this.changeStep} style={{paddingBottom:20}} labelPlacement='vertical'>
        {steps.map(item => {
                  return (
                    <Step status={item === current ? 'process' : 'wait'} title={stepName[item]}/>
                  );
                })}
          </Steps>
        <Form>
        <Collapse 
        className={style.collapsePanel}
        bordered={false}
        activeKey = {`${current+1}`}
        >
            <Panel key="1">
              <Row type="flex" gutter={20}>
                <Col span={8}>
                  <Form.Item label="Название группы (краткое)">
                    {getFieldDecorator("name", {
                      rules: [
                        {
                          required: true,
                          message: "Пожалуйста укажите название группы"
                        },
                        {
                          pattern: /(^[А-Я]{1,6}-[0-9]{1,3}$)/,
                          message: "Неверный формат! Пример: АС-59"
                        }
                      ],
                      normalize: this.normalize,
                      validateTrigger: "onBlur",
                      initialValue: this.state.form.name
                    })(<Input placeholder="Группа" />)}
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item label="Название группы (полное)">
                    {getFieldDecorator("fullName", {
                      rules: [
                        {
                          required: true,
                          message: "Пожалуйста укажите название группы"
                        },
                        {
                          pattern: /((^[А-Я]{1,1}[\sA-я]{1,50}-[0-9]{1,3}$))/,
                          message:
                            "Неверный формат! Пример: Автоматизированные системы обработки информации-59"
                        }
                      ],
                      validateTrigger: "onBlur",
                      initialValue: this.state.form.fullName
                    })(<Input placeholder="Группа" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" gutter={20}>
                <Col span={12}>
                  <Form.Item label="Куратор">
                    {getFieldDecorator("curatorId", {
                      rules: [
                        {
                          required: true,
                          message: "Поле фамилия должно быть заполнено!",
                          whitespace: true
                        }
                      ],
                      initialValue: "myID",
                      validateTrigger: "onChange"
                    })(<Input placeholder="Введите свою фамилию" disabled />)}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Раздел">
                    {getFieldDecorator("group", {
                      rules: [
                        {
                          required: true,
                          message: "Поле раздел должно быть заполнено!",
                          whitespace: true
                        }
                      ],
                      initialValue: this.state.form.group,
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
                <Col span={6}>
                  <Form.Item label="Курс">
                    {getFieldDecorator("course", {
                      rules: [
                        {
                          required: true,
                          message: "Выберите курс",
                        }
                      ],
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
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      <Option value="3">3</Option>
                      <Option value="4">4</Option>
                      <Option value="5">5</Option>
                      <Option value="6">6</Option>
                   </Select>
                   )}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" gutter={20}>
                <Col span={12}>
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
                        <Option value="Факультет электронно-информационных систем">ФЭИС</Option>
                        <Option value="Факультет инженерных систем и экологии">ФИСЭ</Option>
                        <Option value="Строительный факультет">СФ</Option>
                        <Option value="Экономический факультет">ЭФ</Option>
                        <Option value="Машиностроительный факультет">МСФ</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Кафедра">
                    {getFieldDecorator("cathedra", {
                      rules: [
                        {
                          required: true,
                          message: "Пожалуйста выберите кафедру"
                        }
                      ],
                      validateTrigger: "onBlur",
                      initialValue: this.state.form.cathedra
                    })(
                      <Select
                        dropdownClassName={style.select}
                        showSearch
                        placeholder="Начните вводить..."
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="Кафедра автоматизации технологических процессов и производств">Кафедра автоматизации технологических процессов и производств</Option>
                        <Option value="Кафедра архитектуры">Кафедра архитектуры</Option>
                        <Option value="Кафедра бухгалтерского учета, анализа и аудита">Кафедра бухгалтерского учета, анализа и аудита</Option>
                        <Option value="Кафедра водоснабжения, водоотведения и охраны водных ресурсов">Кафедра водоснабжения, водоотведения и охраны водных ресурсов</Option>
                        <Option value="Кафедра высшей математики">Кафедра высшей математики</Option>
                        <Option value="Кафедра гуманитарных наук">Кафедра гуманитарных наук</Option>
                        <Option value="Кафедра геотехники и транспортных коммуникаций">Кафедра геотехники и транспортных коммуникаций</Option>
                        <Option value="Кафедра инженерной экологии и химии">Кафедра инженерной экологии и химии</Option>
                        <Option value="Кафедра иностранных языков">Кафедра иностранных языков</Option>
                        <Option value="Кафедра интеллектуальных информационных технологий">Кафедра интеллектуальных информационных технологий</Option>
                        <Option value="Кафедра информатики и прикладной математики">Кафедра информатики и прикладной математики</Option>
                        <Option value="Кафедра машиноведения">Кафедра машиноведения</Option>
                        <Option value="Кафедра машиностроения и эксплуатации автомобилей">Кафедра машиностроения и эксплуатации автомобилей</Option>
                        <Option value="Кафедра менеджмента">Кафедра менеджмента</Option>
                        <Option value="Кафедра мировой экономики, маркетинга, инвестиций">Кафедра мировой экономики, маркетинга, инвестиций</Option>
                        <Option value="Кафедра начертательной геометрии и инженерной графики">Кафедра начертательной геометрии и инженерной графики</Option>
                        <Option value="Кафедра прикладной механики">Кафедра прикладной механики</Option>
                        <Option value="Кафедра природообустройства">Кафедра природообустройства</Option>
                        <Option value="Кафедра строительных конструкций">Кафедра строительных конструкций</Option>
                        <Option value="Кафедра теплогазоснабжения и вентиляции">Кафедра теплогазоснабжения и вентиляции</Option>
                        <Option value="Кафедра технологии бетона и строительных материалов">Кафедра технологии бетона и строительных материалов</Option>
                        <Option value="Кафедра технологии строительного производства">Кафедра технологии строительного производства</Option>
                        <Option value="Кафедра управления, экономики и финансов">Кафедра управления, экономики и финансов</Option>
                        <Option value="Кафедра физики">Кафедра физики</Option>
                        <Option value="Кафедра физического воспитания и спорта">Кафедра физического воспитания и спорта</Option>
                        <Option value="Кафедра философии и культурологии">Кафедра философии и культурологии</Option>
                        <Option value="Кафедра ЭВМ и систем">Кафедра ЭВМ и систем</Option>
                        <Option value="Кафедра экономики и организации строительства">Кафедра экономики и организации строительства</Option>
                        <Option value="Кафедра экономической теории и логистики">Кафедра экономической теории и логистики</Option>
                      </Select>
                      )}
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
            <Panel key="2">
              <Row type="flex">
                <Col span={14}>
                  <Form.Item label="Количество человек">
                    <Row gutter={16}>
                      <Col span={20}>
                        {getFieldDecorator("total", {
                          rules: [
                            {
                              required: true
                            },
                            {validator:this.validTotal}
                          ],
                          initialValue: this.state.form.total || 0
                        })(<Slider min={0} max={40} />)}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("total", {
                          rules: [
                            {
                              required: true
                            },
                            {validator:this.validTotal}
                          ],
                          normalize: this.normalizeNumber,
                          initialValue: this.state.form.total || 0
                        })(<InputNumber min={0} max={40} />)}
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item label="Гендерный состав">
                    <Row gutter={20}>
                      <Col span={1}>
                        <FontAwesomeIcon
                          icon={faFemale}
                          style={{ color: "pink" }}
                        />
                      </Col>
                      <Col span={20}>
                        {getFieldDecorator("women", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.women || 0
                        })(<Slider min={0} max={getFieldValue("total")} />)}
                      </Col>
                      <Col span={1}>
                        <FontAwesomeIcon
                          icon={faMale}
                          style={{ color: "blue" }}
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item label="Общественные организации">
                    <Row>
                      <Col span={6}>
                        <div className={style.organisations}>
                        <span>БРСМ</span>
                        </div>
                        {getFieldDecorator("brsm", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          normalize: this.normalizeNumber,
                          initialValue: this.state.form.total || 0
                        })(<InputNumber min={0} max={getFieldValue("total")} />)}
                      </Col>
                      <Col span={6}>
                        <div className={style.organisations}>
                        <span>Профком</span>
                        </div>
                        {getFieldDecorator("profkom", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          normalize: this.normalizeNumber,
                          initialValue: this.state.form.total || 0
                        })(<InputNumber min={0} max={getFieldValue("total")} />)}
                      </Col>
                      <Col span={6}>
                        <div className={style.organisations}>
                        <span>Студсовет</span>
                        </div>
                        {getFieldDecorator("studsovet", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          normalize: this.normalizeNumber,
                          initialValue: this.state.form.total || 0
                        })(<InputNumber min={0} max={getFieldValue("total")} />)}
                      </Col>
                      <Col span={6}>
                        <div className={style.organisations}>
                        <span>Другие</span>
                        </div>
                        {getFieldDecorator("others", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          normalize: this.normalizeNumber,
                          initialValue: this.state.form.total || 0
                        })(<InputNumber min={0} max={getFieldValue("total")} />)}
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Pie
                    data={{
                      labels: ["Юноши", "Девушки"],

                      datasets: [
                        {
                          data: [
                            getFieldValue("total") - getFieldValue("women"),
                            getFieldValue("women")
                          ],
                          backgroundColor: ["#00BFFF", "pink"]
                        }
                      ]
                    }}
                    options={{
                      title: {
                        display: true,
                        text: "Гендерный состав",
                        fontSize: 14
                      },
                      legend: {
                        display: false
                      }
                    }}
                  />
                  <Pie
                    data={{
                      labels: ["БРСМ", "Профком", "Студсовет", "Прочая"],

                      datasets: [
                        {
                          label: "Поинты",
                          data: [
                            getFieldValue("brsm"),
                            getFieldValue("profkom"),
                            getFieldValue("studsovet"),
                            getFieldValue("others")
                          ],
                          backgroundColor: ["red", "blue", "yellow", "green"]
                        }
                      ]
                    }}
                    options={{
                      title: {
                        display: true,
                        text: "Общественные организации",
                        fontSize: 14
                      },
                      legend: {
                        display: false
                      }
                    }}
                  />
                </Col>
              </Row>
            </Panel>
            <Panel key="3">
              <Row type="flex" gutter={20}>
                <Col span={14}>
                <span>Состав семьи</span>
                <Form.Item 
                label="Полная"
                validateStatus={is_valid(familyDiff)}
                >
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("full", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.full || 0
                        })(<Slider min={0} max={getFieldValue("total")} />)}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("full", {
                          rules: [
                            {
                              required: true
                            },
                            {validator: this.validFamily}
                          ],
                          normalize: this.normalizeNumber,
                          initialValue: this.state.form.full || 0
                        })(
                          <InputNumber min={0} max={getFieldValue("total")}/>
                        )}
                      </Col>
                    </Row>
                    </Form.Item>

                    <Form.Item 
                    label="Неполная"
                    validateStatus={is_valid(familyDiff)}
                    >
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("notfull", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.notfull || 0
                        })(
                          <Slider
                            min={0}
                            max={getFieldValue("total")}
                          />
                        )}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("notfull", {
                          rules: [
                            {
                              required: true
                            },
                            {validator: this.validFamily}
                          ],
                          normalize: this.normalizeNumber,
                          initialValue: this.state.form.notfull || 0
                        })(
                          <InputNumber
                            min={0}
                            max={getFieldValue("total")}
                          />
                        )}
                      </Col>
                    </Row>
                    </Form.Item>

                    <Form.Item 
                    label="Многодетная"
                    validateStatus={is_valid(familyDiff)}
                    >
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("manychild", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.manychild || 0
                        })(
                          <Slider
                            min={0}
                            max={getFieldValue("total")}
                          />
                        )}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("manychild", {
                          rules: [
                            {
                              required: true
                            },
                            {validator: this.validFamily}
                          ],
                          normalize: this.normalizeNumber,
                          initialValue: this.state.form.manychild || 0
                        })(
                          <InputNumber
                            min={0}
                            max={getFieldValue("total")}
                          />
                        )}
                      </Col>
                    </Row>
                    </Form.Item>

                    <Form.Item 
                    label="Сироты"
                    validateStatus={is_valid(familyDiff)}
                    >
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("orphan", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.orphan || 0
                        })(
                          <Slider
                            min={0}
                            max={getFieldValue("total")}
                          />
                        )}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("orphan", {
                          rules: [
                            {
                              required: true
                            },
                            {validator: this.validFamily}
                          ],
                          normalize: this.normalizeNumber,
                          initialValue: this.state.form.orphan || 0
                        })(
                          <InputNumber
                            min={0}
                            max={getFieldValue("total")}
                          />
                        )}
                      </Col>
                    </Row>
                  </Form.Item> 
                  <Collapse 
                  className={style.collapsePanel}
                  bordered={false}
                  activeKey = {is_valid(familyDiff)}
                  >
                  <Panel key="warning">
                   <Alert 
                      style={{borderRadius:15}} 
                      message="(распределите всех)" 
                      type="warning" showIcon />
                  </Panel>
                  <Panel key="error">
                   <Alert 
                      style={{borderRadius:15}} 
                      message="Ой, перебор..." 
                      type="info" showIcon />
                  </Panel>
                  </Collapse>
                  
                  <Collapse bordered={false}>
                    <Panel header="Социальный статус">
                      <Form.Item label="Льготники:">
                        <Row>
                          <Col span={19}>Дети сироты (до 18 лет)</Col>
                          <Col span={4}>
                            {getFieldDecorator("socOrphan18", {
                              rules: [
                                {
                                  required: true
                                }
                              ],
                              normalize: this.normalizeNumber,
                              initialValue: this.state.form.socOrphan18 || 0
                            })(
                              <InputNumber
                                min={0}
                                max={getFieldValue("total")}
                              />
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col span={19}>Дети без родителей (до 18 лет)</Col>
                          <Col span={4}>
                            {getFieldDecorator("socWithoutParents18", {
                              rules: [
                                {
                                  required: true
                                }
                              ],
                              normalize: this.normalizeNumber,
                              initialValue: this.state.form.socWithoutParents18 || 0
                            })(
                              <InputNumber
                                min={0}
                                max={getFieldValue("total")}
                              />
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col span={19}>Сироты и без родителей (18-23)</Col>
                          <Col span={4}>
                            {getFieldDecorator("socOrphans", {
                              rules: [
                                {
                                  required: true
                                }
                              ],
                              normalize: this.normalizeNumber,
                              initialValue: this.state.form.socOrphans || 0
                            })(
                              <InputNumber
                                min={0}
                                max={getFieldValue("total")}
                              />
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col span={19}>Особенности развития</Col>
                          <Col span={4}>
                            {getFieldDecorator("socFeature", {
                              rules: [
                                {
                                  required: true
                                }
                              ],
                              normalize: this.normalizeNumber,
                              initialValue: this.state.form.socFeature || 0
                            })(
                              <InputNumber
                                min={0}
                                max={getFieldValue("total")}
                              />
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col span={19}>Родители инвалиды</Col>
                          <Col span={4}>
                            {getFieldDecorator("socParentsInvalid", {
                              rules: [
                                {
                                  required: true
                                }
                              ],
                              normalize: this.normalizeNumber,
                              initialValue:this.state.form.socParentsInvalid || 0
                            })(
                              <InputNumber
                                min={0}
                                max={getFieldValue("total")}
                              />
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col span={19}>Регионы ЧАЭС</Col>
                          <Col span={4}>
                            {getFieldDecorator("socCHAES", {
                              rules: [
                                {
                                  required: true
                                }
                              ],
                              normalize: this.normalizeNumber,
                              initialValue: this.state.form.socCHAES || 0
                            })(
                              <InputNumber
                                min={0}
                                max={getFieldValue("total")}
                              />
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col span={19}>Семьи из зоны загрязнения</Col>
                          <Col span={4}>
                            {getFieldDecorator("socCHAESRegion", {
                              rules: [
                                {
                                  required: true
                                }
                              ],
                              normalize: this.normalizeNumber,
                              initialValue: this.state.form.socCHAESRegion || 0
                            })(
                              <InputNumber
                                min={0}
                                max={getFieldValue("total")}
                              />
                            )}
                          </Col>
                        </Row>
                      </Form.Item>
                    </Panel>
                  </Collapse>
                </Col>
                <Col span={10}>
                  <Pie
                    data={{
                      labels: ["Полная", "Неполная", "Многодетная", "Сироты"],

                      datasets: [
                        {
                          label: "Поинты",
                          data: [
                            getFieldValue("full"),
                            getFieldValue("notfull"),
                            getFieldValue("manychild"),
                            getFieldValue("orphan")
                          ],
                          backgroundColor: ["red", "blue", "yellow", "green"]
                        }
                      ]
                    }}
                    options={{
                      title: {
                        display: true,
                        text: "Состав семьи",
                        fontSize: 14
                      },
                      legend: {
                        display: false
                      }
                    }}
                  />
                </Col>
              </Row>
            </Panel>
            <Panel key="4">
              <Row type="flex" gutter={20}>
                <Col span={14}>
                <span>География</span>
                <Form.Item 
                    label="Местные"
                    validateStatus={is_valid(geoDiff)}
                    >
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("local", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.local || 0
                        })(<Slider min={0} max={getFieldValue("total")} />)}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("local", {
                          rules: [
                            {
                              required: true
                            },
                            {validator:this.validGeography}
                          ],
                          normalize: this.normalizeNumber,
                          initialValue: this.state.form.local || 0
                        })(
                          <InputNumber min={0} max={getFieldValue("total")} />
                        )}
                      </Col>
                    </Row>
                    </Form.Item>

                    <Form.Item 
                    label="Иногородние"
                    validateStatus={is_valid(geoDiff)}
                    >
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("nonresident", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.nonresident || 0
                        })(
                          <Slider
                            min={0}
                            max={getFieldValue("total")}
                          />
                        )}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("nonresident", {
                          rules: [
                            {
                              required: true
                            },
                            {validator:this.validGeography}
                          ],
                          normalize: this.normalizeNumber,
                          initialValue: this.state.form.nonresident || 0
                        })(
                          <InputNumber
                            min={0}
                            max={getFieldValue("total")}
                          />
                        )}
                      </Col>
                    </Row>
                    </Form.Item>

                    <Form.Item 
                    label="Иностранцы"
                    validateStatus={is_valid(geoDiff)}
                    >
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("foreign", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.foreign || 0
                        })(
                          <Slider
                            min={0}
                            max={getFieldValue("total")}
                          />
                        )}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("foreign", {
                          rules: [
                            {
                              required: true
                            },
                            {validator:this.validGeography}
                          ],
                          normalize: this.normalizeNumber,
                          initialValue: this.state.form.foreign || 0
                        })(
                          <InputNumber
                            min={0}
                            max={getFieldValue("total")}
                          />
                        )}
                      </Col>
                    </Row>
                  </Form.Item>
                  <Collapse 
                  className={style.collapsePanel}
                  bordered={false}
                  activeKey = {is_valid(geoDiff)}
                  >
                  <Panel key="warning">
                   <Alert 
                      style={{borderRadius:15}} 
                      message="(распределите всех)" 
                      type="warning" showIcon />
                  </Panel>
                  <Panel key="error">
                   <Alert 
                      style={{borderRadius:15}} 
                      message="Ой, перебор..." 
                      type="info" showIcon />
                  </Panel>
                  </Collapse>
                </Col>

                <Col span={10}>
                  <Pie
                    data={{
                      labels: ["Местные", "Иногородние", "Иностранные"],

                      datasets: [
                        {
                          label: "Поинты",
                          data: [
                            getFieldValue("local"),
                            getFieldValue("nonresident"),
                            getFieldValue("foreign")
                          ],
                          backgroundColor: ["red", "blue", "yellow"]
                        }
                      ]
                    }}
                    options={{
                      title: {
                        display: true,
                        text: "География",
                        fontSize: 14
                      },
                      legend: {
                        display: false
                      }
                    }}
                  />
                </Col>
              </Row>
            </Panel>
            <Panel key="5">
              <Row type="flex" gutter={20}>
                <Col span={14}>
                  <span>Проживание</span>
                  <Form.Item 
                    label="С родителями"
                    validateStatus={is_valid(locDiff)}
                    >
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("parents", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.parents || 0
                        })(<Slider min={0} max={getFieldValue("total")} />)}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("parents", {
                          rules: [
                            {
                              required: true
                            },
                            {validator:this.validLocation}
                          ],
                          normalize: this.normalizeNumber,
                          initialValue: this.state.form.parents || 0
                        })(
                          <InputNumber min={0} max={getFieldValue("total")} />
                        )}
                      </Col>
                    </Row>
                    </Form.Item>

                    <Form.Item 
                    label="С родственниками"
                    validateStatus={is_valid(locDiff)}
                    >
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("relatives", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.relatives || 0
                        })(
                          <Slider
                            min={0}
                            max={getFieldValue("total")}
                          />
                        )}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("relatives", {
                          rules: [
                            {
                              required: true
                            },
                            {validator:this.validLocation}
                          ],
                          normalize: this.normalizeNumber,
                          initialValue: this.state.form.relatives || 0
                        })(
                          <InputNumber
                            min={0}
                            max={
                              getFieldValue("total")
                            }
                          />
                        )}
                      </Col>
                    </Row>
                    </Form.Item>

                    <Form.Item 
                    label="Самостоятельно"
                    validateStatus={is_valid(locDiff)}
                    >
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("independent", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.independent || 0
                        })(
                          <Slider
                            min={0}
                            max={getFieldValue("total")}
                          />
                        )}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("independent", {
                          rules: [
                            {
                              required: true
                            },
                            {validator:this.validLocation}
                          ],
                          normalize: this.normalizeNumber,
                          initialValue: this.state.form.independent || 0
                        })(
                          <InputNumber
                            min={0}
                            max={getFieldValue("total")}
                          />
                        )}
                      </Col>
                    </Row>
                    </Form.Item>

                    <Form.Item 
                    label="В общежитии"
                    validateStatus={is_valid(locDiff)}
                    >
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("hostel", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.hostel || 0
                        })(
                          <Slider
                            min={0}
                            max={getFieldValue("total")}
                          />
                        )}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("hostel", {
                          rules: [
                            {
                              required: true
                            },
                            {validator:this.validLocation}
                          ],
                          normalize: this.normalizeNumber,
                          initialValue: this.state.form.hostel || 0
                        })(
                          <InputNumber
                            min={0}
                            max={getFieldValue("total")}
                          />
                        )}
                      </Col>
                    </Row>
                  </Form.Item>

                  <Collapse 
                  className={style.collapsePanel}
                  bordered={false}
                  activeKey = {is_valid(locDiff)}
                  >
                  <Panel key="warning">
                   <Alert 
                      style={{borderRadius:15}} 
                      message="(распределите всех)" 
                      type="warning" showIcon />
                  </Panel>
                  <Panel key="error">
                   <Alert 
                      style={{borderRadius:15}} 
                      message="Ой, перебор..." 
                      type="info" showIcon />
                  </Panel>
                  </Collapse>

                </Col>

                <Col span={10}>
                  <Pie
                    data={{
                      labels: [
                        "С родителями",
                        "С родственниками",
                        "Самостоятельно",
                        "Общежитие"
                      ],

                      datasets: [
                        {
                          label: "Поинты",
                          data: [
                            getFieldValue("parents"),
                            getFieldValue("relatives"),
                            getFieldValue("independent"),
                            getFieldValue("hostel")
                          ],
                          backgroundColor: ["red", "blue", "yellow", "green"]
                        }
                      ]
                    }}
                    options={{
                      title: {
                        display: true,
                        text: "Проживание",
                        fontSize: 14
                      },
                      legend: {
                        display: false
                      }
                    }}
                  />
                </Col>
              </Row>
            </Panel>
            <Panel key="6">
              <Row gutter={20}>
                <Col span={10}>
                  <Form.Item label="Продолжительность обучения:">
                    {getFieldDecorator("totalCourse", {
                      rules: [
                        {
                          required: true
                        }
                      ],
                      normalize: this.normalizeCourse,
                      initialValue: this.state.form.total || 1
                    })(<InputNumber min={1} max={6} />)}
                  </Form.Item>
                </Col>
                <Col span={14}>
                  <Form.Item label="Период обучения:">
                    {getFieldDecorator("studyPeriod", {
                      rules: [
                        {
                          required: true
                        }
                      ],
                      initialValue: this.state.form.studyPeriod || 0
                    })(<RangePicker locale={locale} dropdownClassName={style.rangePicker} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Collapse className={style.collapse}>
                {study.map(item => {
                  return (
                    <Panel header={item + " курс"} key={item}>
                      <Row>
                        <Col span={12}>
                          <Form.Item label="Срок курса:">
                            {getFieldDecorator("coursePeriod" + item, {
                              rules: [
                                {
                                  required: true
                                }
                              ],
                              initialValue: this.state.form.studyPeriod || 0
                            })(<RangePicker locale={locale} dropdownClassName={style.rangePicker} />)}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Зимние каникулы:">
                            {getFieldDecorator("winterHoliday" + item, {
                              rules: [
                                {
                                  required: true
                                }
                              ],
                              initialValue: this.state.form.studyPeriod || 0
                            })(<RangePicker locale={locale} dropdownClassName={style.rangePicker} />)}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item label="Зимняя сессия">
                            {getFieldDecorator("winterSession" + item, {
                              rules: [
                                {
                                  required: true
                                }
                              ],
                              initialValue: this.state.form.studyPeriod || 0
                            })(<RangePicker locale={locale} dropdownClassName={style.rangePicker} />)}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Летняя сессия">
                            {getFieldDecorator("summerSession" + item, {
                              rules: [
                                {
                                  required: true
                                }
                              ],
                              initialValue: this.state.form.studyPeriod || 0
                            })(<RangePicker locale={locale} dropdownClassName={style.rangePicker} />)}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item label="Аттестация 1">
                            {getFieldDecorator("attestation1" + item, {
                              rules: [
                                {
                                  required: true
                                }
                              ],
                              initialValue: this.state.form.studyPeriod || 0
                            })(<RangePicker locale={locale} dropdownClassName={style.rangePicker} />)}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Аттестация 2">
                            {getFieldDecorator("attestation2" + item, {
                              rules: [
                                {
                                  required: true
                                }
                              ],
                              initialValue: this.state.form.studyPeriod || 0
                            })(<RangePicker locale={locale} dropdownClassName={style.rangePicker} />)}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item label="Аттестация 3">
                            {getFieldDecorator("attestation3" + item, {
                              rules: [
                                {
                                  required: true
                                }
                              ],
                              initialValue: this.state.form.studyPeriod || 0
                            })(<RangePicker locale={locale} dropdownClassName={style.rangePicker} />)}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Аттестация 4">
                            {getFieldDecorator("attestation4" + item, {
                              rules: [
                                {
                                  required: true
                                }
                              ],
                              initialValue: this.state.form.studyPeriod || 0
                            })(<RangePicker locale={locale} dropdownClassName={style.rangePicker} />)}
                          </Form.Item>
                        </Col>
                      </Row>
                    </Panel>
                  );
                })}
              </Collapse>
            </Panel>
            <Panel key="7">
              <Form.Item label="Прочие сведения">
                <Form.Item>
                  {getFieldDecorator("more", {
                    rules: [
                      {
                        pattern: /(^[^]{0,1000}$)/,
                        message: "Максимум 1000 символов!"
                      }
                    ],
                    initialValue: this.state.form.more
                  })(<TextArea autosize={{minRows: 6, maxRows: 9}}/>)}
                </Form.Item>
              </Form.Item>
            </Panel>
          </Collapse>
          </Form>
      </Modal>
    );
  }
}

const WrappedGroupForm = Form.create({ name: "group" })(GroupForm);

const mapStateToProps = state => ({
  profileId: state.users.profile.id,
  isOpen: state.modal.isOpen
});

const mapDispatchToProps = {
  closeModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedGroupForm);
