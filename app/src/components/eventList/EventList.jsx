import React from "react";
import style from "./style.module.scss";
import { connect } from "react-redux";
import { Radio } from "antd";
import EventCard from "../eventCard/EventCard";
import Card from "../common/card/Card";
import BigButton from "../common/bigButton/BigButton";
import { faPlus, faFilter } from "@fortawesome/free-solid-svg-icons";
import { openEventsModal } from "../../redux/actions/eventModal";
import GroupsEvents from "../../services/GroupsEventService";
import "moment/locale/ru";
const moment = require("moment");

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sortData: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.groups !== this.props.groups) {
      GroupsEvents.getGroupsEvent(this.props.groups).then(response => {
        var eventsData = response.data.map(item => {
          return { key: item.id, ...item.event };
        });
        this.setState({ data: eventsData, sortData: eventsData });
      });
    }
  }

  sortEvent = data => {
    var curentDate = new Date();
     switch (data) {
      case "ALL":
        this.setState({ sortData: this.state.data });
        break;
      case "PAST":
        var pastEvent = this.state.data.filter(item => {
          if (curentDate > new Date(item.dataEnd)) {
            return { ...item };
          }
          return 0;
        });
        this.setState({ sortData: pastEvent });
        break;
      case "ACTIVE":
        var activeEvent = this.state.data.filter(item => {
          if (
            curentDate > item.dataStart &&
            curentDate < new Date(item.dataEnd)
          ) {
            return { ...item };
          }
          return 0;
        });
        this.setState({ sortData: activeEvent });
        break;
      case "FUTURE":
        var futureEvent = this.state.data.filter(item => {
          if (curentDate < item.dataStart) {
            return { ...item };
          }
          return 0;
        });
        this.setState({ sortData: futureEvent });
        break;
      default:
        return this.setState({ sortData: this.state.data });
    }
  };

  render() {
    return (
      <Card
        title={"События"}
        buttons={[
          <BigButton
            icon={faFilter}
            dropdown
            content={
              <div>
                <Radio.Group defaultValue={"ALL"}>
                  <Radio.Button
                    value={"ALL"}
                    onClick={() => this.sortEvent("ALL")}
                  >
                    Все
                  </Radio.Button>
                  <Radio.Button
                    value={"PAST"}
                    onClick={() => this.sortEvent("PAST")}
                  >
                    Прошедшие
                  </Radio.Button>
                  <Radio.Button
                    value={"ACTIVE"}
                    onClick={() => this.sortEvent("ACTIVE")}
                  >
                    Актуальные
                  </Radio.Button>
                  <Radio.Button
                    value={"FUTURE"}
                    onClick={() => this.sortEvent("FUTURE")}
                  >
                    Будущие
                  </Radio.Button>
                </Radio.Group>
              </div>
            }
            onClick={this.props.onClick}
          />,
          <BigButton
            icon={faPlus}
            primary
            onClick={this.props.openEventsModal}
          />
        ]}
        contentCenter
      >
        <div className={style.cards}>
          {this.state.sortData.map((item, index) => {
            item.dataStart = moment(item.dataStart);
            return (
              <div className={style.item} key={item.id}>
                {index === 0 ||
                item.dataStart.format("M") !==
                  moment(this.state.data[index - 1].dataStart).format("M") ? (
                  <div className={style.month}>
                    {item.dataStart.format("MMMM")}
                  </div>
                ) : (
                  ""
                )}
                <EventCard
                  event={item.customIcon}
                  title={item.title}
                  subTitle={item.subtitle}
                  utc={item.dataStart}
                  utcEnd={item.dataEnd}
                />
              </div>
            );
          })}
        </div>
      </Card>
    );
  }
}

const mapDispatchToProps = {
  openEventsModal
};

export default connect(
  null,
  mapDispatchToProps
)(EventList);
