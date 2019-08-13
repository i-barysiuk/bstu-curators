import React from "react";
import style from "./style.module.scss";
import Card from "../common/card/Card";
import BigButton from "../common/bigButton/BigButton";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Collapse } from "antd";
import { Pie } from "react-chartjs-2";

const { Panel } = Collapse;

const getDate = (ids, data) => {
  return data ? ids.map(id => data[id]) : [];
};

const config = [
  {
    label: "gender",
    labels: ["Юноши", "Девушки"],
    labelsIds: ["men", "women"],
    backgroundColor: ["#00BFFF", "pink"],
    text: "Гендерный состав"
  },
  {
    label: "community",
    labels: ["БРСМ", "ПРОФКОМ", "Белая русь", "Прочая"],
    labelsIds: ["brsm", "profkom", "whiterus", "other"],
    backgroundColor: ["red", "blue", "yellow", "green"],
    text: "Общественные организации"
  },
  {
    label: "family",
    labels: ["Полная", "Не полная", "Многодетные", "Сироты"],
    labelsIds: ["full", "notfull", "manychild", "orphan"],
    backgroundColor: ["red", "blue", "yellow", "green"],
    text: "Состав семьи"
  },
  {
    label: "geography",
    labels: ["Местный", "Иногородний", "Иностранный"],
    labelsIds: ["local", "nonresident", "foreign"],
    backgroundColor: ["red", "blue", "yellow"],
    text: "География"
  },
  {
    label: "living",
    labels: ["Родители", "Родственники", "Самостоятельно", "Общежитие"],
    labelsIds: ["parents", "relatives", "independent", "hostel"],
    backgroundColor: ["red", "blue", "yellow", "green"],
    text: "Проживание"
  }
];

export default ({ data }) => {
  return (
    <Card
      title="Характеристика"
      buttons={<BigButton icon={faPen} onClick={() => {}} />}
    >
      <div className={style.curator}>
        <Avatar size={64}>КМС</Avatar>
        <div>
          Краснова Мария Степановна
          <br /> <span>Кафедра гуманитарных наук</span>
        </div>
      </div>

      <div className={style.firstRow}>
        {data.gender &&
          config.map(element => (
            <div style={{ width: "50%" }} key={element.label}>
              <Pie
                data={{
                  labels: element.labels,

                  datasets: [
                    {
                      data: getDate(element.labelsIds, data[element.label]),
                      backgroundColor: element.backgroundColor
                    }
                  ]
                }}
                options={{
                  title: {
                    display: true,
                    text: element.text,
                    fontSize: 14
                  },
                  legend: {
                    display: false
                  }
                }}
              />
            </div>
          ))}
      </div>

      <Collapse bordered={false}>
        <Panel header="Социальный статус" key="1">
          123
        </Panel>
        <Panel header="Прочее" key="2">
          {data.others}
        </Panel>
      </Collapse>
    </Card>
  );
};
