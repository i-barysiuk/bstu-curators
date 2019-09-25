import React from "react";
import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import iconConfig from "../../const/iconConfig";
import "moment/locale/ru";
const moment = require("moment");

export default props => {
  var icon = iconConfig[props.event];
  return (
    <div
      className={style.container}
      onClick={() => {
        if (props.onClick) props.onClick();
      }}
    >
      <FontAwesomeIcon icon={icon} className={style.icon} />
      <div className={style.date}>
        <div className={style.time}>
          <div className={style.clock}>{moment(props.utc).format("HH:mm")}</div>
          <div className={style.day}>{moment(props.utc).format("D MMM")}</div>
        </div>
        <div>–</div>
        <div className={style.time}>
          <div className={style.clock}>
            {moment(props.utcEnd).format("HH:mm")}
          </div>
          <div className={style.day}>
            {moment(props.utcEnd).format("D MMM")}
          </div>
        </div>
      </div>
      <div className={style.info}>
        <div className={style.header}>{props.title}</div>
        <div className={style.subHeader}>{props.subTitle}</div>
      </div>
      <FontAwesomeIcon icon={faChevronRight} className={style.icon} />
    </div>
  );
};
