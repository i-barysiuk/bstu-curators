import React from "react";
import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSchool,
  faUsers,
  faChild,
  faAtlas,
  faChalkboardTeacher,
  faSnowplow,
  faTableTennis,
  faHeartbeat,
  faTheaterMasks,
  faUserTimes,
  faUserPlus,
  faMeteor,
  faUmbrellaBeach,
  faDraftingCompass,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

export default props=>
{
  const icons = {
    'Аттестация'                    : faDraftingCompass ,
    'Каникулы'                      : faUmbrellaBeach   ,
    'Экзамен'                       : faMeteor          ,
    'Зачисление студента'           : faUserPlus        ,
    'Отчисление студента'           : faUserTimes       ,
    'Культурно-массовое мероприятие': faTheaterMasks    ,
    'Донорство'                     : faHeartbeat       ,
    'Спортивное мероприятие'        : faTableTennis     ,
    'Субботник'                     : faSnowplow        ,
    'Отработка'                     : faChalkboardTeacher,
    'Пересдача экзамена'            : faAtlas           ,
    'Линейка'                       : faChild           ,
    'Собрание'                      : faUsers           ,
    'Кураторский час'               : faSchool          ,
    'Военный праздник'              : faMeteor          ,
  };
  var icon = icons[props.event];
  return ( 
    <div className={style.container} 
        onClick={() => {
        if (props.onClick) props.onClick();
        }}>
        <FontAwesomeIcon icon={icon} className={style.icon} />
        <div className={style.time}>
          <div className={style.clock}>{props.time.hours}:{props.time.mins}</div>
          <div className={style.day}>{props.time.day}  {props.time.month}</div>
        </div>
        <div className={style.info}>
          <div className={style.header}>{props.header}</div>
          <div className={style.subHeader}>{props.subHeader}</div>
        </div>
        <FontAwesomeIcon icon={faChevronRight} className={style.icon} />
    </div>
   );
}


