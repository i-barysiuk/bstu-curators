import React from 'react';
import {NavLink} from 'react-router-dom';
import './menu.css';
import Time from './Time';

class Menu extends React.Component 
{ 
  render() 
  {   
    var Home , Groups , Other , Calendar , Raports , Settings;
    if(this.props.location.pathname.indexOf("/home")    != -1) Home = true;
    else  Home = false;
    if(this.props.location.pathname.indexOf("/groups")  != -1) Groups = true;
    else  Groups = false;
    if(this.props.location.pathname.indexOf("/other")   != -1) Other = true;
    else  Other = false;
    if(this.props.location.pathname.indexOf("/calendar")!= -1) Calendar = true;
    else  Calendar = false;
    if(this.props.location.pathname.indexOf("/raports") != -1) Raports = true;
    else  Raports = false;
    if(this.props.location.pathname.indexOf("/settings")!= -1) Settings = true;
    else  Settings = false;
    
    return(
      <div className="container-menu">
        <ul className="ul-menu">
          <li className="li-menu li-menu-1"><NavLink to="/profil"   className="a-menu"  activeClassName="active-menu"><img src="./i/users.svg" className="photo-menu"/><span className="FIO-menu">Фамилия ДлинноеИмя Отчество-Да_винчи</span></NavLink></li>
          <li className="li-menu li-menu-2"><NavLink to="/home"     className="a-menu"  activeClassName="active-menu"><span className={Home     ? "marka-menu":"no-marka-menu"} ></span> <img src="./i/home.svg"    className={Home     ? "Icons-menu-l":"Icons-menu"}/><span className="text-menu"> Главная  </span></NavLink></li>
          <li className="li-menu li-menu-3"><NavLink to="/groups"   className="a-menu"  activeClassName="active-menu"><span className={Groups   ? "marka-menu":"no-marka-menu"} ></span> <img src="./i/users.svg"   className={Groups   ? "Icons-menu-l":"Icons-menu"}/><span className="text-menu"> Группы   </span></NavLink></li>
          <li className="li-menu li-menu-4"><NavLink to="/other"    className="a-menu"  activeClassName="active-menu"><span className={Other    ? "marka-menu":"no-marka-menu"} ></span> <img src="./i/card.svg"    className={Other    ? "Icons-menu-l":"Icons-menu"}/><span className="text-menu"> Прочее   </span></NavLink></li>
          <li className="li-menu li-menu-5"><NavLink to="/calendar" className="a-menu"  activeClassName="active-menu"><span className={Calendar ? "marka-menu":"no-marka-menu"} ></span> <img src="./i/calendar.svg"className={Calendar ? "Icons-menu-l":"Icons-menu"}/><span className="text-menu"> Календарь</span></NavLink></li>
          <li className="li-menu li-menu-6"><NavLink to="/raports"  className="a-menu"  activeClassName="active-menu"><span className={Raports  ? "marka-menu":"no-marka-menu"} ></span> <img src="./i/book.svg"    className={Raports  ? "Icons-menu-l":"Icons-menu"}/><span className="text-menu"> Отчеты   </span></NavLink></li>
          <li className="li-menu li-menu-7"><Time/></li> 
          <li className="li-menu li-menu-8"><NavLink to="/settings" className="a-menu"  activeClassName="active-menu"><span className={Settings ? "marka-menu":"no-marka-menu"} ></span> <img src="./i/cog.svg"     className={Settings ? "Icons-menu-l":"Icons-menu"}/><span className="text-menu">Настройки </span></NavLink></li>
        </ul>
      </div>
    );
  }    
} 

export default Menu;