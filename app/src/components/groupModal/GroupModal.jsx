import React from "react";
import { connect } from "react-redux";
import { Pie } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFemale, faMale } from "@fortawesome/free-solid-svg-icons";
<<<<<<< HEAD
=======
import locale from 'antd/es/date-picker/locale/ru_RU';

>>>>>>> b34bbc9df9b0cadbcf068cd7fbdc07ce936357dd
import {
  Form,
  Modal,
  Button,
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

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldValue
    } = this.props.form;

    var study = [];

    for (var i = 1; i <= getFieldValue("totalCourse") && i <= 6; i++) {
      study.push(i);
    }

    return (
      <Modal
        width={"70%"}
        title="Добавление группы"
        centered
        destroyOnClose={true}
        maskClosable={false}
        onCancel={() => this.setState({ modalVisible: false })}
        visible={this.state.modalVisible}
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
                          message: "Поле фамилия должно быть заполнено!",
                          whitespace: true
                        }
                      ],
                      initialValue: this.state.form.group,
                      validateTrigger: "onChange"
                    })(
                      <Select
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
                {/* <Col span={6}>
                  <Form.Item label="Курс">
                    {getFieldDecorator("course", {
                      rules: [
                        {
                          required: true,
                          message: "Поле фамилия должно быть заполнено!",
                          whitespace: true
                        }
                      ],
                      initialValue: this.state.form.course,
                      validateTrigger: "onChange"
                    })(<Input placeholder="Введите курс" />)}
                  </Form.Item>
                </Col> */}
                <Col span={6}>
                  <Form.Item label="Курс">
                    <Select
                       showSearch
                       placeholder="Курс:"
                       defaultValue="1"
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
                          message: "Поле фамилия должно быть заполнено!",
                          whitespace: true
                        }
                      ],
                      initialValue: this.state.form.department,
                      validateTrigger: "onChange"
                    })(
                      <Select
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
                          message: "Пожалуйста укажите название группы"
                        }
                      ],
                      validateTrigger: "onBlur",
                      initialValue: this.state.form.cathedra
                    })(<Input placeholder="Кафедра" />)}
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Состав" key="2">
              <Row type="flex" gutter={20}>
                <Col span={14}>
                  <Form.Item label="Количество человек">
                    <Row>
                      <Col span={20}>
                        {getFieldDecorator("total", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(<Slider min={0} max={40} />)}
                      </Col>
                      <Col span={4}>
                        {getFieldDecorator("total", {
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
                  <Form.Item label="Гендерный состав">
                    <Row>
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
                        <span>БРСМ</span>
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
                        <span>Профком</span>
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
                        <span>Студсовет</span>
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
                        <span>Другие</span>
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
                    <Row>
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
                    <Row>
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
                    <Row>
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
                    <Row>
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
                    <Row>
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
                    <Row>
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
                    <Row>
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
                    <Row>
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
                    <Row>
                      <Col span={20}>
                        {getFieldDecorator("relatives", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(<Slider min={0} max={getFieldValue("total") - getFieldValue("parents")} />)}
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
                          <InputNumber min={0} max={getFieldValue("total") - getFieldValue("parents")} />
                        )}
                      </Col>
                    </Row>

                    <span>Самостоятельно</span>
                    <Row>
                      <Col span={20}>
                        {getFieldDecorator("independent", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(<Slider min={0}
                            max={getFieldValue("total") -
                              getFieldValue("parents") -
                              getFieldValue("relatives") } />)}
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
                          <InputNumber min={0} 
                          max={getFieldValue("total") -
                            getFieldValue("parents") -
                            getFieldValue("relatives") } />
                        )}
                      </Col>
                    </Row>
                    <span>В общежитии</span>
                    <Row>
                      <Col span={20}>
                        {getFieldDecorator("hostel", {
                          rules: [
                            {
                              required: true
                            }
                          ],
                          initialValue: this.state.form.total || 0
                        })(<Slider min={0} 
                          max={getFieldValue("total") -
                            getFieldValue("parents") -
                            getFieldValue("relatives") -
                            getFieldValue("independent")} />)}
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
                          <InputNumber min={0}
                          max={getFieldValue("total") -
                            getFieldValue("parents") -
                            getFieldValue("relatives") -
                            getFieldValue("independent")} />
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
              <Row>
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
                    })(<RangePicker locale={locale} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Collapse>
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
                            })(<RangePicker locale={locale} />)}
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
                            })(<RangePicker locale={locale} />)}
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
                            })(<RangePicker locale={locale} />)}
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
                            })(<RangePicker locale={locale} />)}
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
                            })(<RangePicker locale={locale} />)}
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
                            })(<RangePicker locale={locale} />)}
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
                            })(<RangePicker locale={locale} />)}
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
                            })(<RangePicker locale={locale} />)}
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
  profileId: state.users.profile.id
});

export default connect(mapStateToProps)(WrappedGroupForm);
