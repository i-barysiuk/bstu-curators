import React from "react";
import style from "./style.module.scss";
import Card from "../common/card/Card";

class AveragePoint extends React.Component {
  constructor(props) {
    super(props);
    this.data = 5;
    this.state = {
      ret: null
    };
  }

  Paint() {
    if (this.data >= 8) return this.setState({ ret: "green" });
    if (this.data < 8 && this.data > 6) return this.setState({ ret: "yellow" });
    if (this.data <= 6) return this.setState({ ret: "red" });
  }
  componentDidMount() {
    this.Paint();
  }

  render() {
    return (
      <Card title="Средний балл">
        <div className={style.body}>
          <div className={style.number1} style={{ color: this.state.ret }}>
            {this.data.toFixed(1)}
          </div>
          <hr className={style.h} />
          <div className={style.number2}>10</div>
        </div>
      </Card>
    );
  }
}
export default AveragePoint;
