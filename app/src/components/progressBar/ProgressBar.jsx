import React from "react";
import style from "./style.module.scss";

export default props => {
  const Filler = (
    <div className={style.filler} style={{ width: `${props.percentage}%` }} />
  );

  const Progress = (
    <div className={style.progressBar}>
      <Filler percentage={props.percentage} />
    </div>
  );
  return Progress;
};
