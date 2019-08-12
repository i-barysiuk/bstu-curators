import React from "react";
import Card from "../common/card/Card";
import BigButton from "../common/bigButton/BigButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Button, Popover, } from "antd";
import style from "./style.module.scss";
import { faPlus, faEllipsisH, faFemale, faMale} from "@fortawesome/free-solid-svg-icons";

const data = [
  {
    key: "1",
    first_name: "sadasd`",
    last_name: "Brown",
    f_name: "maksimkovich",
    sex: "woman",
    birthday: "15/20/2000",
    phone: "+375298411425",
    email: "sssssssss@mail.ru"
  },
  {
    key: "2",
    first_name: "maksim",
    last_name: "Brown",
    f_name: "maksimkovich",
    sex: "man",
    birthday: "15/20/2000",
    phone: "+375298411425",
    email: "eawfasf@mail.ru"
  }
];
const columns = [
  {
    title: "Фамилия",
    dataIndex: "last_name"
  },
  {
    title: "Имя",
    dataIndex: "first_name"
  },
  {
    title: "Отчетсво",
    dataIndex: "f_name"
  },
  {
    title: "Пол",
    dataIndex: "sex",
    align: "center",
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
    dataIndex: "phone"
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

export default props => {
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
      <Table size="middle" columns={columns} dataSource={data} bordered />
    </Card>
  );
};
