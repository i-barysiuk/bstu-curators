import React from 'react';
import './style.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';

class Header extends React.Component 
{ 
  render() 
  {  
    return(
      <div class="container-header">
        <ul class="ul-header-l">
          <li class="li-header-button"><FontAwesomeIcon icon={faBars} class="button-header"/></li>
          <li class="li-header"><span class="title-header">BSTU.Кураторы</span></li>
        </ul>
        <ul class="ul-header-r">
          <li class="li-header"><form><input id="find-form-header" type="text" value="Поиск" /></form></li>
          <li class="li-header-button"><FontAwesomeIcon icon={faBell} class="notify-header"/></li>
        </ul>
      </div>
    );
  }    
} 

export default Header;
