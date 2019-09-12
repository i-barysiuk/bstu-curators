import React from "react";
import style from "./style.module.scss";

export default ({ title, buttons, children, contentCenter }) => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.title}>{title}</div>
        <div>{buttons}</div>
      </div>
      <div className={contentCenter ? style.content : ""}>{children}</div>
    </div>
  );
};
