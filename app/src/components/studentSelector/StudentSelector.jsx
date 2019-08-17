import React from "react";
import { Select, Avatar } from "antd";

const { Option } = Select;
const students = [
  {
    first_name: "Roberth",
    last_name: "Willson",
    f_name: null,
    initials: "RW",
    group: "MS-3"
  },
  {
    first_name: "Bill",
    last_name: "Milligan",
    f_name: "Batskavich",
    initials: "BMB",
    group: "ASOI-34"
  },
  {
    first_name: "Lora",
    last_name: "Coahen",
    f_name: "Batskavna",
    initials: "LCB",
    group: "LOL-KEK"
  },
  {
    first_name: "Andrew",
    last_name: "Lincoln",
    f_name: "Zombievich",
    initials: "ALZ",
    group: "CHEBUREK"
  },
  {
    first_name: "Danai",
    last_name: "Gurira",
    f_name: "Nigretosovna",
    initials: "DGN",
    group: "SAS"
  },
  {
    first_name: "Chandler",
    last_name: "Riggs",
    f_name: "Pogib",
    initials: "CRP",
    group: "PUP"
  }
];

class StudentSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: students
    };
  }

  render() {
    return (
      <Select
        size={"large"}
        showSearch
        style={{ width: "100%" }}
        placeholder="Начните вводить ФИО студента..."
        optionFilterProp="children"
      >
        {this.state.students.map((item, index) => {
          return (
            <Option key={index}>
              <Avatar size={25}>{item.initials}</Avatar>
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
