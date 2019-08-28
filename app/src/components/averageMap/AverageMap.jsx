import React from "react";
import { Line } from "react-chartjs-2";
import Card from "../common/card/Card";
import BigButton from "../common/bigButton/BigButton";
import { faPlus , faFilter} from "@fortawesome/free-solid-svg-icons";
import { Radio } from "antd";
import HealthMapService from "../../services/HealthMapService";

class AvarageMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      totalLooses: [],
    };
  }

  getData = data => {
    var all = HealthMapService.getData(data),
      label = [],
      respect = [],
      nonrespect = [],
      total = [];
    // eslint-disable-next-line array-callback-return
    all.map(item => {
      label.push(item.period.toString().split(".")[0]);
      respect.push(item.respect);
      nonrespect.push(item.nonrespect);
      total.push(item.total);
    });
    this.setState({
      labels: label,
      respectfulLooses: respect,
      nonrespectfulLooses: nonrespect,
      totalLooses: total
    });
  };

  componentDidMount() {
    this.getData("WEEK");
  }

  render() {
    return (
      <Card
        title="Успеваемость"
        buttons={[
          <BigButton
            icon={faFilter}
            dropdown
            content={
              <div>
                <Radio.Group defaultValue={"WEEK"}>
                  <Radio.Button
                    value={"DAY"}
                    onClick={() => this.getData("DAY")}
                  >
                    По дням
                  </Radio.Button>
                  <Radio.Button
                    value={"WEEK"}
                    onClick={() => this.getData("WEEK")}
                  >
                    По неделям
                  </Radio.Button>
                  <Radio.Button
                    value={"MONTH"}
                    onClick={() => this.getData("MONTH")}
                  >
                    По месяцам
                  </Radio.Button>
                  <Radio.Button
                    value={"SEM"}
                    onClick={() => this.getData("SEM")}
                  >
                    По семестрам
                  </Radio.Button>
                </Radio.Group>
              </div>
            }
          />,
          <BigButton icon={faPlus} primary onClick={this.props.onClick} />
        ]}
      >
        <Line
          data={{
            labels: this.state.labels,
            datasets: [
              {
                label: "Предметы",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                data: this.state.respectfulLooses
              }
            ]
          }}
          legend={{ display: false }}
          height={80}
        />
      </Card>
    );
  }
}

export default AvarageMap;

// var labels = [
//   "01",
//   "02",
//   "03",
//   "04",
//   "05",
//   "06",
//   "07",
//   "08",
//   "09",
//   "10",
//   "11",
//   "12"
// ];
// var marks = [9.3, 6.5, 3.1, 6.4, 5.2, 7.4, 9.6, 5.4, 5.3, 6.7, 3, 7];

