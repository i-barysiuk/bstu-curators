import React from "react";
import { Line } from "react-chartjs-2";
import Card from "../common/card/Card";
import BigButton from "../common/bigButton/BigButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Radio, Checkbox } from "antd";
import HealthMapService from "../../services/HealthMapService";

class HealthMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      respectfulLooses: [],
      nonrespectfulLooses: [],
      totalLooses: [],
      time: HealthMapService.byWeeks(),
      respectfulVis: true,
      nonrespectfulVis: true,
      totalVis: true
    };
  }

  onChange = e => {
    this.setState({
      time: e.target.value
    });
    this.setState({
      labels: this.state.time.map(value => {
        return value.period.toString().split(".")[0];
      }),
      respectfulLooses: this.state.time.map(value => {
        return value.respect;
      }),
      nonrespectfulLooses: this.state.time.map(value => {
        return value.nonrespect;
      }),
      totalLooses: this.state.time.map(value => {
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
      time: this.state.time
    });
  }

  render() {
    console.log(this.state.time);
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
                <Radio.Group onChange={this.onChange} defaultValue={0}>
                  <Radio.Button
                    value={HealthMapService.byDays()}
                    onClick={this.onChange}
                  >
                    По дням
                  </Radio.Button>
                  <Radio.Button
                    value={HealthMapService.byWeeks()}
                    onClick={this.onChange}
                  >
                    По неделям
                  </Radio.Button>
                  <Radio.Button
                    value={HealthMapService.byMonths()}
                    onClick={this.onChange}
                  >
                    По месяцам
                  </Radio.Button>
                  <Radio.Button
                    value={HealthMapService.bySems()}
                    onClick={this.onChange}
                  >
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
                showLine: this.state.respectful,
                pointRadius: this.state.respectful,
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
                showLine: this.state.notrespectful,
                pointRadius: this.state.notrespectful,
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
                showLine: this.state.total,
                pointRadius: this.state.total,
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
