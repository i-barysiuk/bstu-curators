import React from "react";
import style from "./style.module.scss";

export default props => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.title}>{props.title}</div>
        <div>{props.buttons}</div>
      </div>
      <div className={style.content}>{props.children}</div>
    </div>
  );
};
