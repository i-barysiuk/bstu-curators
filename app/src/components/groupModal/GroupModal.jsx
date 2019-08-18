import React from "react";
import { connect } from "react-redux";
import { Pie } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFemale, faMale } from "@fortawesome/free-solid-svg-icons";
import locale from "antd/es/date-picker/locale/ru_RU";
import {
  Form,
  Modal,
  Tabs,
  Row,
  Col,
  Input,
  Select,
  InputNumber,
  Slider,
  Collapse,
  DatePicker
} from "antd";
import { getGroupData } from "../../helper/group";
import GroupsService from "../../services/GroupsService";
import {closeModal} from "../../redux/actions/modal"
import style from "./style.module.scss"

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

class GroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      current: "1",
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
        this.setState({ modalVisible: false });
      } catch (e) {
        console.log(e);
      }
    });
  };

  normalize = value => {
    return value && value.replace(/s+/g, "").trim();
  };

  validTotal = (rule, value, callback) => {
    debugger;
    if (!value || value === 0) {
      callback("Пожалуйста укажите значение");
    } else {
      callback();
    }
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      isOpen,
      closeModal
    } = this.props;

    var study = [];

    for (var i = 1; i <= getFieldValue("totalCourse") && i <= 6; i++) {
      study.push(i);
    }
    
    return (
      <Modal
        width={"70%"}
        title="Добавление группы"
        centered
        className={style.modal}
        destroyOnClose={true}
        maskClosable={false}
        onCancel={() => closeModal()}
        visible={isOpen}
        okText={"Сохранить"}
        cancelText={"Отмена"}
        onOk={this.save}
      >
        <Form>
          <Tabs
            tabPosition="left"
            activeKey={this.state.current}
            onTabClick={this.changeStep}
          >
            <TabPane tab="Основное" key="1">
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
                          message: "Неверный формат! Пример: AC-59"
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
                            "Неверный формат! Пример: Aвтоматизированные системы обработки информации-59"
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
                        placeholder="Факультет:"
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
                        }
                      ],
                      initialValue: "1",
                      validateTrigger: "onChange"
                    })(
                      <Select
                      dropdownClassName={style.select}
                      showSearch
                      placeholder="Курс:"
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
                          message: "Выберите значение!",
                          whitespace: true
                        }
                      ],
                      initialValue: this.state.form.department,
                      validateTrigger: "onChange"
                    })(
                      <Select
                        dropdownClassName={style.select}
                        showSearch
                        placeholder="Факультет:"
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
                        <Option value="АТПиП">Кафедра автоматизации технологических процессов и производств</Option>
                        <Option value="архитектуры">Кафедра архитектуры</Option>
                        <Option value="БУАиА">Кафедра бухгалтерского учета, анализа и аудита</Option>
                        <Option value="ВВиОВР">Кафедра водоснабжения, водоотведения и охраны водных ресурсов</Option>
                        <Option value="высшей математики">Кафедра высшей математики</Option>
                        <Option value="ГН">Кафедра гуманитарных наук</Option>
                        <Option value="ГТК">Кафедра геотехники и транспортных коммуникаций</Option>
                        <Option value="ИЭиХ">Кафедра инженерной экологии и химии</Option>
                        <Option value="ИЯ">Кафедра иностранных языков</Option>
                        <Option value="ИИТ">Кафедра интеллектуальных информационных технологий</Option>
                        <Option value="ИиПМ">Кафедра информатики и прикладной математики</Option>
                        <Option value="машиноведения">Кафедра машиноведения</Option>
                        <Option value="МЭА">Кафедра машиностроения и эксплуатации автомобилей</Option>
                        <Option value="менеджмента">Кафедра менеджмента</Option>
                        <Option value="МЭМИ">Кафедра мировой экономики, маркетинга, инвестиций</Option>
                        <Option value="НГиИГ">Кафедра начертательной геометрии и инженерной графики</Option>
                        <Option value="ПМ">Кафедра прикладной механики</Option>
                        <Option value="природообустройства">Кафедра природообустройства</Option>
                        <Option value="СК">Кафедра строительных конструкций</Option>
                        <Option value="ТГВ">Кафедра теплогазоснабжения и вентиляции</Option>
                        <Option value="ТБиСМ">Кафедра технологии бетона и строительных материалов</Option>
                        <Option value="ТСП">Кафедра технологии строительного производства</Option>
                        <Option value="УЭиФ">Кафедра управления, экономики и финансов</Option>
                        <Option value="физики">Кафедра физики</Option>
                        <Option value="ФВиС">Кафедра физического воспитания и спорта</Option>
                        <Option value="ФиК">Кафедра философии и культурологии</Option>
                        <Option value="ЭВМиС">Кафедра ЭВМ и систем</Option>
                        <Option value="ЭиОС">Кафедра экономики и организации строительства</Option>
                        <Option value="ЭТЛ">Кафедра экономической теории и логистики</Option>
                      </Select>
                      )}
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Состав" key="2">
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
                      <Col span={22}>
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
                          initialValue: this.state.form.total || 0
                        })(<InputNumber min={0} max={40} />)}
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
                          initialValue: this.state.form.total || 0
                        })(<InputNumber min={0} max={40} />)}
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
                          initialValue: this.state.form.total || 0
                        })(<InputNumber min={0} max={40} />)}
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
                          initialValue: this.state.form.total || 0
                        })(<InputNumber min={0} max={40} />)}
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
            </TabPane>

            <TabPane tab="Социальное" key="3">
              <Row type="flex" gutter={20}>
                <Col span={14}>
                  <Form.Item label="Состав семьи">
                    <span>Полная</span>
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("full", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(<Slider min={0} max={getFieldValue("total")} />)}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("full", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <InputNumber min={0} max={getFieldValue("total")} />
                        )}
                      </Col>
                    </Row>

                    <span>Неполная</span>
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("notfull", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <Slider
                            min={0}
                            max={getFieldValue("total") - getFieldValue("full")}
                          />
                        )}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("notfull", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <InputNumber
                            min={0}
                            max={getFieldValue("total") - getFieldValue("full")}
                          />
                        )}
                      </Col>
                    </Row>

                    <span>Многодетная</span>
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("manychild", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <Slider
                            min={0}
                            max={
                              getFieldValue("total") -
                              getFieldValue("full") -
                              getFieldValue("notfull")
                            }
                          />
                        )}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("manychild", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <InputNumber
                            min={0}
                            max={
                              getFieldValue("total") -
                              getFieldValue("full") -
                              getFieldValue("notfull")
                            }
                          />
                        )}
                      </Col>
                    </Row>
                    <span>Сироты</span>
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("orphan", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <Slider
                            min={0}
                            max={
                              getFieldValue("total") -
                              getFieldValue("full") -
                              getFieldValue("notfull") -
                              getFieldValue("manychild")
                            }
                          />
                        )}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("orphan", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <InputNumber
                            min={0}
                            max={
                              getFieldValue("total") -
                              getFieldValue("full") -
                              getFieldValue("notfull") -
                              getFieldValue("manychild")
                            }
                          />
                        )}
                      </Col>
                    </Row>
                  </Form.Item>
                  <Collapse bordered={false}>
                    <Panel header="Социальный статус">
                      <Form.Item label="Социальное">
                        <Row>
                          <Col span={19}>Дети сироты (до 18 лет)</Col>
                          <Col span={4}>
                            {getFieldDecorator("socOrphan18", {
                              rules: [
                                {
                                  required: true
                                }
                              ],
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
                              initialValue:
                                this.state.form.socWithoutParents18 || 0
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
                              initialValue:
                                this.state.form.socParentsInvalid || 0
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
            </TabPane>
            <TabPane tab="География" key="4">
              <Row type="flex" gutter={20}>
                <Col span={14}>
                  <Form.Item label="География">
                    <span>Местные</span>
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("local", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(<Slider min={0} max={getFieldValue("total")} />)}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("local", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <InputNumber min={0} max={getFieldValue("total")} />
                        )}
                      </Col>
                    </Row>

                    <span>Иногородние</span>
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("nonresident", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <Slider
                            min={0}
                            max={
                              getFieldValue("total") - getFieldValue("local")
                            }
                          />
                        )}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("nonresident", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <InputNumber
                            min={0}
                            max={
                              getFieldValue("total") - getFieldValue("local")
                            }
                          />
                        )}
                      </Col>
                    </Row>

                    <span>Иностранные</span>
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("foreign", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <Slider
                            min={0}
                            max={
                              getFieldValue("total") -
                              getFieldValue("local") -
                              getFieldValue("nonresident")
                            }
                          />
                        )}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("foreign", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <InputNumber
                            min={0}
                            max={
                              getFieldValue("total") -
                              getFieldValue("local") -
                              getFieldValue("nonresident")
                            }
                          />
                        )}
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item label="Проживание">
                    <span>С родителями</span>
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("parents", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(<Slider min={0} max={getFieldValue("total")} />)}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("parents", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <InputNumber min={0} max={getFieldValue("total")} />
                        )}
                      </Col>
                    </Row>

                    <span>С родственниками</span>
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("relatives", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <Slider
                            min={0}
                            max={
                              getFieldValue("total") - getFieldValue("parents")
                            }
                          />
                        )}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("relatives", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <InputNumber
                            min={0}
                            max={
                              getFieldValue("total") - getFieldValue("parents")
                            }
                          />
                        )}
                      </Col>
                    </Row>

                    <span>Самостоятельно</span>
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("independent", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <Slider
                            min={0}
                            max={
                              getFieldValue("total") -
                              getFieldValue("parents") -
                              getFieldValue("relatives")
                            }
                          />
                        )}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("independent", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <InputNumber
                            min={0}
                            max={
                              getFieldValue("total") -
                              getFieldValue("parents") -
                              getFieldValue("relatives")
                            }
                          />
                        )}
                      </Col>
                    </Row>
                    <span>В общежитии</span>
                    <Row gutter={20}>
                      <Col span={20}>
                        {getFieldDecorator("hostel", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <Slider
                            min={0}
                            max={
                              getFieldValue("total") -
                              getFieldValue("parents") -
                              getFieldValue("relatives") -
                              getFieldValue("independent")
                            }
                          />
                        )}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("hostel", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(
                          <InputNumber
                            min={0}
                            max={
                              getFieldValue("total") -
                              getFieldValue("parents") -
                              getFieldValue("relatives") -
                              getFieldValue("independent")
                            }
                          />
                        )}
                      </Col>
                    </Row>
                  </Form.Item>
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
            </TabPane>
            <TabPane tab="Учеба" key="5">
              <Row gutter={20}>
                <Col span={10}>
                  <Form.Item label="Продолжительность обучения:">
                    {getFieldDecorator("totalCourse", {
                      rules: [
                        {
                          required: true
                        }
                      ],
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
            </TabPane>
            <TabPane tab="Прочее" key="6">
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
                  })(<TextArea />)}
                </Form.Item>
              </Form.Item>
            </TabPane>
          </Tabs>
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
