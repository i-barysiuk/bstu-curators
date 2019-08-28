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
import {editGroupEnd} from "../../redux/actions/groups"
import style from "./style.module.scss"
import debounce from "lodash/debounce";

const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

function is_valid(diff){
  if (!diff) return 'validating';
  else return 'warning';
}

class GroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.closingAfterSave=debounce(this.closingAfterSave,10);
    this.state = {
      current: 0,
      validStatus: false,
      form: {}
    };
  }

  changeStep = current => {
    this.setState({ current });
  };

  save = () => {
      this.props.form.validateFieldsAndScroll(async (err, values) => {
        console.log(getGroupData(values))
      if (err) {
        return;
      }
      let group = getGroupData(values);
      group.curatorId = this.props.profileId;
      try {
        if(this.props.group.isEditing){
          await GroupsService.editGroup({data: group, id: this.props.group.id});
        }
        else {
          await GroupsService.addGroup(group);
        }
        this.setState({current: 0 });
        this.props.editGroupEnd()
      } catch (e) {
        console.log(e);
      }
      this.setState({current: 0, validStatus: true });
    });
  };

  closingAfterSave = () => {
    this.setState({validStatus:false});
    this.props.closeModal();
  }

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

  onCancel = () => {
    const {closeModal, editGroupEnd} = this.props
    closeModal()
    editGroupEnd()
    this.setState({current: 0})
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldValue, getFieldError },
      isOpen,
      closeModal,
      group
    } = this.props;

    const current = this.state.current;

    var study = [];

    for (let i = 1; i <= getFieldValue("totalCourse") && i <= 6; i++) {
      study.push(i);
    }

    const steps = [
      'Основное',
      'Состав',
      'Социальное',
      'География',
      'Проживание',
      'Учеба',
      'Прочее'
    ]
    
    //from validate

    if(this.state.validStatus) this.closingAfterSave();

    var validStep = [
      {
        valid:
        getFieldError('cathedra')
      ||getFieldError('course')
      ||getFieldError('department')
      ||getFieldError('fullName')
      ||getFieldError('group')
      ||getFieldError('name')
      },
      {valid:getFieldError('total')},
      {
        valid:
        getFieldError('full')
      &&getFieldError('notfull')
      &&getFieldError('manychild')
      &&getFieldError('orphan')
      },
      {
        valid:
        getFieldError('local')
      &&getFieldError('nonresident')
      &&getFieldError('foreign')
      },
      {
        valid:
        getFieldError('parents')
      &&getFieldError('relatives')
      &&getFieldError('independent')
      &&getFieldError('hostel')
      },
      {valid:null},
      {valid:null},
    ]


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
        onCancel={this.onCancel}
        visible={isOpen}
        okText={"Сохранить"}
        cancelText={"Отмена"}
        onOk={this.save}
        zIndex={1030}
      >
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
                      initialValue: group.name
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
                          pattern: /((^[А-Я]{1,1}[\sA-я]{1,50} - [0-9]{1,3}$))/,
                          message:
                            "Неверный формат! Пример: Автоматизированные системы обработки информации - 59"
                        }
                      ],
                      validateTrigger: "onBlur",
                      initialValue: group.fullName
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
                      initialValue: group.group,
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
                        <Option value="Заочное">Заочное</Option>
                        <Option value="Иностранные">Иностранные</Option>
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
                      initialValue: group.course,
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
                      initialValue: group.department,
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
                      initialValue: group.cathedra
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
                          initialValue: group.totalStudents || 0
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
                          initialValue: group.totalStudents || 0
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
                          initialValue: group.gender.women || 0
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
                          normalize: this.normalizeNumber,
                          initialValue: group.community.brsm || 0
                        })(<InputNumber min={0} max={getFieldValue("total")} />)}
                      </Col>
                      <Col span={6}>
                        <div className={style.organisations}>
                        <span>Профком</span>
                        </div>
                        {getFieldDecorator("profkom", {
                          normalize: this.normalizeNumber,
                          initialValue: group.community.profkom || 0
                        })(<InputNumber min={0} max={getFieldValue("total")} />)}
                      </Col>
                      <Col span={6}>
                        <div className={style.organisations}>
                        <span>Студсовет</span>
                        </div>
                        {getFieldDecorator("studsovet", {
                          normalize: this.normalizeNumber,
                          initialValue: group.community.studsovet || 0
                        })(<InputNumber min={0} max={getFieldValue("total")} />)}
                      </Col>
                      <Col span={6}>
                        <div className={style.organisations}>
                        <span>Другие</span>
                        </div>
                        {getFieldDecorator("others", {
                          normalize: this.normalizeNumber,
                          initialValue: group.community.others || 0
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
                          backgroundColor: ["#00BFFF", "#FF6384"]
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
                          backgroundColor: ["#FF6384", "#FFCD56", "#36A2EB", "#C9CBCF"]
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
                          initialValue: group.family.full || 0
                        })(<Slider min={0}  max={familyDiff+getFieldValue('full')} />)}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("full", {
                          rules: [
                            {
                              required: true
                            },
                            {validator: this.validFamily}
                          ],
                          validateTrigger: "onBlur",
                          normalize: this.normalizeNumber,
                          initialValue: group.family.full || 0
                        })(
                          <InputNumber min={0} max={familyDiff+getFieldValue('full')}/>
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
                          initialValue: group.family.notfull || 0
                        })(
                          <Slider
                            min={0}
                            max={familyDiff+getFieldValue('notfull')}
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
                          validateTrigger: "onBlur",
                          normalize: this.normalizeNumber,
                          initialValue: group.family.notfull || 0
                        })(
                          <InputNumber
                            min={0}
                            max={familyDiff+getFieldValue('notfull')}
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
                          initialValue: group.family.manychild || 0
                        })(
                          <Slider
                            min={0}
                            max={familyDiff+getFieldValue('manychild')}
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
                          validateTrigger: "onBlur",
                          normalize: this.normalizeNumber,
                          initialValue: group.family.manychild || 0
                        })(
                          <InputNumber
                            min={0}
                            max={familyDiff+getFieldValue('manychild')}
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
                          initialValue: group.family.orphan || 0
                        })(
                          <Slider
                            min={0}
                            max={familyDiff+getFieldValue('orphan')}
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
                          validateTrigger: "onBlur",
                          normalize: this.normalizeNumber,
                          initialValue: group.family.orphan || 0
                        })(
                          <InputNumber
                            min={0}
                            max={familyDiff+getFieldValue('orphan')}
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
                      message="распределите всех" 
                      type="warning" showIcon />
                  </Panel>
                  </Collapse>
                  
                  <Collapse bordered={false}>
                    <Panel header="Социальный статус">
                      <Form.Item>
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
                              initialValue: group.social.socOrphan18 || 0
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
                              initialValue: group.social.socWithoutParents18 || 0
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
                              initialValue: group.social.socOrphans || 0
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
                              initialValue: group.social.socFeature || 0
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
                              initialValue:group.social.socParentsInvalid || 0
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
                              initialValue: group.social.socCHAES || 0
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
                              initialValue: group.social.socCHAESRegion || 0
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
                          backgroundColor: ["#4BC0C0", "#FF9F40", "#9966FF", "#FF6384"]
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
                          initialValue: group.geography.local || 0
                        })(<Slider min={0} max={geoDiff+getFieldValue("local")} />)}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("local", {
                          rules: [
                            {
                              required: true
                            },
                            {validator:this.validGeography}
                          ],
                          validateTrigger: "onBlur",
                          normalize: this.normalizeNumber,
                          initialValue: group.geography.local || 0
                        })(
                          <InputNumber min={0} max={geoDiff+getFieldValue("local")} />
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
                          initialValue: group.geography.nonresident || 0
                        })(
                          <Slider
                            min={0}
                            max={geoDiff+getFieldValue("nonresident")}
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
                          validateTrigger: "onBlur",
                          normalize: this.normalizeNumber,
                          initialValue: group.geography.nonresident || 0
                        })(
                          <InputNumber
                            min={0}
                            max={geoDiff+getFieldValue("nonresident")}
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
                          initialValue: group.geography.foreign || 0
                        })(
                          <Slider
                            min={0}
                            max={geoDiff+getFieldValue("foreign")}
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
                          validateTrigger: "onBlur",
                          normalize: this.normalizeNumber,
                          initialValue: group.geography.foreign || 0
                        })(
                          <InputNumber
                            min={0}
                            max={geoDiff+getFieldValue("foreign")}
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
                          backgroundColor: ["#36A2EB", "#FFCD56", "#FF6384"]
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
                          initialValue: group.living.parents || 0
                        })(<Slider min={0} max={getFieldValue("parents")+locDiff} />)}
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
                          initialValue: group.living.parents || 0
                        })(
                          <InputNumber min={0} max={getFieldValue("parents")+locDiff} />
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
                          initialValue: group.living.relatives || 0
                        })(
                          <Slider
                            min={0}
                            max={getFieldValue("relatives")+locDiff}
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
                          validateTrigger: "onBlur",
                          normalize: this.normalizeNumber,
                          initialValue: group.living.relatives || 0
                        })(
                          <InputNumber
                            min={0}
                            max={getFieldValue("relatives")+locDiff}
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
                          initialValue: group.living.independent || 0
                        })(
                          <Slider
                            min={0}
                            max={getFieldValue("independent")+locDiff}
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
                          validateTrigger: "onBlur",
                          normalize: this.normalizeNumber,
                          initialValue: group.living.independent || 0
                        })(
                          <InputNumber
                            min={0}
                            max={getFieldValue("independent")+locDiff}
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
                          initialValue: group.living.hostel || 0
                        })(
                          <Slider
                            min={0}
                            max={getFieldValue("hostel")+locDiff}
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
                          validateTrigger: "onBlur",
                          normalize: this.normalizeNumber,
                          initialValue: group.living.hostel || 0
                        })(
                          <InputNumber
                            min={0}
                            max={getFieldValue("hostel")+locDiff}
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
                          backgroundColor: ["#9966FF", "#36A2EB", "#FF6384", "#4BC0C0"]
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
                      initialValue: group.total || 1
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
                      initialValue: group.studyPeriod || 0
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
                              initialValue: group.studyPeriod || 0
                            })(<RangePicker locale={locale} dropdownClassName={style.rangePicker} />)}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Зимние каникулы:">
                            {getFieldDecorator("winterHoliday" + item, {
                              initialValue: group.studyPeriod || 0
                            })(<RangePicker locale={locale} dropdownClassName={style.rangePicker} />)}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item label="Зимняя сессия">
                            {getFieldDecorator("winterSession" + item, {
                              initialValue: group.studyPeriod || 0
                            })(<RangePicker locale={locale} dropdownClassName={style.rangePicker} />)}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Летняя сессия">
                            {getFieldDecorator("summerSession" + item, {
                              initialValue: group.studyPeriod || 0
                            })(<RangePicker locale={locale} dropdownClassName={style.rangePicker} />)}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item label="Аттестация 1">
                            {getFieldDecorator("attestation1" + item, {
                              initialValue: group.studyPeriod || 0
                            })(<RangePicker locale={locale} dropdownClassName={style.rangePicker} />)}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Аттестация 2">
                            {getFieldDecorator("attestation2" + item, {
                              initialValue: group.studyPeriod || 0
                            })(<RangePicker locale={locale} dropdownClassName={style.rangePicker} />)}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item label="Аттестация 3">
                            {getFieldDecorator("attestation3" + item, {
                              initialValue: group.studyPeriod || 0
                            })(<RangePicker locale={locale} dropdownClassName={style.rangePicker} />)}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Аттестация 4">
                            {getFieldDecorator("attestation4" + item, {
                              initialValue: group.studyPeriod || 0
                            })(<RangePicker locale={locale} dropdownClassName={style.rangePicker} />)}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                      <Col>
                          <Form.Item label="Практика">
                            {getFieldDecorator("practice" + item, {
                              initialValue: group.studyPeriod || 0
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
                    initialValue: group.others
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
  isOpen: state.modal.isOpen,
  group: state.groups.editing
});

const mapDispatchToProps = {
  closeModal,
  editGroupEnd
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedGroupForm);
