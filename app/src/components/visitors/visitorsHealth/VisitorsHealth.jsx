import React from "react";
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

export default props => {
  return (
    <div className={style.main}>
      <div className={style.title}>Здоровье</div>
      <div className={style.chart} />
    </div>
  );
};
