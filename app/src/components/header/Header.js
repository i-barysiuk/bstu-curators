import React from "react";
import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className={style.container}>
      <div>
        <FontAwesomeIcon icon={faBars} className={style.buttonHeader} />
        <span className={style.title}>BSTU.Кураторы</span>{" "}
      </div>
      <div>
        <input
          className={style.findFormHeader}
          type="text"
          placeholder="Поиск"
        />
        <FontAwesomeIcon icon={faBell} className={style.notifyHeader} />
      </div>
    </div>
  );
};

export default Header;
