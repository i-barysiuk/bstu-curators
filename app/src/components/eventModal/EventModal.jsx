import React from "react";
import { connect } from "react-redux";
import locale from "antd/es/date-picker/locale/ru_RU";
import { Form, Modal, Row, Col, Input, DatePicker, Select } from "antd";
import Groups from "../../services/GroupsService";
import EventService from "../../services/EventService";
import { closeEventsModal } from "../../redux/actions/eventModal";
import style from "./style.module.scss";
import debounce from "lodash/debounce";

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.closingAfterSave = debounce(this.closingAfterSave, 100);
    this.state = {
      validStatus: false,
      form: {},
      data: []
    };
  }

  componentDidMount() {
    Groups.getAll().then(response => {
      var groupsData = response.data.map(item => {
        return { id: item.id, name: item.name };
      });
      this.setState({ data: groupsData });
    });
  }

  save = () => {
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (err) {
        return;
      }
      let event = {
        creator: this.props.profileId,
        title: values.title,
        subtitle: values.subtitle,
        place: values.place,
        dataStart: values.eventDate[0],
        dataEnd: values.eventDate[1],
        description: values.description,
        customIcon: values.type
      };
      let groupsEvent = {
        creator: this.props.profileId,
        eventId: values.eventGroups
      };
      try {
        await EventService.addEvent(event);
      } catch (e) {
        console.log(e);
      }
      this.setState({ validStatus: true });
      this.closingAfterSave();
    });
  };

  closingAfterSave = () => {
    this.setState({ validStatus: false });
    this.props.closeEventsModal();
  };

  selector() {
    const children = [];
    for (let i = 0; i < this.state.data.length; i++) {
      children.push(
        <Option value={this.state.data[i].id}>{this.state.data[i].name}</Option>
      );
    }
    return children;
  }

  render() {
    const {
      form: { getFieldDecorator },
      isOpen,
      closeEventsModal
    } = this.props;
    return (
      <Modal
        width={"70%"}
        title="Добавление события"
        centered
        className={style.modal}
        destroyOnClose={true}
        maskClosable={false}
        onCancel={() => closeEventsModal()}
        visible={isOpen}
        okText={"Сохранить"}
        cancelText={"Отмена"}
        onOk={this.save}
        zIndex={1030}
      >
        <Form>
          <Row type="flex" gutter={24}>
            <Col span={12}>
              <Form.Item label="Название события:">
                {getFieldDecorator("title", {
                  rules: [
                    {
                      required: true,
                      message: "Пожалуйста, укажите название события"
                    }
                  ],
                  validateTrigger: "onBlur",
                  initialValue: this.state.form.title
                })(<Input placeholder="Событие" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Краткое описание события:">
                {getFieldDecorator("subtitle", {
                  rules: [
                    {
                      required: true,
                      message: "Пожалуйста, укажите краткое описание события"
                    }
                  ],
                  validateTrigger: "onBlur",
                  initialValue: this.state.form.subtitle
                })(<Input placeholder="Описание" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row type="flex" gutter={24}>
            <Col span={12}>
              <Form.Item label="Место проведения:">
                {getFieldDecorator("place", {
                  rules: [
                    {
                      required: true,
                      message: "Пожалуйста, укажите место проведения"
                    }
                  ],
                  validateTrigger: "onBlur",
                  initialValue: this.state.form.place
                })(<Input placeholder="Место" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Тип события">
                {getFieldDecorator("type", {
                  rules: [
                    {
                      required: true,
                      message: "Выберите тип события"
                    }
                  ],
                  initialValue: this.state.form.type,
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
                    <Option value="Экзамен">Экзамен</Option>
                    <Option value="Культурно-массовое мероприятие">
                      Культурно-массовое мероприятие
                    </Option>
                    <Option value="Донорство">Донорство</Option>
                    <Option value="Спортивное мероприятие">
                      Спортивное мероприятие
                    </Option>
                    <Option value="Субботник">Субботник</Option>
                    <Option value="Отработка">Отработка</Option>
                    <Option value="Зачисление студента">
                      Зачисление студента
                    </Option>
                    <Option value="Отчисление студента">
                      Отчисление студента
                    </Option>
                    <Option value="Пересдача экзамена">
                      Пересдача экзамена
                    </Option>
                    <Option value="Линейка">Линейка</Option>
                    <Option value="Собрание">Собрание</Option>
                    <Option value="Кураторский час">Кураторский час</Option>
                    <Option value="Военный праздник">Военный праздник</Option>
                    <Option value="Каникулы">Каникулы</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row type="flex" gutter={24}>
            <Col span={12}>
              <Form.Item label="Дата проведения:">
                {getFieldDecorator("eventDate", {
                  rules: [
                    {
                      type: "array",
                      required: true,
                      message: "Пожалуйста, укажите время проведения"
                    }
                  ],
                  initialValue: this.state.form.eventDate || 0
                })(
                  <RangePicker
                    locale={locale}
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={["Дата начала", "Дата конца"]}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Необходимые группы:">
                {getFieldDecorator("eventGroups", {
                  rules: [
                    {
                      required: true,
                      message: "Пожалуйста, укажите группы"
                    }
                  ],
                  initialValue: this.state.form.eventGroups,
                  validateTrigger: "onChange"
                })(
                  <Select
                    dropdownClassName={style.select}
                    showSearch
                    mode="multiple"
                    placeholder="Выберите..."
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {this.selector()}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item label="Полное описание события:">
                <Form.Item>
                  {getFieldDecorator("description", {
                    rules: [
                      {
                        pattern: /(^[^]{0,1000}$)/,
                        message: "Максимум 1000 символов!"
                      }
                    ],
                    initialValue: this.state.form.description
                  })(<TextArea autosize={{ minRows: 2, maxRows: 5 }} />)}
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

const WrappedEventForm = Form.create({ name: "event" })(EventForm);

const mapStateToProps = state => ({
  profileId: state.users.profile.id,
  isOpen: state.eventModal.isOpen
});

const mapDispatchToProps = {
  closeEventsModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedEventForm);
