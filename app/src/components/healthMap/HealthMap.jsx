import React from "react";
import { Line } from "react-chartjs-2";
import Card from "../common/card/Card";
import BigButton from "../common/bigButton/BigButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Radio, Checkbox, Button } from "antd";
import HealthMapService from "../../services/HealthMapService";

class HealthMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      respectfulLooses: [],
      nonrespectfulLooses: [],
      totalLooses: [],
      respectfulVis: true,
      nonrespectfulVis: true,
      totalVis: true
    };
  }

  getData = data => {
    var all = HealthMapService.getData(data),
      label = [],
      respect = [],
      nonrespect = [],
      total = [];
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

  onCheck = e => {
    if (e.target.value === 0)
      this.setState({ respectfulVis: e.target.checked });
    else if (e.target.value === 1)
      this.setState({ nonrespectfulVis: e.target.checked });
    else this.setState({ totalVis: e.target.checked });
  };

  componentDidMount() {
    this.getData("WEEK");
  }

  render() {
    return (
      <Card
        title="Здоровье"
        buttons={
          <BigButton
            icon={faPlus}
            primary
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
                <p />
                <Checkbox
                  value={0}
                  onChange={this.onCheck}
                  defaultChecked={true}
                >
                  По уважительной
                </Checkbox>
                <Checkbox
                  value={1}
                  onChange={this.onCheck}
                  defaultChecked={true}
                >
                  По неуважительной
                </Checkbox>
                <Checkbox
                  value={2}
                  onChange={this.onCheck}
                  defaultChecked={true}
                >
                  Всего
                </Checkbox>
              </div>
            }
          />
        }
      >
        <Line
          data={{
            labels: this.state.labels,
            datasets: [
              {
                label: "По уважительной",
                showLine: this.state.respectfulVis,
                pointRadius: this.state.respectfulVis,
                pointHitRadius: 10,
                fill: false,
                lineTension: 0.1,
                borderColor: "green",
                borderCapStyle: "butt",
                borderJoinStyle: "miter",
                data: this.state.respectfulLooses
              },
              {
                label: "По неуважительной",
                showLine: this.state.nonrespectfulVis,
                pointRadius: this.state.nonrespectfulVis,
                pointHitRadius: 10,
                fill: false,
                lineTension: 0.1,
                borderColor: "red",
                borderCapStyle: "butt",
                borderJoinStyle: "miter",
                data: this.state.nonrespectfulLooses
              },
              {
                label: "Всего",
                showLine: this.state.totalVis,
                pointRadius: this.state.totalVis,
                pointHitRadius: 10,
                fill: false,
                lineTension: 0.1,
                borderColor: "orange",
                borderCapStyle: "butt",
                borderJoinStyle: "miter",
                data: this.state.totalLooses
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

export default HealthMap;
