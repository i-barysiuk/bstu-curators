import React from "react";
//import { connect } from "react-redux";

import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare
} from "@fortawesome/free-solid-svg-icons";
import { Input, Menu, Button, Icon } from "antd";

const { SubMenu } = Menu;

class GroupCard extends React.Component 
{
  rootSubmenuKeys = ['sub1', 'sub2','sub3', 'sub4'];

  state = {
    openKeys: ['sub1'],
  }

      onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
      };
  render()
  {
      return(
      <div className={style.container}>
            <div className={style.addAndGroups}>
              <div className={style.grp}>Группы</div> 
               <FontAwesomeIcon icon={faPlusSquare} className={style.plus}/>
              </div>
            <Input prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Найти группу" className={style.input} />
      <Menu className={style.menuAnt}
        inlineIndent={15}
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: 250 }}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="star" theme="filled" />
              <span>Избранное</span>
            </span>
          }
        >
          <Menu.Item key="1">test 1</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span >
              <Icon type="heart" theme="filled"/>
              <span>Мои группы</span>
            </span>
          }
        >
          <Menu.Item key="9">test 2</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="bank" theme="filled" />
              <span>Все группы</span>
            </span>
          }
        >
          <Menu.Item key="1">test 3</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="switcher" theme="filled"  />
              <span>Архив</span>
            </span>
          }
        >
          <Menu.Item key="1">test 4</Menu.Item>
        </SubMenu>
      </Menu>
      </div>
    );
  }
}

export default GroupCard;