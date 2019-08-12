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

class EventCard extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {icon : null};
  }

  newState()
  {
      switch(this.props.icon)
      {
        case 'Аттестация':
            this.setState( {icon: faDraftingCompass});
              break;
        case 'Каникулы':
            this.setState( {icon: faUmbrellaBeach});
              break;
        case 'Экзамен':
            this.setState( {icon: faMeteor});
              break;
        case 'Военный праздник':
            this.setState( {icon: faMeteor});
              break;
        case 'Зачисление студента':
            this.setState( {icon: faUserPlus});
              break;
        case 'Отчисление студента':
            this.setState( {icon: faUserTimes});
              break; 
        case 'Культурно-массовое мероприятие':
            this.setState( {icon: faTheaterMasks});
              break; 
        case 'Донорство':
            this.setState( {icon: faHeartbeat});
              break;
        case 'Спортивное мероприятие':
            this.setState( {icon: faTableTennis});
              break;  
        case 'Субботник':
            this.setState( {icon:  faSnowplow});
              break;
        case 'Отработка':
            this.setState( {icon: faChalkboardTeacher});
              break; 
        case 'Пересдача экзамена':
            this.setState( {icon: faAtlas});
              break; 
        case 'Линейка':
            this.setState( {icon: faChild});
              break; 
        case 'Собрание':
            this.setState( {icon: faUsers});
              break; 
        case 'Кураторский час':
            this.setState( {icon: faSchool});
              break;                  
        default:  
            this.setState( {icon:  faSchool});
          break;
    }
  }

  componentDidMount() 
  {
    this.newState();
  }

  render()
  {
    return ( 
      <div className={style.container} 
          onClick={() => {
          if (this.props.onClick) this.props.onClick();
          }}>
          <FontAwesomeIcon icon={this.state.icon} className={style.icon} />
          <div className={style.time}>
            <div className={style.clock}>{this.props.time.hours}:{this.props.time.mins}</div>
            <div className={style.day}>{this.props.time.day}  {this.props.time.month}</div>
          </div>
          <div className={style.info}>
            <div className={style.header}>{this.props.header}</div>
            <div className={style.subHeader}>{this.props.subHeader}</div>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className={style.icon} />
      </div>
     );
  }
}

export default EventCard;