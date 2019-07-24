import React from "react";
import style from "./style.module.scss";
import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt , faFileAlt  , faSearch , faUsers , faBell , faIdCard} from "@fortawesome/free-solid-svg-icons";
import logoK from '../../assets/img/logo_k.png';
import { Popover,  Badge , Avatar} from 'antd';

class Menu extends React.Component 
{
    state = {
        count: 5,
        show: true,
      };
    
    render() {
        return (
        <div className={style.container}>
            <div className={style.upMenu}>
                <NavLink to="/dashboard">
                    <img src={logoK} className={style.logo}></img>
                </NavLink>
            </div>
            <div className={style.middleMenu}>
                    <NavLink to="/dashboard/groups" className={style.button}>
                         <FontAwesomeIcon icon={faUsers} className={style.icon} />   
                    </NavLink>
                    <NavLink to="/dashboard/students" className={style.button}>
                         <FontAwesomeIcon icon={faIdCard} className={style.icon} />
                    </NavLink>    
                    <NavLink to="/dashboard/reports" className={style.button}>
                         <FontAwesomeIcon icon={faFileAlt}   className={style.icon} />
                    </NavLink>    
                    <NavLink to="/dashboard/events" className={style.button}>
                         <FontAwesomeIcon  icon={faCalendarAlt} className={style.icon} />
                    </NavLink>    
                    <NavLink to="/search" className={style.button}>
                         <FontAwesomeIcon  icon={faSearch}    className={style.icon} />
                    </NavLink>    
            </div> 

            <div className={style.downMenu}>
                <Popover placement="rightBottom" trigger="click" content="button" title="Title">
                    <Badge count={this.state.count} dot> 
                        <FontAwesomeIcon icon={faBell}      className={style.bell  } /> 
                    </Badge>    
                </Popover>    
                <Popover placement="rightBottom" trigger="click" content="button" title="Title">
                    <Avatar icon="user" className={style.avatar}></Avatar>  
                </Popover>      
            </div>  
        </div>
        );
      }
}    

export default Menu;