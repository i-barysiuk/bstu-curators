import React from "react";
import style from "./style.module.scss";
import Card from "../common/card/Card";
import BigButton from "../common/bigButton/BigButton";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Collapse } from "antd";
import { Pie } from "react-chartjs-2";

const { Panel } = Collapse;

export default props => {
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
        <div style={{ width: "50%" }}>
          <Pie
            data={{
              labels: ["Юноши", "Девушки"],

              datasets: [
                {
                  data: [80, 20],
                  backgroundColor: ["#00BFFF", "pink"]
                }
              ]
            }}
            options={{
              title: {
                display: true,
                text: "Гендерный состав",
                fontSize: 14
              },
              legend: {
                display: false
              }
            }}
          />
        </div>
        <div style={{ width: "50%" }}>
          <Pie
            data={{
              labels: ["БРСМ", "ПРОФКОМ", "Белая русь", "Прочая"],

              datasets: [
                {
                  label: "Поинты",
                  data: [80, 20, 30, 25],
                  backgroundColor: ["red", "blue", "yellow", "green"]
                }
              ]
            }}
            options={{
              title: {
                display: true,
                text: "Общественные организации",
                fontSize: 14
              },
              legend: {
                display: false
              }
            }}
          />
        </div>
      </div>
      <div className={style.firstRow}>
        <div style={{ width: "33%" }}>
          <Pie
            data={{
              labels: ["Полная", "Не полная", "Многодетные", "Сироты"],

              datasets: [
                {
                  label: "Поинты",
                  data: [60, 30, 15, 5],
                  backgroundColor: ["red", "blue", "yellow", "green"]
                }
              ]
            }}
            options={{
              title: {
                display: true,
                position: "bottom",
                text: "Состав семьи",
                fontSize: 12
              },
              legend: {
                display: false
              }
            }}
          />
        </div>
        <div style={{ width: "33%" }}>
          <Pie
            data={{
              labels: ["Местный", "Иногородний", "Иностранный"],

              datasets: [
                {
                  label: "Поинты",
                  data: [80, 20, 30],
                  backgroundColor: ["red", "blue", "yellow", "green"]
                }
              ]
            }}
            options={{
              title: {
                display: true,
                position: "bottom",
                text: "География",
                fontSize: 12
              },
              legend: {
                display: false
              }
            }}
          />
        </div>
        <div style={{ width: "33%" }}>
          <Pie
            data={{
              labels: [
                "Родители",
                "Родственники",
                "Самостоятельно",
                "Общежитие"
              ],

              datasets: [
                {
                  label: "Поинты",
                  data: [20, 60, 10, 55],
                  backgroundColor: ["red", "blue", "yellow", "green"]
                }
              ]
            }}
            options={{
              title: {
                display: true,
                position: "bottom",
                text: "Проживание",
                fontSize: 12
              },
              legend: {
                display: false
              }
            }}
          />
        </div>
      </div>

      <Collapse bordered={false}>
        <Panel header="Социальный статус" key="1">
          123
        </Panel>
        <Panel header="Прочее" key="2">
          456
        </Panel>
      </Collapse>
    </Card>
  );
};
