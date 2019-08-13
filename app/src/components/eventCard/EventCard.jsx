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
  var icons = [
    {id: 'Аттестация'                      , value: faDraftingCompass  },
    {id: 'Каникулы'                        , value: faUmbrellaBeach    },
    {id: 'Экзамен'                         , value: faMeteor           },
    {id: 'Зачисление студента'             , value: faUserPlus         },
    {id: 'Отчисление студента'             , value: faUserTimes        },
    {id: 'Культурно-массовое мероприятие'  , value: faTheaterMasks     },
    {id: 'Донорство'                       , value: faHeartbeat        },
    {id: 'Спортивное мероприятие'          , value: faTableTennis      },
    {id: 'Субботник'                       , value: faSnowplow         },
    {id: 'Отработка'                       , value: faChalkboardTeacher},
    {id: 'Пересдача экзамена'              , value: faAtlas            },
    {id: 'Линейка'                         , value: faChild            },
    {id: 'Собрание'                        , value: faUsers            },
    {id: 'Кураторский час'                 , value: faSchool           },
    {id: 'Военный праздник'                , value: faMeteor           },
   ];
  var icon = icons.find(item => item.id === props.event);
  return ( 
    <div className={style.container} 
        onClick={() => {
        if (props.onClick) props.onClick();
        }}>
        <FontAwesomeIcon icon={icon.value} className={style.icon} />
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
