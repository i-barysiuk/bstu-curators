import React from "react";
import { Line } from "react-chartjs-2";
import Card from "../common/card/Card";
import BigButton from "../common/bigButton/BigButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Checkbox } from "antd";

const labels = [
  [
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
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31"
  ], //Days
  ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"], //Weeks
  ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"], //Months
  ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"] //Sems
];

const looses = [
  [
    [
      //Hurts
      0,
      100,
      150,
      130,
      0,
      180,
      190,
      400,
      0,
      25
    ], //Days
    [100, 0, 150, 130, 202, 180, 190, 400, 300, 25], //Weeks
    [200, 921, 231, 832, 128, 532, 216, 374, 146, 635], //Months
    [300, 236, 2984, 9847, 4758, 3458, 2346, 5679, 2346, 883]
  ], //Sems
  [
    [
      //Respectful
      302,
      100,
      150,
      300,
      202,
      180,
      190,
      400,
      300,
      25
    ], //Days
    [302, 150, 150, 130, 202, 180, 190, 400, 300, 25], //Weeks
    [102, 921, 231, 832, 128, 532, 216, 374, 146, 635], //Months
    [2587, 2386, 2984, 987, 4758, 3458, 2346, 569, 2346, 8583]
  ], //Sems
  [
    [
      //Not respectful
      302,
      100,
      150,
      130,
      202,
      180,
      190,
      400,
      300,
      150
    ], //Days
    [302, 300, 150, 130, 202, 180, 190, 400, 300, 25], //Weeks
    [102, 921, 2310, 832, 128, 532, 216, 374, 1460, 635], //Months
    [2587, 286, 2984, 9847, 4758, 3458, 2346, 569, 2346, 8583]
  ], //Sems
  [
    [
      //Not respectful
      909,
      606,
      112,
      2346,
      2245,
      326,
      873,
      800,
      900,
      850
    ], //Days
    [502, 600, 450, 330, 502, 680, 490, 800, 600, 625], //Weeks
    [1102, 1921, 3310, 1832, 1128, 1532, 1216, 1374, 2460, 1635], //Months
    [12587, 1286, 12984, 19847, 14758, 13458, 12346, 1569, 12346, 18583]
  ]
];

//looses[0][0] - hurts days
//looses[0][1] - hurts weeks
//looses[0][2] - hurts months
//looses[0][3] - hurts sems
//looses[1][0] - respectful days
//looses[1][1] - respectful weeks
//looses[1][2] - respectful months
//looses[1][3] - respectful sems
//looses[2][0] - notrespectful days
//looses[2][1] - notrespectful weeks
//looses[2][2] - notrespectful months
//looses[2][3] - notrespectful sems
class HealthMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choosed: null,
      hurts: null,
      respectful: null,
      notrespectful: null,
      all: null
    };
  }

  onChange = e => {
    if (e.target.value === "a") this.setState({ choosed: 0 });
    else if (e.target.value === "b") this.setState({ choosed: 1 });
    else if (e.target.value === "c") this.setState({ choosed: 2 });
    else this.setState({ choosed: 3 });
  };

  onCheck = e => {
    if (e.target.value === "a") this.setState({ hurts: e.target.checked });
    else if (e.target.value === "b")
      this.setState({ respectful: e.target.checked });
    else if (e.target.value === "c")
      this.setState({ notrespectful: e.target.checked });
    else this.setState({ all: e.target.checked });
  };

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
                <Button value="a" onClick={this.onChange}>
                  По дням
                </Button>
                <Button value="b" onClick={this.onChange}>
                  По неделям
                </Button>
                <Button value="c" onClick={this.onChange}>
                  По месяцам
                </Button>
                <Button value="d" onClick={this.onChange}>
                  По семестрам
                </Button>
                <p />
                <Checkbox
                  disabled={this.state.choosed === null}
                  value="a"
                  onChange={this.onCheck}
                >
                  По болезни
                </Checkbox>
                <Checkbox
                  disabled={this.state.choosed === null}
                  value="b"
                  onChange={this.onCheck}
                >
                  По уважительной
                </Checkbox>
                <Checkbox
                  disabled={this.state.choosed === null}
                  value="c"
                  onChange={this.onCheck}
                >
                  По неуважительной
                </Checkbox>
                <Checkbox
                  disabled={this.state.choosed === null}
                  value="d"
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
            labels: labels[this.state.choosed],
            datasets: [
              {
                label: "По болезни",
                showLine: this.state.hurts,
                pointRadius: this.state.hurts,
                pointHitRadius: 10,
                fill: false,
                lineTension: 0.1,
                borderColor: "blue",
                borderCapStyle: "butt",
                borderJoinStyle: "miter",
                data: looses[0][this.state.choosed]
              },
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
                data: looses[1][this.state.choosed]
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
                data: looses[2][this.state.choosed]
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
                data: looses[3][this.state.choosed]
              }
            ]
          }}
          legend={{ display: false }}
          height={80}
        />
      </Card>
    );
  }

  componentDidMount() {
    this.setState({
      choosed: this.state.choosed
    });
  }
}

export default HealthMap;
