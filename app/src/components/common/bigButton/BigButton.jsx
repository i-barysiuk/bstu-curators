import React from "react";
import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";

export default props => {
  const button = (
    <button
      className={
        style.button + " " + (props.primary ? style.primary : style.secondary)
      }
      onClick={() => {
        if (props.onClick) props.onClick();
      }}
    >
      <FontAwesomeIcon icon={props.icon} />
    </button>
  );
  if (props.dropdown)
    return (
      <Popover placement="bottomRight" content={props.content}>
        {button}
      </Popover>
    );
  else return button;
};
