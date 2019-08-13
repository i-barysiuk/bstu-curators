import React from "react";
import { Line } from "react-chartjs-2";
import Card from "../common/card/Card";
import BigButton from "../common/bigButton/BigButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Radio, Checkbox } from "antd";
import HealthMapService from "../../services/HealthMapService";

var data = HealthMapService.getLooses();
var labels = [];
var looses = [[], [], [], []];

labels[0] = data.byDays.map(index => {
  return index.period.split(".")[0];
});
labels[1] = data.byWeeks.map(index => {
  return index.period.toString();
});
labels[2] = data.byMonths.map(index => {
  return index.period.toString();
});
labels[3] = data.bySems.map(index => {
  return index.period.toString();
});

looses[0][0] = data.byDays.map(index => {
  return index.respect;
});
looses[0][1] = data.byDays.map(index => {
  return index.nonrespect;
});
looses[0][2] = data.byDays.map(index => {
  return index.total;
});

looses[1][0] = data.byWeeks.map(index => {
  return index.respect;
});
looses[1][1] = data.byWeeks.map(index => {
  return index.nonrespect;
});
looses[1][2] = data.byWeeks.map(index => {
  return index.total;
});

looses[2][0] = data.byMonths.map(index => {
  return index.respect;
});
looses[2][1] = data.byMonths.map(index => {
  return index.nonrespect;
});
looses[2][2] = data.byMonths.map(index => {
  return index.total;
});

looses[3][0] = data.bySems.map(index => {
  return index.respect;
});
looses[3][1] = data.bySems.map(index => {
  return index.nonrespect;
});
looses[3][2] = data.bySems.map(index => {
  return index.total;
});

class HealthMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choosed: null,
      respectful: null,
      notrespectful: null,
      all: true
    };
  }

  onChange = e => {
    if (e.target.value === 0) this.setState({ choosed: e.target.value });
    else if (e.target.value === 1) this.setState({ choosed: e.target.value });
    else if (e.target.value === 2) this.setState({ choosed: e.target.value });
    else this.setState({ choosed: e.target.value });
  };

  onCheck = e => {
    if (e.target.value === 0) this.setState({ respectful: e.target.checked });
    else if (e.target.value === 1)
      this.setState({ notrespectful: e.target.checked });
    else this.setState({ all: e.target.checked });
  };

  render() {
    console.log(this.state.choosed);
    console.log(looses[0][1]);
    console.log(looses[1][1]);
    console.log(looses[2][1]);
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
                  <Radio.Button value={0} onClick={this.onChange}>
                    По дням
                  </Radio.Button>
                  <Radio.Button value={1} onClick={this.onChange}>
                    По неделям
                  </Radio.Button>
                  <Radio.Button value={2} onClick={this.onChange}>
                    По месяцам
                  </Radio.Button>
                  <Radio.Button value={3} onClick={this.onChange}>
                    По семестрам
                  </Radio.Button>
                </Radio.Group>
                <p />
                <Checkbox
                  disabled={this.state.choosed === null}
                  value={0}
                  onChange={this.onCheck}
                >
                  По уважительной
                </Checkbox>
                <Checkbox
                  disabled={this.state.choosed === null}
                  value={1}
                  onChange={this.onCheck}
                >
                  По неуважительной
                </Checkbox>
                <Checkbox
                  disabled={this.state.choosed === null}
                  value={2}
                  onChange={this.onCheck}
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
            labels:
              labels[this.state.choosed === null ? 1 : this.state.choosed],
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
                data:
                  this.state.choosed === null
                    ? Array.from({ length: 40 }, () =>
                        Math.floor(Math.random() * 40)
                      )
                    : looses[this.state.choosed][0]
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
                data:
                  this.state.choosed === null
                    ? Array.from({ length: 40 }, () =>
                        Math.floor(Math.random() * 40)
                      )
                    : looses[this.state.choosed][1]
              },
              {
                label: "Всего",
                showLine: this.state.all,
                pointRadius: this.state.all,
                pointHitRadius: 10,
                fill: false,
                lineTension: 0.1,
                borderColor: "orange",
                borderCapStyle: "butt",
                borderJoinStyle: "miter",
                data:
                  this.state.choosed === null
                    ? Array.from({ length: 40 }, () =>
                        Math.floor(Math.random() * 40)
                      )
                    : looses[this.state.choosed][2]
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
