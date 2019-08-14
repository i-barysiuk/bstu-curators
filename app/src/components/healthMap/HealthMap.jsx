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
    this.changed = true;
    this.state = {
      all: [],
      data: {
        labels: [],
        respectfulLooses: [],
        nonrespectfulLooses: [],
        totalLooses: []
      },
      respectfulVis: true,
      nonrespectfulVis: true,
      totalVis: true
    };
  }

  onChange = e => {
    if (e.target.value === 0)
      this.setState({
        all: HealthMapService.byDays()
      });
    else if (e.target.value === 1)
      this.setState({
        all: HealthMapService.byWeeks()
      });
    else if (e.target.value === 2)
      this.setState({
        all: HealthMapService.byMonths()
      });
    else
      this.setState({
        all: HealthMapService.bySems()
      });
    this.changed = true;
  };

  dataUpdate = () => {
    this.setState({
      data: {
        labels: this.state.all.map(item => {
          return item.period.toString().split(".")[0];
        }),
        respectfulLooses: this.state.all.map(item => {
          return item.respect;
        }),
        nonrespectfulLooses: this.state.all.map(item => {
          return item.nonrespect;
        }),
        totalLooses: this.state.all.map(item => {
          return item.total;
        })
      }
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
      all: HealthMapService.byWeeks()
    });
  }

  componentDidUpdate() {
    if (this.changed === true) this.dataUpdate();
    this.changed = false;
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
                <Radio.Group onChange={this.onChange} defaultValue={1}>
                  <Radio.Button value={0}>По дням</Radio.Button>
                  <Radio.Button value={1}>По неделям</Radio.Button>
                  <Radio.Button value={2}>По месяцам</Radio.Button>
                  <Radio.Button value={3}>По семестрам</Radio.Button>
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
            labels: this.state.data.labels,
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
                data: this.state.data.respectfulLooses
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
                data: this.state.data.nonrespectfulLooses
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
                data: this.state.data.totalLooses
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
