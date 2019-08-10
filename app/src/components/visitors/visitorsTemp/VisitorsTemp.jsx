import React from "react";
import Card from "../../common/card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerEmpty,
  faThermometerQuarter,
  faThermometerHalf,
  faThermometerThreeQuarters,
  faThermometerFull
} from "@fortawesome/free-solid-svg-icons";
import style from "./style.module.scss";

var not_respectful = 308;
var respectful = 200;
var all = 1000;
var percent = (not_respectful + respectful * 0.5) / all;

var color = function() {
  var ret = "green";
  if (percent <= 1) ret = "red";
  if (percent <= 0.66) ret = "orange";
  if (percent <= 0.33) ret = "green";
  return ret;
};

var inlineStyle = {
  color: color()
};

var temp = function() {
  return (percent * 4.4 + 36.6).toFixed(1);
};

var thermIcon = function() {
  var ret = faThermometerEmpty;
  if (percent <= 1) ret = faThermometerFull;
  if (percent <= 0.8) ret = faThermometerThreeQuarters;
  if (percent <= 0.6) ret = faThermometerHalf;
  if (percent <= 0.4) ret = faThermometerQuarter;
  if (percent <= 0.2) ret = faThermometerEmpty;
  return ret;
};

export default props => {
  return (
    <div className={style.container}>
      <Card title="Наглость">
        <p />
        <div className={style.fblock}>
          <div className={style.temp} style={inlineStyle}>
            {temp()}
          </div>
          <div className={style.thermometer}>
            <FontAwesomeIcon
              className={style.icons}
              icon={thermIcon()}
              color={color()}
              size={"3x"}
            />
          </div>
        </div>
        <p />
        <div className={style.sblock}>
          <div className={style.count}>
            {respectful}/{not_respectful}/{all}
          </div>
          <div className={style.expl}>Уважительно/Неуважительно/Всего</div>
        </div>
      </Card>
    </div>
  );
};
