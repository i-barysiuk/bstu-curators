import React from "react";
import style from "./style.module.scss";

export default props => {
  return (
    <div className={style.container}>
      <div>
        <div className={style.header}>{props.title}</div>
        <div className={style.subHeader}>{props.subtitle}</div>
      </div>
      <div>{props.children}</div>
    </div>
  );
};
