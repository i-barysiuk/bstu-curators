import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  Alert,
  Steps
} from "antd";
import { getGroupData } from "../../helper/group";
import GroupsService from "../../services/GroupsService";
import { closeModal } from "../../redux/actions/modal";
import style from "./style.module.scss";
import debounce from "lodash/debounce";

const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.closingAfterSave = debounce(this.closingAfterSave, 10);
    this.state = {
      validStatus: false,
      form: {}
    };
  }

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
      this.setState({ validStatus: true });
    });
  };

  closingAfterSave = () => {
    this.setState({ validStatus: false });
    this.props.closeModal();
  };

  normalize = value => {
    return value && value.replace(/ /g, "").trim();
  };

  normalizeNumber = value => {
    if (!value || value < 0) return 0;
    else return value;
  };

  normalizeCourse = value => {
    if (!value || value < 1) return 1;
    else return value;
  };

  validTotal = (rule, value, callback) => {
    if (!value) callback("Пожалуйста укажите значение");
    else callback();
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue, getFieldError },
      isOpen,
      closeModal
    } = this.props;

    return (
      <Modal
        width={"70%"}
        title="Добавление события"
        centered
        className={style.modal}
        destroyOnClose={true}
        maskClosable={false}
        onCancel={() => closeModal()}
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
                      message: "Пожалуйста укажите название события"
                    }
                  ],
                  normalize: this.normalize,
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
                      message: "Пожалуйста укажите краткое описание события"
                    }
                  ],
                  validateTrigger: "onBlur",
                  initialValue: this.state.form.subtitle
                })(<Input placeholder="Группа" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item label="Место проведения:">
                {getFieldDecorator("place", {
                  rules: [
                    {
                      required: true,
                      message: "Пожалуйста укажите название события"
                    }
                  ],
                  normalize: this.normalize,
                  validateTrigger: "onBlur",
                  initialValue: this.state.form.place
                })(<Input placeholder="Место" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item label="Дата проведения:">
                {getFieldDecorator("eventDate", {
                  initialValue: this.state.form.eventDate || 0
                })(
                  <RangePicker
                    locale={locale}
                    dropdownClassName={style.rangePicker}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item label="Полное описание события">
                <Form.Item>
                  {getFieldDecorator("description", {
                    rules: [
                      {
                        pattern: /(^[^]{0,1000}$)/,
                        message: "Максимум 1000 символов!"
                      }
                    ],
                    initialValue: this.state.form.description
                  })(<TextArea autosize={{ minRows: 4, maxRows: 6 }} />)}
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

// const mapStateToProps = state => ({
//   profileId: state.users.profile.id,
//   isOpen: state.modal.isOpen
// });

// const mapDispatchToProps = {
//   closeModal,
// }

// export default connect(mapStateToProps, mapDispatchToProps)(WrappedEventForm);

export default WrappedEventForm;
