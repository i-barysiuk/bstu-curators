import React from "react";
import { Line } from "react-chartjs-2";
import Card from "../../common/card/Card";
import BigButton from "../../common/bigButton/BigButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import style from "./style.module.scss";

var labels = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];
var looses = [302, 100, 150, 130, 202, 180, 190, 400, 300, 25, 30, 100];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Пропуски",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: looses
    }
  ]
};

export default props => {
  return (
    <div className={style.container}>
      <Card title="Здоровье" buttons={<BigButton icon={faPlus} primary />}>
        <Line data={data} legend={false} />
      </Card>
    </div>
  );
};
