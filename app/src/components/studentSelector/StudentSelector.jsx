import React from "react";
import { Select, Avatar } from "antd";
import StudentService from "../../services/StudentService";

const { Option } = Select;

class StudentSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: StudentService.getAll()
    };
  }

  render() {
    return (
      <Select
        size={"large"}
        showSearch
        style={{ width: "100%" }}
        placeholder="Начните вводить ФИО студента или его группу..."
        optionFilterProp="children"
      >
        {this.state.students.map((item, index) => {
          return (
            <Option key={index}>
              <Avatar size={20}>{item.initials}</Avatar>
              {item.first_name + " " + item.last_name} {item.f_name}{" "}
              {"группа " + item.group}
            </Option>
          );
        })}
      </Select>
    );
  }
}

export default StudentSelector;
