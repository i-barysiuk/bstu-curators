import React from "react";
import style from "./style.module.scss";
import EventCard from "../eventCard/EventCard";
import Card from "../common/card/Card";
import BigButton from "../common/bigButton/BigButton";
import { faPlus, faFilter } from "@fortawesome/free-solid-svg-icons";
import "moment/locale/ru";
const moment = require("moment");

var data = [
  {
    id: "1",
    title: "Аттестация 1",
    subTitle: " Первая аттестация",
    icon: "Аттестация",
    utc: "2019-9-22 12:20"
  },
  {
    id: "2",
    title: "Аттестация 2",
    subTitle: " Вторая аттестация",
    icon: "Аттестация",
    utc: "2019-9-23 16:40"
  },
  {
    id: "3",
    title: "Донорство",
    subTitle: "Мне не жалко)",
    icon: "Донорство",
    utc: "2019-9-26 15:00"
  },
  {
    id: "4",
    title: "Зачисление студента",
    subTitle: "Добро пожаловать",
    icon: "Зачисление студента",
    utc: "2019-10-2 12:30"
  }
];

function EventList(props) {
  return (
    <Card
      title={"События"}
      buttons={[
        <BigButton icon={faFilter} onClick={props.onClick} />,
        <BigButton icon={faPlus} primary onClick={props.onClick} />
      ]}
      contentCenter
    >
      <div className={style.cards}>
        {data.map((item, index) => {
          var utc = moment(item.utc);
          return (
            <div className={style.item} key={item.id}>
              {index === 0 ||
                (utc.format("M") !==
                  moment(data[index - 1].utc).format("M") && (
                  <div className={style.month}> {utc.format("MMMM")} </div>
                ))}
              <EventCard
                event={item.icon}
                title={item.title}
                subTitle={item.subTitle}
                utc={item.utc}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default EventList;
