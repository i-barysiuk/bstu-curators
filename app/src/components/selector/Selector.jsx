import React from "react";
import { Select, Avatar } from "antd";
import StudentService from "../../services/StudentService";
import UserService from "../../services/UsersService";
import style from "./style.module.scss";

const { Option } = Select;

export default class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  chooseData() {
    this.props.isStudent
      ? this.setState({ data: StudentService.getAll() })
      : UserService.getAllCurators().then(res => {
          this.setState({
            data: res.data
          });
        });
  }

  componentDidMount() {
    this.chooseData();
  }

  render() {
    console.log(this.state.data);
    return (
      <Select
        size={"large"}
        className={style.selector}
        showSearch
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
                : "Кафедра: " + item.cathedra}
              <br />
              {item.phone ? "Телефон: " + item.phone : null}
            </Option>
          );
        })}
      </Select>
    );
  }
}
