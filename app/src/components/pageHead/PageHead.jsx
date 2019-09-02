import React from "react";
import style from "./style.module.scss";

export default props => {
  return (
    <div className={style.container}>
      <div>
        <div className={style.header}>
          {props.title}
          {props.course && <span className={style.course}>{props.course}</span>}
        </div>
        <div className={style.subHeader}>{props.subtitle}</div>
      </div>
      <div>{props.children}</div>
    </div>
  );
};
