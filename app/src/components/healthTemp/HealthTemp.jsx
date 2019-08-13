import React from "react";
import Card from "../common/card/Card";
import Color from "../common/color/Color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerEmpty,
  faThermometerQuarter,
  faThermometerHalf,
  faThermometerThreeQuarters,
  faThermometerFull
} from "@fortawesome/free-solid-svg-icons";
import style from "./style.module.scss";

var not_respectful = 10;
var respectful = 30;
var all = 1000;
var percent = (not_respectful + respectful * 0.5) / all;

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
    <Card title="Наглость">
      <Color percentage={1 - percent} hue0={0} hue1={120}>
        <div className={style.fblock}>
          <div className={style.temp}>{temp()}</div>
          <div className={style.thermometer}>
            <FontAwesomeIcon
              className={style.icons}
              icon={thermIcon()}
              size={"3x"}
            />
          </div>
        </div>
      </Color>
      <div className={style.sblock}>
        <div className={style.count}>
          {respectful}/{not_respectful}/{all}
        </div>
        <div className={style.expl}>Уважительно/Неуважительно/Всего</div>
      </div>
    </Card>
  );
};
