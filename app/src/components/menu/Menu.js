import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";
import style from "./style.module.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faFileAlt,
  faSearch,
  faUsers,
  faBell,
  faIdCard
} from "@fortawesome/free-solid-svg-icons";

import logoK from "../../assets/images/logos/curators.png";
import { Popover, Badge, Avatar, Button } from "antd";

class Menu extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <div className={style.upMenu}>
          <NavLink to="/dashboard">
            <img src={logoK} className={style.logo} alt="logo" />
          </NavLink>
        </div>
        <div className={style.middleMenu}>
          <NavLink
            to="/dashboard/groups"
            className={style.button}
            activeClassName={style.buttonActive}
          >
            <FontAwesomeIcon icon={faUsers} className={style.icon} />
          </NavLink>
          <NavLink
            to="/dashboard/students"
            className={style.button}
            activeClassName={style.buttonActive}
          >
            <FontAwesomeIcon icon={faIdCard} className={style.icon} />
          </NavLink>
          <NavLink
            to="/dashboard/reports"
            className={style.button}
            activeClassName={style.buttonActive}
          >
            <FontAwesomeIcon icon={faFileAlt} className={style.icon} />
          </NavLink>
          <NavLink
            to="/dashboard/events"
            className={style.button}
            activeClassName={style.buttonActive}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className={style.icon} />
          </NavLink>
          <NavLink
            to="/dashboard/search"
            className={style.button}
            activeClassName={style.buttonActive}
          >
            <FontAwesomeIcon icon={faSearch} className={style.icon} />
          </NavLink>
        </div>

        <div className={style.downMenu}>
          <Popover
            placement="rightBottom"
            trigger="click"
            content="button"
            title="Title"
          >
            <Badge count={1} dot>
              <FontAwesomeIcon icon={faBell} className={style.bell} />
            </Badge>
          </Popover>
          <Popover
            placement="rightBottom"
            trigger="click"
            content={<Button onClick={() => this.props.logout()}>Выход</Button>}
            title="Title"
          >
            <Avatar icon="user" className={style.avatar} />
          </Popover>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
