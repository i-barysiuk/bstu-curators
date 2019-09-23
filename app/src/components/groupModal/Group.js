import React from "react";
import style from "./style.module.scss";
import {
  Form,
  Input,
  Modal,
  Select,
  Slider,
  InputNumber,
  Button,
  Steps,
  Tabs
} from "antd";
const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;
const { TabPane } = Tabs;

function convert(total, value) {
  if (total - value < 0) return 0;
  else return total - value;
}

const defState = {
  total: 0,
  sex_w: 0,
  sex_m: 0,
  brsm: 0,
  profcom: 0,
  other: 0,
  social_0: 0,
  social_1: 0,
  social_2: 0,
  social_3: 0,
  social_4: 0,
  social_5: 0,
  social_6: 0,
  social_7: 0,
  standart: 0,
  large: 0,
  incomplete: 0,
  parent: 0,
  hostel: 0,
  relative: 0,
  private: 0
};

class GroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      current: 0,
      form: defState
    };
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible, current: 0, form: defState });
  }

  onTotalChange = value => {
    this.props.form.setFieldsValue({
      total: typeof value === "number" ? value : 0
    });
  };
  onWomenChange = value => {
    this.props.form.setFieldsValue({
      sex_w: typeof value === "number" ? value : 0
    });
  };
  onMenChange = value => {
    this.props.form.setFieldsValue({
      sex_m: typeof value === "number" ? value : 0
    });
  };

  onStandartChange = value => {
    this.props.form.setFieldsValue({
      standart: typeof value === "number" ? value : 0
    });
  };
  onLargeChange = value => {
    this.props.form.setFieldsValue({
      large: typeof value === "number" ? value : 0
    });
  };
  onIncompleteChange = value => {
    this.props.form.setFieldsValue({
      incomplete: typeof value === "number" ? value : 0
    });
  };

  onParentChange = value => {
    this.props.form.setFieldsValue({
      parent: typeof value === "number" ? value : 0
    });
  };
  onHostelChange = value => {
    this.props.form.setFieldsValue({
      hostel: typeof value === "number" ? value : 0
    });
  };
  onRelativeChange = value => {
    this.props.form.setFieldsValue({
      relative: typeof value === "number" ? value : 0
    });
  };
  onPrivateChange = value => {
    this.props.form.setFieldsValue({
      private: typeof value === "number" ? value : 0
    });
  };

  next() {
    var validation = [
      ["faculty", "group", "curator", "total", "sex_w", "sex_m"],
      ["brsm", "profcom", "other"],
      [
        "social_0",
        "social_1",
        "social_2",
        "social_3",
        "social_4",
        "social_5",
        "social_6",
        "social_7",
        "social_8"
      ],
      [
        "standart",
        "large",
        "incomplete",
        "parent",
        "hostel",
        "relative",
        "private"
      ],
      ["more"]
    ];
    const fields = this.props.form.getFieldsValue();
    this.props.form.validateFieldsAndScroll(
      validation[this.state.current],
      (err, values) => {
        if (!err) {
          const current = this.state.current + 1;
          this.setState({ form: fields, current: current });
          if (current === 5) this.setModalVisible(false);
          console.log(current - 1 + "->" + current);
          console.log("props");
          console.log(fields);
          console.log("state");
          console.log(this.state.form);
        }
      }
    );
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
    console.log(current + 1 + "->" + current);
    console.log("props");
    console.log(this.state.form);
    console.log("state");
    console.log(this.state.form);
  }

  validTotal = (rule, value, callback) => {
    debugger;
    if (!value || value === 0) {
      callback("Пожалуйста укажите значение");
    } else {
      callback();
    }
  };

  validSex = (rule, value, callback) => {
    debugger;
    const { getFieldValue } = this.props.form;
    if (
      getFieldValue("sex_w") !==
      convert(getFieldValue("total"), getFieldValue("sex_m"))
    ) {
      callback("Распределите всех!");
    } else {
      callback();
    }
  };

  validComposition = (rule, value, callback) => {
    debugger;
    const { getFieldValue } = this.props.form;
    if (
      getFieldValue("standart") !==
      convert(
        getFieldValue("total"),
        getFieldValue("large") + getFieldValue("incomplete")
      )
    ) {
      callback("Распределите всех!");
    } else {
      callback();
    }
  };

  validPlace = (rule, value, callback) => {
    debugger;
    const { getFieldValue } = this.props.form;
    if (
      getFieldValue("parent") !==
      convert(
        getFieldValue("total"),
        getFieldValue("hostel") +
          getFieldValue("relative") +
          getFieldValue("private")
      )
    ) {
      callback("Не все участники группы распределены");
    } else {
      callback();
    }
  };

  getOrganisation() {
    const fieldName = ["brsm", "profcom", "other"];
    const fieldText = ["БРСМ", "Профком", "Прочее"];
    const form = this.state.form;
    const value = [form.brsm, form.profcom, form.other];
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const children = [];
    for (let i = 0; i < 3; i++) {
      children.push(
        <Form.Item>
          <div className={style.row}>
            <div className={style.dynamicText}>
              <label>{fieldText[i]}</label>
            </div>
            {getFieldDecorator(fieldName[i], {
              initialValue: value[i]
            })(
              <InputNumber
                className={style.border}
                min={0}
                max={getFieldValue("total")}
                placeholder="0"
              />
            )}
          </div>
        </Form.Item>
      );
    }
    return children;
  }

  getSocial(column) {
    const first = column ? 4 : 0;
    const last = column ? 8 : 4;
    const form = this.state.form;
    const fieldName = [
      form.social_0,
      form.social_1,
      form.social_2,
      form.social_3,
      form.social_4,
      form.social_5,
      form.social_6,
      form.social_7
    ];
    var text = [
      "Дети-сироты (до 18 лет)",
      "Дети, оставшиеся без попечения родителей (до 18 лет)",
      "Дети, оставшиеся без попечения родителей (до 18 лет)",
      "Лица из числа детей-сирот и детей, оставшихся без попечения родителей (18-23 лет)",
      "Студенты с особенностями психофизического развития",
      "Имеющие родителей инвалидов 1, 2 группы",
      "Из регионов пострадавших от катастрофы на Чернобыльской АЭС",
      "Из семей, отселенных из зон радиоактивного загрязнения"
    ];
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const children = [];
    for (let i = first; i < last; i++) {
      children.push(
        <Form.Item className={style.social}>
          <div className={style.column}>
            <label>{text[i]}</label>
            {getFieldDecorator(`social_${i}`, {
              initialValue: fieldName[i]
            })(
              <InputNumber
                className={style.border}
                min={0}
                max={getFieldValue("total")}
                placeholder="0"
              />
            )}
          </div>
        </Form.Item>
      );
    }
    return children;
  }

  getFamilyComposition() {
    const fieldName = ["standart", "large", "incomplete"];
    const fieldText = ["Cтандартная", "Многодетная", "Неполная"];
    const form = this.state.form;
    const value = [form.standart, form.large, form.incomplete];
    var change = [
      this.onStandartChange,
      this.onLargeChange,
      this.onIncompleteChange
    ];
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const calc = [
      getFieldValue(fieldName[1]) + getFieldValue(fieldName[2]),
      getFieldValue(fieldName[0]) + getFieldValue(fieldName[2]),
      getFieldValue(fieldName[0]) + getFieldValue(fieldName[1])
    ];
    const children = [];
    for (let i = 0; i < 3; i++) {
      children.push(
        <Form.Item>
          <div className={style.row}>
            <div className={style.dynamicText}>
              <label>
                <span className={style.red}>*</span>
                {fieldText[i]}
              </label>
            </div>
            {getFieldDecorator(fieldName[i], {
              rules: [{ required: true }, { validator: this.validComposition }],
              initialValue: value[i],
              onChange: change[i]
            })(
              <InputNumber
                className={style.border}
                min={0}
                max={convert(getFieldValue("total"), calc[i])}
                placeholder="0"
              />
            )}
          </div>
        </Form.Item>
      );
    }
    return children;
  }

  getPlace() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const fieldName = ["parent", "hostel", "relative", "private"];
    var fieldText = [
      "С родителями",
      "В общежитии",
      "У родственников",
      "На частной квартире"
    ];
    const form = this.state.form;
    const value = [form.parent, form.hostel, form.relative, form.private];
    const change = [
      this.onParentChange,
      this.onHostelChange,
      this.onRelativeChange,
      this.onPrivateChange
    ];
    const calc = [
      getFieldValue(fieldName[1]) +
        getFieldValue(fieldName[2]) +
        getFieldValue(fieldName[3]),
      getFieldValue(fieldName[0]) +
        getFieldValue(fieldName[2]) +
        getFieldValue(fieldName[3]),
      getFieldValue(fieldName[0]) +
        getFieldValue(fieldName[1]) +
        getFieldValue(fieldName[3]),
      getFieldValue(fieldName[0]) +
        getFieldValue(fieldName[1]) +
        getFieldValue(fieldName[2])
    ];
    const children = [];

    for (let i = 0; i < 4; i++) {
      children.push(
        <div className={style.flex}>
          <div className={style.dynamicText}>
            <label>
              <span className={style.red}>*</span>
              {fieldText[i]}
            </label>
          </div>
          <Form.Item>
            <div className={style.row}>
              {getFieldDecorator(fieldName[i], {
                rules: [{ validator: this.validPlace }],
                initialValue: value[i],
                onChange: change[i]
              })(
                <Slider
                  min={0}
                  max={convert(getFieldValue("total"), calc[i])}
                />
              )}
              <InputNumber
                value={getFieldValue(fieldName[i])}
                onChange={this.onParentChange}
                className={style.border}
                min={0}
                max={convert(getFieldValue("total"), calc[i])}
                style={{ marginLeft: 16 }}
              />
            </div>
          </Form.Item>
        </div>
      );
    }
    return children;
  }

  render() {
    const { current } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const steps = [
      {
        title: "group info",
        content: (
          <div>
            <div className={style.container}>
              <div className={style.select}>
                <Form.Item label="Факультет">
                  {getFieldDecorator("faculty", {
                    rules: [
                      {
                        required: true,
                        message: "Пожалуйста выберите факультет"
                      }
                    ],
                    initialValue: this.state.form.faculty
                  })(
                    <Select
                      className={style.border}
                      dropdownClassName={style.border}
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
              </div>
            </div>

            <div className={style.container}>
              <Form.Item label="Название группы">
                {getFieldDecorator("group", {
                  rules: [
                    {
                      required: true,
                      message: "Пожалуйста укажите название группы"
                    },
                    {
                      pattern: /(^[А-Я]{1,1}[A-я]{1,6}-[0-9]{1,3}$)/,
                      message: "Неверный формат! Пример: AC-59"
                    }
                  ],
                  validateTrigger: "onBlur",
                  initialValue: this.state.form.group
                })(<Input className={style.border} placeholder="Группа" />)}
              </Form.Item>
            </div>

            <div className={style.flex}>
              <div className={style.container}>
                <Form.Item label="Куратор">
                  {getFieldDecorator("curator", {
                    rules: [
                      {
                        required: true,
                        message: "Пожалуйста укажите ФИО"
                      },
                      {
                        pattern: /(^[А-Я]{1,1}[а-я]{1,20} [А-Я]{1,1}[а-я]{1,20} [А-Я]{1,1}[а-я]{1,20}$)|(^[А-Я]{1,1}[а-я]{1,20}-[А-Я]{1,1}[а-я]{1,16} [А-Я]{1,1}[а-я]{1,20} [А-Я]{1,1}[а-я]{1,20}$)/,
                        message: "Неверный формат!"
                      }
                    ],
                    validateTrigger: "onBlur",
                    initialValue: this.state.form.curator
                  })(<Input className={style.border} placeholder="ФИО" />)}
                </Form.Item>
              </div>
              <div className={style.container}>
                <Form.Item label="Номер телефона">
                  <div className={style.row}>
                    <span className={style.phone}>+375</span>
                    {getFieldDecorator("phone", {
                      rules: [
                        {
                          pattern: /(^[0-9]{7,9}$)/,
                          message: "Введите корректный номер телефона"
                        }
                      ],
                      validateTrigger: "onBlur",
                      initialValue: this.state.form.phone
                    })(
                      <InputNumber
                        min={0}
                        className={style.border}
                        style={{ width: "100%" }}
                      />
                    )}
                  </div>
                </Form.Item>
              </div>
            </div>

            <div className={style.colunm}>
              <Form.Item label="Количество человек">
                <div className={style.row}>
                  {getFieldDecorator("total", {
                    rules: [
                      {
                        required: true
                      },
                      { validator: this.validTotal }
                    ],
                    initialValue: this.state.form.total,
                    onChange: this.onTotalChange
                  })(<Slider min={0} max={40} />)}
                  <InputNumber
                    className={style.border}
                    onChange={this.onTotalChange}
                    value={getFieldValue("total")}
                    min={0}
                    max={40}
                    style={{ marginLeft: 16 }}
                  />
                </div>
              </Form.Item>
            </div>

            <div>
              <h2>Из них:</h2>
              <div className={style.flex}>
                <div className={style.dynamicText + " " + style.sex}>
                  <label>
                    <span className={style.red}>*</span>
                    Девушек:
                  </label>
                </div>
                <Form.Item>
                  <div className={style.row}>
                    {getFieldDecorator("sex_w", {
                      rules: [
                        {
                          required: true
                        },
                        { validator: this.validSex }
                      ],
                      initialValue: this.state.form.sex_w,
                      onChange: this.onWomenChange
                    })(
                      <Slider
                        min={0}
                        max={convert(
                          getFieldValue("total"),
                          getFieldValue("sex_m")
                        )}
                      />
                    )}
                    <InputNumber
                      className={style.border}
                      onChange={this.onWomenChange}
                      value={getFieldValue("sex_w")}
                      min={0}
                      max={convert(
                        getFieldValue("total"),
                        getFieldValue("sex_m")
                      )}
                      style={{ marginLeft: 16 }}
                    />
                  </div>
                </Form.Item>
              </div>
              <div className={style.flex}>
                <div className={style.dynamicText + " " + style.sex}>
                  <label>
                    <span className={style.red}>*</span>
                    Юношей:
                  </label>
                </div>
                <Form.Item>
                  <div className={style.row}>
                    {getFieldDecorator("sex_m", {
                      rules: [
                        {
                          required: true
                        },
                        { validator: this.validSex }
                      ],
                      initialValue: this.state.form.sex_m,
                      onChange: this.onMenChange
                    })(
                      <Slider
                        min={0}
                        max={convert(
                          getFieldValue("total"),
                          getFieldValue("sex_w")
                        )}
                      />
                    )}
                    <InputNumber
                      className={style.border}
                      onChange={this.onMenChange}
                      value={getFieldValue("sex_m")}
                      min={0}
                      max={convert(
                        getFieldValue("total"),
                        getFieldValue("sex_w")
                      )}
                      style={{ marginLeft: 16 }}
                    />
                  </div>
                </Form.Item>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "organisations",
        content: (
          <div>
            <h2>
              Нахождение студентов в различных объединениях, сообществах и т.д.
            </h2>
            {this.getOrganisation()}
          </div>
        )
      },
      {
        title: "social status",
        content: (
          <div className={style.padding}>
            <div className={style.row}>
              <h2 style={{ marginLeft: 0 }}>Социальный статус</h2>
            </div>
            <div className={style.row}>
              <Tabs tabPosition="bottom">
                <TabPane tab="Часть 1" key="1">
                  <div className={style.column}>{this.getSocial(0)}</div>
                </TabPane>
                <TabPane tab="Часть 2" key="2">
                  <div className={style.column}>{this.getSocial(1)}</div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        )
      },
      {
        title: "Place and Composition",
        content: (
          <div>
            <div className={style.padding}>
              <div className={style.column}>
                <h2>Состав семей:</h2>

                {this.getFamilyComposition()}
              </div>
            </div>

            <div className={style.padding}>
              <div className={style.column}>
                <h2>Проживают:</h2>

                {this.getPlace()}
              </div>
            </div>
          </div>
        )
      },
      {
        title: "more",
        content: (
          <div className={style.padding}>
            <h2>Другие сведения</h2>
            <Form.Item>
              {getFieldDecorator("more", {
                rules: [
                  {
                    pattern: /(^[^]{0,1000}$)/,
                    message: "Максимум 1000 символов!"
                  }
                ],
                initialValue: this.state.form.more
              })(<TextArea className={style.border} style={{ height: 120 }} />)}
            </Form.Item>
          </div>
        )
      }
    ];

    return (
      <Modal
        title="Добавление группы"
        width="none"
        centered
        destroyOnClose={true}
        maskClosable={false}
        onCancel={() => this.setModalVisible(false)}
        visible={this.state.modalVisible}
        footer={
          <div className={style.flex}>
            <div style={{ marginBottom: 50 }}>
              <h3>
                Поля, отмеченные <span className={style.red}>*</span>{" "}
                обязательны для заполнения
              </h3>
            </div>
            <div className={style.footerButton}>
              {current > 0 && (
                <Button
                  style={{ width: 100 }}
                  className={style.border}
                  onClick={() => this.prev()}
                >
                  Назад
                </Button>
              )}
              <Button
                type="primary"
                style={{ width: 100 }}
                className={style.primary}
                onClick={() => this.next()}
              >
                {current < 4 ? "Далее" : "Готово"}
              </Button>
            </div>
          </div>
        }
      >
        <Form>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item} />
            ))}
          </Steps>
          {steps[current].content}
        </Form>
      </Modal>
    );
  }
}

const WrappedGroupForm = Form.create({ name: "group" })(GroupForm);

export default WrappedGroupForm;
