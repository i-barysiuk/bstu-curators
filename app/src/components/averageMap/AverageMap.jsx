import React from "react";
import { Line } from "react-chartjs-2";
import Card from "../common/card/Card";
import BigButton from "../common/bigButton/BigButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import style from "./style.module.scss";

var labels = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
];
var marks = [9.3, 6.5, 3.1, 6.4, 5.2, 7.4, 9.6, 5.4, 5.3, 6.7, 3, 7];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Предметы",
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
      data: marks
    }
  ]
};

export default props => {
  return (
    <Card title="Успеваемость" buttons={<BigButton icon={faPlus} primary />}>
      <Line data={data} legend={false} height={80} />
    </Card>
  );
};
