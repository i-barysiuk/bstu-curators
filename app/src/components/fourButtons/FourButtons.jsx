import React from "react";
import style from "./style.module.scss";
import { Button , Row , Col} from "antd";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faUsers,
  faCalendarAlt,
  faIdCard
} from "@fortawesome/free-solid-svg-icons";

function FourButtons()  {
    return (
        <div className={style.container} >
          <Row gutter={100} className={style.firstRow}>
            <Col span={12}>
              <NavLink to="/dashboard/groups">
                <Button 
                type="primary" 
                className={style.butt}>
                  <FontAwesomeIcon icon={faUsers} className={style.icons} />  
                </Button>
              </NavLink>
            </Col>
            <Col span={12}>
              <NavLink to="/dashboard/students">
                <Button 
                type="primary" 
                className={style.butt}>
                  <FontAwesomeIcon icon={faIdCard} className={style.icons} />    
                </Button>
              </NavLink>
            </Col>
          </Row>
          
          <Row gutter={100}>
            <Col span={12}>
              <NavLink to="/dashboard/events">
                <Button 
                type="primary" 
                className={style.butt}>
                  <FontAwesomeIcon icon={faCalendarAlt} className={style.icons} />  
                </Button>
              </NavLink>
            </Col>
            <Col span={12}>
              <NavLink to="/dashboard/reports">
                <Button 
                type="primary" 
                className={style.butt}>
                  <FontAwesomeIcon icon={faFileAlt} className={style.icons} />  
                </Button>
              </NavLink>
            </Col>
          </Row>
        </div>
    );
}

export default FourButtons;