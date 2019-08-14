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
      time: null,
      respectfulVis: true,
      nonrespectfulVis: true,
      totalVis: true
    };
  }

  onChange = e => {
    this.setState({
      time: e.target.value,
      labels: e.target.value.map(value => {
        return value.period.toString().split(".")[0];
      }),
      respectfulLooses: e.target.value.map(value => {
        return value.respect;
      }),
      nonrespectfulLooses: e.target.value.map(value => {
        return value.nonrespect;
      }),
      totalLooses: e.target.value.map(value => {
        return value.total;
      })
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
    this.setState({
      time: HealthMapService.byWeeks(),
      labels: HealthMapService.byWeeks().map(value => {
        return value.period.toString().split(".")[0];
      }),
      respectfulLooses: HealthMapService.byWeeks().map(value => {
        return value.respect;
      }),
      nonrespectfulLooses: HealthMapService.byWeeks().map(value => {
        return value.nonrespect;
      }),
      totalLooses: HealthMapService.byWeeks().map(value => {
        return value.total;
      })
    });
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
                <Radio.Group
                  onChange={this.onChange}
                  defaultValue={HealthMapService.byWeeks()}
                >
                  <Radio.Button value={HealthMapService.byDays()}>
                    По дням
                  </Radio.Button>
                  <Radio.Button value={HealthMapService.byWeeks()}>
                    По неделям
                  </Radio.Button>
                  <Radio.Button value={HealthMapService.byMonths()}>
                    По месяцам
                  </Radio.Button>
                  <Radio.Button value={HealthMapService.bySems()}>
                    По семестрам
                  </Radio.Button>
                </Radio.Group>
                <p />
                <Checkbox value={0} onChange={this.onCheck}>
                  По уважительной
                </Checkbox>
                <Checkbox value={1} onChange={this.onCheck}>
                  По неуважительной
                </Checkbox>
                <Checkbox value={2} onChange={this.onCheck}>
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
