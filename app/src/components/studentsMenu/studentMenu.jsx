import React from "react";
import { connect } from "react-redux";
import style from "./style.module.scss";
import { Input, Icon } from "antd";
import Collapse from "../common/collapse/Collapse";
import { openStudentModal } from "../../redux/actions/modal";
import BigButton from "../common/bigButton/BigButton";
import {
    faPlus,
    faUniversity,
    faUsers,
  } from "@fortawesome/free-solid-svg-icons";

class StudentCards extends React.Component {
  onGroupClick = id => this.props.history.push(`/dashboard/students/${id}`);

  render() {
    const {
      fetchAll,
      openStudentModal
    } = this.props;
    return (
      <div className={style.container}>
        <div className={style.head}>
          <div className={style.headerRow}>
            <span className={style.header}>Студенты</span>
            <BigButton icon={faPlus} onClick={openStudentModal} primary />
          </div>
          <Input
            prefix={<Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Поиск"
            className={style.input}
          />
        </div>
        <div className={style.content}>
          <Collapse icon={faUsers} title="Мои студенты">
          </Collapse>

          <Collapse icon={faUniversity} fetch={fetchAll} title="Факультеты">
           </Collapse>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  openStudentModal
};

export default connect(
  null,
  mapDispatchToProps
)(StudentCards);