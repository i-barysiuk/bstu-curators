import React from "react";
import style from "./style.module.scss";
import BigButton from "../common/bigButton/BigButton";
import GroupsCard from "../groupItem/GroupItem";
import {
  faPlus,
  faStar,
  faHeart,
  faUniversity,
  faArchive
} from "@fortawesome/free-solid-svg-icons";
import { Input, Icon } from "antd";
import Collapse from "../common/collapse/Collapse";

class GroupCard extends React.Component {
  onGroupClick = id => this.props.history.push(`/dashboard/groups/${id}`);

  render() {
    const {
      groups: { favorite, my, all, archive },
      fetchAll,
      fetchArchive
    } = this.props;
    return (
      <div className={style.container}>
        <div className={style.head}>
          <div className={style.headerRow}>
            <span className={style.header}>Группы</span>
            <BigButton icon={faPlus} primary />
          </div>

          <Input
            prefix={<Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Найти группу"
            className={style.input}
          />
        </div>
        <div className={style.content}>
          <Collapse icon={faStar} title="Избранное" show>
            {favorite.map(group => (
              <GroupsCard
                key={group.id}
                group={group.name}
                onClick={() => this.onGroupClick(group.id)}
                course={group.course}
              />
            ))}
          </Collapse>

          <Collapse icon={faHeart} title="Мои группы">
            {my.map(group => (
              <GroupsCard
                key={group.id}
                group={group.name}
                onClick={() => this.onGroupClick(group.id)}
                course={group.course}
              />
            ))}
          </Collapse>

          <Collapse icon={faUniversity} fetch={fetchAll} title="Все группы">
            {Object.keys(all).map(keyName => (
              <Collapse icon={faHeart} key={keyName} title={keyName}>
                {all[keyName].map(group => (
                  <GroupsCard
                    key={group.name}
                    onClick={() => this.onGroupClick(group.id)}
                    group={group.name}
                    course={group.course}
                  />
                ))}
              </Collapse>
            ))}
          </Collapse>

          <Collapse icon={faArchive} fetch={fetchArchive} title="Архив">
            {Object.keys(archive).map(keyName => (
              <Collapse icon={faHeart} key={keyName} title={keyName}>
                {all[keyName].map(group => (
                  <GroupsCard
                    key={group.name}
                    onClick={() => this.onGroupClick(group.id)}
                    group={group.name}
                    course={group.course}
                  />
                ))}
              </Collapse>
            ))}
          </Collapse>
        </div>
      </div>
    );
  }
}

export default GroupCard;
