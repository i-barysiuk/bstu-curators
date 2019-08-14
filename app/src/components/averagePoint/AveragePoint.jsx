import React from "react";
import style from "./style.module.scss";
import Card from "../common/card/Card";
import Color from "../common/color/Color";

class AveragePoint extends React.Component {
  constructor(props) {
    super(props);
    this.data = 7.1;
    this.state = {
      ret: null
    };
  }

  Size(){

    return
  }

  render() {
    const newString = (this.data.toFixed(1)).toString();  
    const position = newString.indexOf(".", 0);
    const integer = newString.slice(0, position);
    const float = newString.slice(position);
    return (
      <Card title="Средний балл">
        <div className={style.conteiner}>
          <Color percentage={this.data / 10} hue0={0} hue1={120}>
            <div className={style.number1} style={{ color: this.state.ret }}>              
              <div className ={style.integer}>{integer} </div>
              <div className = {style.float}>{float}</div>
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
