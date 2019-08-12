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
  render() {
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
            <GroupsCard favorite group={"МС-4"} course={"2"} />
            <GroupsCard favorite group={"АВС-123"} course={"6"} />
            <GroupsCard favorite group={"МС-4"} course={"2"} />
            <GroupsCard favorite group={"МС-4"} course={"2"} />
          </Collapse>

          <Collapse icon={faHeart} title="Мои группы">
            <GroupsCard group={"МС-4"} course={"2"} />
            <GroupsCard group={"МС-4"} course={"2"} />
            <GroupsCard group={"МС-4"} course={"2"} />
            <GroupsCard group={"МС-4"} course={"2"} />
          </Collapse>

          <Collapse icon={faUniversity} title="Все группы">
            <GroupsCard group={"МС-4"} course={"2"} />
            <GroupsCard group={"МС-4"} course={"2"} />
            <GroupsCard group={"МС-4"} course={"2"} />
            <GroupsCard group={"МС-4"} course={"2"} />
            <Collapse icon={faHeart} title="ФЭИС">
              <GroupsCard group={"МС-4"} course={"2"} />
              <GroupsCard group={"МС-4"} course={"2"} />
              <GroupsCard group={"МС-4"} course={"2"} />
              <GroupsCard group={"МС-4"} course={"2"} />
            </Collapse>
          </Collapse>

          <Collapse icon={faArchive} title="Архив">
            <GroupsCard group={"МС-4"} course={"2"} />
            <GroupsCard group={"МС-4"} course={"2"} />
            <GroupsCard group={"МС-4"} course={"2"} />
            <GroupsCard group={"МС-4"} course={"2"} />
          </Collapse>
        </div>
      </div>
    );
  }
}

export default GroupCard;
