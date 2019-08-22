import React from "react";
import { Select, Avatar, Spin } from "antd";
import StudentService from "../../services/StudentService";
import UserService from "../../services/UsersService";
import style from "./style.module.scss";
import debounce from "lodash/debounce";

const { Option } = Select;

export default class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.fetchUser = debounce(this.fetchUser, 1000);
    this.state = {
      value: [],
      data: [],
      fetching: false
    };
  }

  fetchUser = value => {
    console.log("fetching user ", value);
    this.setState({ data: [], fetching: true });
    UserService.getAllCurators().then(res => {
      this.setState({ data: res.data, fetching: false });
    });
  };

  handleChange = value => {
    this.setState({
      value,
      data: [],
      fetching: false
    });
  };

  render() {
    console.log(this.state.data);
    return (
      <Select
        getPopupContainer={trigger => trigger.parentNode}
        size={"large"}
        className={style.selector}
        showSearch
        notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        style={{ width: "100%" }}
        placeholder={
          this.props.isStudent
            ? "Начните вводить ФИО студента или его группу..."
            : "Начните вводить ФИО куратора или его кафедру..."
        }
        optionFilterProp="children"
      >
        {this.state.data.map((item, index) => {
          return (
            <Option key={index} style={{ display: "flex" }}>
              <Avatar size={"small"} style={{ marginRight: "15px" }}>
                {item.initials}
              </Avatar>
              {item.first_name + " " + item.last_name} {item.f_name}
              <br />
              {this.props.isStudent
                ? "Группа " + item.group
                : "Кафедра: " + item.department}
              <br />
              {item.phone ? "Телефон: " + item.phone : null}
            </Option>
          );
        })}
      </Select>
    );
  }
}
