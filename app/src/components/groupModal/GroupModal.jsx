import React from "react";
import { Form, Modal, Button, Tabs, Row, Col, Input, Select } from "antd";

const { TabPane } = Tabs;
const { Option } = Select;

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

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    return (
      <Modal
        width={"70%"}
        title="Добавление группы"
        centered
        destroyOnClose={true}
        maskClosable={false}
        onCancel={() => this.setModalVisible(false)}
        visible={this.state.modalVisible}
        okText={"Сохранить"}
        cancelText={"Отмена"}
      >
        <Form>
          <Tabs
            tabPosition="left"
            activeKey={this.state.current}
            onTabClick={this.changeStep}
          >
            <TabPane tab="Основное" key="1">
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

              <Form.Item label="Группа">
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
              <Form.Item label="Название группы (краткое)">
                {getFieldDecorator("name", {
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
                  initialValue: this.state.form.name
                })(<Input placeholder="Группа" />)}
              </Form.Item>

              <Form.Item label="Название группы (полное)">
                {getFieldDecorator("fullName", {
                  rules: [
                    {
                      required: true,
                      message: "Пожалуйста укажите название группы"
                    },
                    {
                      pattern: /(^[А-Я]{1,1}[A-я]{1,6}-[0-9]{1,3}$)/,
                      message:
                        "Неверный формат! Пример: Aвтоматизированные системы обработки информации - 59"
                    }
                  ],
                  validateTrigger: "onBlur",
                  initialValue: this.state.form.fullName
                })(<Input placeholder="Группа" />)}
              </Form.Item>
            </TabPane>
            <TabPane tab="Состав" key="2">
              Content of Tab 2
            </TabPane>
            <TabPane tab="Социальное" key="3">
              Content of Tab 3
            </TabPane>
            <TabPane tab="География" key="4">
              Content of Tab 3
            </TabPane>
            <TabPane tab="Учеба" key="5">
              Content of Tab 3
            </TabPane>
            <TabPane tab="Прочее" key="6">
              Content of Tab 3
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}

const WrappedGroupForm = Form.create({ name: "group" })(GroupForm);

export default WrappedGroupForm;
