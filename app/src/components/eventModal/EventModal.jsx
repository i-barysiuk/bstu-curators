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
  InputNumber,
  Slider,
  Collapse,
  DatePicker,
  Alert
} from "antd";
import { getGroupData } from "../../helper/group";
import GroupsService from "../../services/GroupsService";
import { closeModal } from "../../redux/actions/modal";
import style from "./style.module.scss";

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
      this.setState({ current: 0, validStatus: true });
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

  validFamily = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    let diff =
      getFieldValue("total") -
      (getFieldValue("full") +
        getFieldValue("notfull") +
        getFieldValue("manychild") +
        getFieldValue("orphan"));
    if (!diff) callback();
    else callback(" ");
  };

  validGeography = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    let diff =
      getFieldValue("total") -
      (getFieldValue("local") +
        getFieldValue("nonresident") +
        getFieldValue("foreign"));
    if (!diff) callback();
    else callback(" ");
  };

  validLocation = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    let diff =
      getFieldValue("total") -
      (getFieldValue("parents") +
        getFieldValue("relatives") +
        getFieldValue("independent") +
        getFieldValue("hostel"));

    if (!diff) callback();
    else callback(" ");
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
        onCancel={() => closeModal() | this.setState({ current: 0 })}
        visible={isOpen}
        okText={"Сохранить"}
        cancelText={"Отмена"}
        onOk={this.save}
        zIndex={1030}
      ></Modal>
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
