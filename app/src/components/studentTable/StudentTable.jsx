import React from "react";
import Card from "../common/card/Card";
import BigButton from "../common/bigButton/BigButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Button, Popover, Icon, Input } from "antd";
import style from "./style.module.scss";
import {
  faPlus,
  faEllipsisH,
  faFemale,
  faMale
} from "@fortawesome/free-solid-svg-icons";

import Students from "../../services/StudentListService";

// const data = [
//   {
//     key: "1",
//     first_name: "aadasdsss`",
//     last_name: "Aleks",
//     f_name: "amaksimkovich",
//     sex: "woman",
//     birthday: "15.20.2000",
//     phone: "+375298411252",
//     email: "sssssssss@mail.ru"
//   },
//   {
//     key: "2",
//     first_name: "bendaadaadya",
//     last_name: "bsafokew",
//     f_name: "bmaksimkovich",
//     sex: "man",
//     birthday: "15.20.2000",
//     phone: "+375298411478",
//     email: "eawfasf@mail.ru"
//   },
//   {
//     key: "3",
//     first_name: "cam",
//     last_name: "cfsafsafasfasfasBrown",
//     f_name: "cmaksimkovich",
//     sex: "man",
//     birthday: "15.20.2000",
//     phone: "+375298411490",
//     email: "eawfasf@mail.ru"
//   }
// ];
var data;
class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }

  // getAllStudents = data => {
  //   var all = Students.getAllStudents(data),
  //     first_name = [],
  //     last_name = [],
  //     f_name = [];
  //   // eslint-disable-next-line array-callback-return
  //   all.map(item => {
  //     first_name.push(item.first_name);
  //     last_name.push(item.last_name);
  //     f_name.push(item.f_name);
  //   });
  //   this.setState({
  //     first_names: first_name,
  //     last_names: last_name,
  //     f_names: f_name
  //   });
  // };

  componentDidMount() {
    data = Students.getAllStudents();
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Поиск ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Найти
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Сбросить
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    }
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    console.log(data);
    const columns = [
      {
        title: "Фамилия",
        dataIndex: "last_name",
        ...this.getColumnSearchProps("по фамилии"),
        onFilter: (value, record) =>
          record.last_name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        sorter: (a, b) => {
          if (a.last_name < b.last_name) {
            return -1;
          }
          if (a.last_name > b.last_name) {
            return 1;
          }
          return 0;
        }
      },
      {
        title: "Имя",
        dataIndex: "first_name",
        ...this.getColumnSearchProps("по имени"),
        onFilter: (value, record) =>
          record.first_name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        sorter: (a, b) => {
          if (a.first_name < b.first_name) {
            return -1;
          }
          if (a.first_name > b.first_name) {
            return 1;
          }
          return 0;
        }
      },
      {
        title: "Отчетсво",
        dataIndex: "f_name",
        sorter: (a, b) => {
          if (a.f_name < b.f_name) {
            return -1;
          }
          if (a.f_name > b.f_name) {
            return 1;
          }
          return 0;
        }
      },
      {
        title: "Пол",
        dataIndex: "sex",
        align: "center",
        filters: [
          { text: "Мужской", value: "man" },
          { text: "Женский", value: "woman" }
        ],
        onFilter: (value, record) => record.sex.indexOf(value) === 0,
        render: data => {
          if (data === "woman") {
            return <FontAwesomeIcon icon={faFemale} className={style.woman} />;
          } else {
            return <FontAwesomeIcon icon={faMale} className={style.man} />;
          }
        }
      },
      {
        title: "Дата рождения",
        dataIndex: "birthday",
        align: "center"
      },
      {
        title: "Телефон",
        dataIndex: "phone",
        align: "center",
        ...this.getColumnSearchProps("по телефону"),
        onFilter: (value, record) =>
          record.phone
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
      },
      {
        title: "Электронная почта",
        dataIndex: "email",
        align: "center",
        render: data => (
          <Popover content={data}>
            <Button icon="mail" type="primary" />
          </Popover>
        )
      }
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      }
    };

    return (
      <Card
        title="Список студентов"
        buttons={
          <React.Fragment>
            <BigButton icon={faEllipsisH} dropdown content={123} />
            <BigButton primary icon={faPlus} />
          </React.Fragment>
        }
      >
        <Table
          size="middle"
          pagination={false}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          bordered
        />
      </Card>
    );
  }
}
export default Tables;
