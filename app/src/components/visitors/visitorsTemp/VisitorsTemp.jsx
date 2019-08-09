import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faThermometerEmpty,
    faThermometerQuarter,
    faThermometerHalf,
    faThermometerThreeQuarters,
    faThermometerFull
} from "@fortawesome/free-solid-svg-icons";
import style from "./style.module.scss";
import ThermChoose from "../VisitorsHelper";

export default props => {
    var icon_choosed = ThermChoose.thermIcon();
    var color_choosed = ThermChoose.color();
    return (
      <div
        className={style.main}
      >
        Наглость
        <div>
            <div>
                {ThermChoose.temp}
            </div>
            <div>
                <FontAwesomeIcon
                    className={style.icons}
                    icon={icon_choosed}
                    color={color_choosed}
                />
            </div>
        </div>
        <div>
            Все пропы
        </div>
      </div>
    );
  };



