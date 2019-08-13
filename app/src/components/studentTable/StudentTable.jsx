import React from "react";
import Card from "../common/card/Card";
import BigButton from "../common/bigButton/BigButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Button, Popover, Icon, Input } from "antd";
import style from "./style.module.scss";
import { faPlus, faEllipsisH, faFemale, faMale} from "@fortawesome/free-solid-svg-icons";

class Tables extends React.Component {
  state = {
    searchText: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Поиск ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
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
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Сбросить
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
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
    },
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
const data = [
  {
    key: "1",
    first_name: "aadasdsss`",
    last_name: "Aleks",
    f_name: "amaksimkovich",
    sex: "woman",
    birthday: "15/20/2000",
    phone: "+375298411425",
    email: "sssssssss@mail.ru"
  },
  {
    key: "2",
    first_name: "bendaadaadya",
    last_name: "bsafokew",
    f_name: "bmaksimkovich",
    sex: "man",
    birthday: "15/20/2000",
    phone: "+375298411425",
    email: "eawfasf@mail.ru"
  },
  {
    key: "3",
    first_name: "cam",
    last_name: "cfsafsafasfasfasBrown",
    f_name: "cmaksimkovich",
    sex: "man",
    birthday: "15/20/2000",
    phone: "+375298411425",
    email: "eawfasf@mail.ru"
  },
  {
    key: "4",
    first_name: "dam",
    last_name: "dfsafsafasfasfasBrown",
    f_name: "dmaksimkovich",
    sex: "man",
    birthday: "15/20/2000",
    phone: "+375298411425",
    email: "eawfasf@mail.ru"
  },
  {
    key: "5",
    first_name: "eam",
    last_name: "efsafsafasfasfasBrown",
    f_name: "emaksimkovich",
    sex: "man",
    birthday: "15/20/2000",
    phone: "+375298411425",
    email: "eawfasf@mail.ru"
  }
];
const columns = [
  {
    title: "Фамилия",
    dataIndex: "last_name",
    ...this.getColumnSearchProps('по фамилии'),
    onFilter: (value, record) => record.last_name.indexOf(value) === 0,
    defaultSortOrder: 'descend',
    sorter: (a, b) =>   {
      if(a.f_name < b.f_name) { return -1; }
      if(a.f_name > b.f_name) { return 1; }
      return 0;}
  },
  {
    title: "Имя",
    dataIndex: "first_name",
    ...this.getColumnSearchProps('по имени'),
    onFilter: (value, record) => record.first_name.indexOf(value) === 0,
    defaultSortOrder: 'descend',
    sorter: (a, b) =>   {
      if(a.f_name < b.f_name) { return -1; }
      if(a.f_name > b.f_name) { return 1; }
      return 0;}
  },
  {
    title: "Отчетсво",
    dataIndex: "f_name",
    defaultSortOrder: 'descend',
    sorter: (a, b) => 
   {
    if(a.f_name < b.f_name) { return -1; }
    if(a.f_name > b.f_name) { return 1; }
    return 0;}
  },
  {
    title: "Пол",
    dataIndex: "sex",
    align: "center",
    filters: [{ text: 'Мужской', value: 'man' }, { text: 'Женский', value: 'woman' }],
    onFilter: (value, record) => record.sex.indexOf(value) === 0,
    render: data => {
      if (data === "woman") {
        return (
        <FontAwesomeIcon icon={faFemale} 
        className={style.woman}/>);
      } else {
        return <FontAwesomeIcon icon={faMale}
        className={style.man} />   ;
      }
    }
  },
  {
    title: "Дата рождения",
    dataIndex: "birthday"
  },
  {
    title: "Телефон",
    dataIndex: "phone",
    ...this.getColumnSearchProps('по телефону'),
    onFilter: (value, record) => record.phone.indexOf(value) === 0,
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
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
      <Table size="middle" 
       rowSelection={rowSelection}
       columns={columns}
       dataSource={data} 
       bordered />
    </Card>
  );
    };
  }
  export default Tables;