import React from 'react';
import {NavLink} from 'react-router-dom';
import './menu.sass';
import Time from '../time/Time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlingBall ,faCalendarAlt, faUsers, faClipboardList, faCog, faHome, faBookOpen } from '@fortawesome/free-solid-svg-icons';

class Menu extends React.Component 
{ 
  render() 
  {   
    var curr = this.props.location.pathname;
    return(
      <div className="container-menu">
        <ul className="ul-menu">
          <li className={curr.indexOf("/profil")   != -1  ? "li-menu li-menu-1 active-menu" : "li-menu li-menu-1"}><NavLink to="/profil"   className="a-menu a-menu-1" ><span className={curr.indexOf("/profil")   != -1  ? "label-menu":"no-label-menu"} ></span> <FontAwesomeIcon icon={faBowlingBall}          className="photo-menu"/><span className="FIO-menu">Фамилия Имя Отчество</span><span className="invisibility-cloak-menu"></span></NavLink></li>
          <li className={curr.indexOf("/home")     != -1  ? "li-menu li-menu-2 active-menu" : "li-menu li-menu-2"}><NavLink to="/home"     className="a-menu a-menu-2" ><span className={curr.indexOf("/home")     != -1  ? "label-menu":"no-label-menu"} ></span> <FontAwesomeIcon icon={faHome}           className="Icons-menu"/><span className="text-menu"> Главная  </span><span className="invisibility-cloak-menu"></span></NavLink></li>
          <li className={curr.indexOf("/groups")   != -1  ? "li-menu li-menu-3 active-menu" : "li-menu li-menu-3"}><NavLink to="/groups"   className="a-menu a-menu-3" ><span className={curr.indexOf("/groups")   != -1  ? "label-menu":"no-label-menu"} ></span> <FontAwesomeIcon icon={faUsers}          className="Icons-menu"/><span className="text-menu"> Группы   </span><span className="invisibility-cloak-menu"></span></NavLink></li>
          <li className={curr.indexOf("/other")    != -1  ? "li-menu li-menu-4 active-menu" : "li-menu li-menu-4"}><NavLink to="/other"    className="a-menu a-menu-4" ><span className={curr.indexOf("/other")    != -1  ? "label-menu":"no-label-menu"} ></span> <FontAwesomeIcon icon={faBookOpen}       className="Icons-menu"/><span className="text-menu"> Прочее   </span><span className="invisibility-cloak-menu"></span></NavLink></li>
          <li className={curr.indexOf("/calendar") != -1  ? "li-menu li-menu-5 active-menu" : "li-menu li-menu-5"}><NavLink to="/calendar" className="a-menu a-menu-5" ><span className={curr.indexOf("/calendar") != -1  ? "label-menu":"no-label-menu"} ></span> <FontAwesomeIcon icon={faCalendarAlt}    className="Icons-menu"/><span className="text-menu"> Календарь</span><span className="invisibility-cloak-menu"></span></NavLink></li>
          <li className={curr.indexOf("/reports")  != -1  ? "li-menu li-menu-6 active-menu" : "li-menu li-menu-6"}><NavLink to="/reports"  className="a-menu a-menu-6" ><span className={curr.indexOf("/reports")  != -1  ? "label-menu":"no-label-menu"} ></span> <FontAwesomeIcon icon={faClipboardList}  className="Icons-menu"/><span className="text-menu"> Отчеты   </span><span className="invisibility-cloak-menu"></span></NavLink></li>  
        </ul> 
        <ul className="ul-menu">  
          <li className={curr.indexOf("/settings") != -1  ? "li-menu li-menu-8 active-menu" : "li-menu li-menu-8"}><NavLink to="/settings" className="a-menu a-menu-8" ><span className={curr.indexOf("/settings") != -1  ? "label-menu":"no-label-menu"} ></span> <FontAwesomeIcon icon={faCog}            className="Icons-menu"/><span className="text-menu"> Настройки</span><span className="invisibility-cloak-menu"></span></NavLink></li>
          <li className="li-menu li-menu-7"><Time/></li>
        </ul>
      </div>
    );
  }    
} 

export default Menu;
