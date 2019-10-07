import React from "react";
import style from "./style.module.scss";
import { connect } from "react-redux";
import EventCard from "../eventCard/EventCard";
import Card from "../common/card/Card";
import BigButton from "../common/bigButton/BigButton";
import { faPlus, faFilter } from "@fortawesome/free-solid-svg-icons";
import { openEventsModal } from "../../redux/actions/eventModal";
import Events from "../../services/EventService";
import "moment/locale/ru";
const moment = require("moment");

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    Events.getAllEvents(this.props.events).then(response => {
      var eventsData = response.data.map(item => {
        return { key: item.id, ...item };
      });
      this.setState({ data: eventsData });
    });
  }

  render() {
    return (
      <Card
        title={"События"}
        buttons={[
          <BigButton icon={faFilter} onClick={this.props.onClick} />,
          <BigButton
            icon={faPlus}
            primary
            onClick={this.props.openEventsModal}
          />
        ]}
        contentCenter
      >
        {/* {this.state.data.sort(this.compare)} */}
        {/* {console.log(this.state.data)} */}
        <div className={style.cards}>
          {this.state.data.map((item, index) => {
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
