import React from "react";
import { connect } from "react-redux";
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
import { openModal } from "../../redux/actions/modal";
import {
  addGroupToFavouriteRequest,
  removeGroupFromFavouriteRequest,
  addGroupToArchiveRequest,
  removeGroupFromArchiveRequest
} from "../../redux/actions/groups";

class GroupCard extends React.Component {
  onGroupClick = id => this.props.history.push(`/dashboard/groups/${id}`);

  addFavorite = group => {
    this.props.addGroupToFavouriteRequest({ group });
  };

  removeFavorite = group => {
    this.props.removeGroupFromFavouriteRequest({ group });
  };

  addToArchive = group => {
    this.props.addGroupToArchiveRequest({ group });
  };

  removeFromArchive = group => {
    this.props.removeGroupFromArchiveRequest({ group });
  };

  isFavorite = id => {
    const ids = this.props.groups.favorite.map(group => group.id);
    if (ids.indexOf(id) > -1) {
      return true;
    }
    return false;
  };

  onStarClick = group => {
    this.isFavorite(group.id)
      ? this.removeFavorite(group)
      : this.addFavorite(group);
  };

  isArchive = id => {
    const ids = this.props.groups.archive.map(group => group.id);
    if (ids.indexOf(id) > -1) {
      return true;
    }
    return false;
  };

  onArchiveClick = group => {
    this.isArchive(group.id)
      ? this.removeFromArchive(group)
      : this.addToArchive(group);
  };

  render() {
    const {
      groups: { favorite, my, all, archive },
      fetchAll,
      fetchArchive,
      openModal
    } = this.props;
    return (
      <div className={style.container}>
        <div className={style.head}>
          <div className={style.headerRow}>
            <span className={style.header}>Группы</span>
            <BigButton icon={faPlus} onClick={openModal} primary />
          </div>

          <Input
            prefix={<Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Найти группу"
            className={style.input}
          />
        </div>
        <div className={style.content}>
          <Collapse icon={faStar} title="Избранное" show>
            {favorite[0]
              ? favorite.map(group => (
                  <GroupsCard
                    favorite
                    key={group.id}
                    group={group.name}
                    onStarClick={() => this.removeFavorite(group)}
                    onClick={() => this.onGroupClick(group.id)}
                    onArchiveClick  = {() => this.addToArchive(group)}
                    course={group.course}
                  />
                ))
              : "Избранных групп нет"}
          </Collapse>

          <Collapse icon={faHeart} title="Мои группы">
            {my[0]
              ? my.map(group => (
                  <GroupsCard
                    favorite={this.isFavorite(group.id)}
                    onStarClick={() => this.onStarClick(group)}
                    key={group.id}
                    group={group.name}
                    onClick={() => this.onGroupClick(group.id)}
                    onArchiveClick = {() => this.addToArchive(group)}
                    course={group.course}
                  />
                ))
              : "У Вас пока нет групп, но Вы можете их создать!"}
          </Collapse>

          <Collapse icon={faUniversity} fetch={fetchAll} title="Все группы">
            {Object.keys(all).map(keyName => (
              <Collapse icon={faHeart} key={keyName} title={keyName}>
                {all[keyName].map(group => (
                  <GroupsCard
                    onStarClick={() => this.onStarClick(group)}
                    onArchiveClick = {() => this.addToArchive(group)}
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
                {archive[keyName].map(group => (
                  <GroupsCard
                    onArchiveClick = {() => this.removeFromArchive(group)}
                    onStarClick={() => this.onStarClick(group)}
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

const mapDispatchToProps = {
  openModal,
  addGroupToFavouriteRequest,
  removeGroupFromFavouriteRequest,
  addGroupToArchiveRequest,
  removeGroupFromArchiveRequest
};

export default connect(
  null,
  mapDispatchToProps
)(GroupCard);
