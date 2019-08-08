import React from "react";
import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faPencilAlt,
  faUsers,
  faArchive
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarLine } from "@fortawesome/free-regular-svg-icons";
import { toRomane } from "../../helper";

export default props => {
  return (
    <div
      className={style.main}
      onClick={() => {
        if (props.onClick) props.onClick();
      }}
    >
      <div>
        <FontAwesomeIcon
          className={style.icons}
          icon={props.favorite ? faStar : faStarLine}
          onClick={e => {
            if (props.onStarClick) props.onStarClick();
            e.stopPropagation();
          }}
        />
        {props.group}
        <span>&nbsp;- {toRomane(props.kurs)}</span>
      </div>
      <div>
        <FontAwesomeIcon
          className={style.icons}
          icon={faPencilAlt}
          onClick={e => {
            if (props.onEditClick) props.onEditClick();
            e.stopPropagation();
          }}
        />
        <FontAwesomeIcon
          className={style.icons}
          icon={faUsers}
          onClick={e => {
            if (props.onStudentsClick) props.onStudentsClick();
            e.stopPropagation();
          }}
        />
        <FontAwesomeIcon
          className={style.icons}
          icon={faArchive}
          onClick={e => {
            if (props.onArchiveClick) props.onArchiveClick();
            e.stopPropagation();
          }}
        />
      </div>
    </div>
  );
};
