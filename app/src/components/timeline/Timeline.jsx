import React from "react";
import { Popover } from "antd";
import style from "../timeline/style.module.scss";

let data = [
  //Dataset
  {
    event: "Fuck this shit",
    eventDate: new Date("December 17, 2015 03:24:00"),
    isActive: false
  },
  {
    event: "Really?",
    eventDate: new Date("June 23, 2018 03:24:00"),
    isActive: false
  },
  {
    event: "2007 is returned.",
    eventDate: new Date("January 23, 2017 03:24:00"),
    isActive: false
  },
  {
    event: "2010? Again?!",
    eventDate: new Date("January 23, 2020 03:24:00"),
    isActive: false
  },
  {
    event: "Right now!",
    eventDate: new Date("August 12,  2019 23:00:00"),
    isActive: true
  },
  {
    event: "...?",
    eventDate: new Date("July 30, 2020 03:24:00"),
    isActive: false
  },
  {
    event: "It is coming!",
    eventDate: new Date("August 20, 2021 00:00:00"),
    isActive: false
  }
];

function positionGet(eventDate) {
  //To get dots shift from left side
  var fDate = data[0].eventDate;
  var lDate = data[data.length - 1].eventDate;
  var allSet = lDate - fDate;
  var curDate = eventDate - fDate;
  var ret = (curDate / allSet) * 100;
  return ret.toString() + "%";
}

function styleGet(ind) {
  //To get styles of each dot
  var shift = positionGet(data[ind].eventDate);
  if (ind === 0) shift = 10;
  else shift = positionGet(data[ind].eventDate);
  var style = {
    position: "absolute",
    left: shift
  };
  if (ind === data.length - 1)
    style = {
      position: "absolute",
      right: 10
    };
  return style;
}

class TimelineComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timelineWidth: "0%",
      isVisible: false,
      data: data
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        timelineWidth: positionGet(new Date())
      });
    }, 500);
    setTimeout(() => {
      this.setState({
        isVisible: true
      });
    }, 2500);
  }

  render() {
    return (
      <div className={style.container}>
        <div
          className={style.timeLine}
          style={{ width: this.state.timelineWidth }}
        >
          <div className={style.marker} />
        </div>

        <div className={style.timeMarks}>
          {this.state.data.map((item, index) => {
            if (item.isActive)
              return (
                <Popover
                  content={item.event}
                  key={index}
                  trigger="hover"
                  placement="bottom"
                  visible={this.state.isVisible}
                >
                  <div className={style.icon} style={styleGet(index)} />
                </Popover>
              );
            else
              return (
                <Popover
                  content={item.event}
                  key={index}
                  trigger="hover"
                  placement="bottom"
                >
                  <div className={style.icon} style={styleGet(index)} />
                </Popover>
              );
          })}
        </div>
      </div>
    );
  }
}

export default TimelineComp;
