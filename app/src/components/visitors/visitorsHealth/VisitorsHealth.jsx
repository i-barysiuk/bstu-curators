import React from "react";
import { Line } from "react-chartjs-2";
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
    <div className={style.main}>
      <div className={style.title}>Здоровье</div>
      <div className={style.charts}>
        <Line
          data={data}
          width={380}
          height={150}
          className={style.chart}
          legend={false}
        />
      </div>
    </div>
  );
};
