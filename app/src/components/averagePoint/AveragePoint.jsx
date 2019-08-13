import React from "react";
import style from "./style.module.scss";
import Card from "../common/card/Card";
import Color from "../common/color/Color";

class AveragePoint extends React.Component {
  constructor(props) {
    super(props);
    this.data = 5;
    this.state = {
      ret: null
    };
  }

  render() {
    return (
      <Card title="Средний балл">
        <div className={style.body}>
          <Color percentage={this.data / 10} hue0={0} hue1={120}>
            <div className={style.number1} style={{ color: this.state.ret }}>
              {this.data.toFixed(1)}
            </div>
          </Color>
          <hr className={style.h} />
          <div className={style.number2}>10</div>
        </div>
      </Card>
    );
  }
}
export default AveragePoint;
