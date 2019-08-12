import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons";
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
  if (ind === 0) shift = 20;
  else shift = positionGet(data[ind].eventDate);
  var style = {
    position: "absolute",
    left: shift
  };
  if (ind === data.length - 1)
    style = {
      position: "absolute",
      right: 20
    };
  return style;
}

function popoverGet(ind) {
  //Setup information in each popover
  return {
    body: data[ind].event,
    title: data[ind].eventDate.toString()
  };
}

class TimelineComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timelineWidth: "5%",
      data: data
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className={style.container}>
          <div className={style.progress}>
            <div
              className={style.timeLine}
              style={{
                width: `${this.state.timelineWidth}`
              }}
            >
              <div className={style.marker}>
                <FontAwesomeIcon
                  icon={faDotCircle}
                  className={style.markerIcon}
                />
              </div>
            </div>
            <div className={style.timeMarks}>
              {this.state.data.map((element, index) =>
                data[index].isActive ? (
                  <Popover
                    content={popoverGet(index).body}
                    title={popoverGet(index).title}
                    key={element.event}
                    visible={true}
                    trigger={"hover"}
                  >
                    <FontAwesomeIcon
                      icon={faCircle}
                      className={style.icon}
                      style={styleGet(index)}
                    />
                  </Popover>
                ) : (
                  <Popover
                    content={popoverGet(index).body}
                    title={popoverGet(index).title}
                    key={element.event}
                    trigger={"hover"}
                  >
                    <FontAwesomeIcon
                      icon={faCircle}
                      className={style.icon}
                      style={styleGet(index)}
                    />
                  </Popover>
                )
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        timelineWidth: positionGet(new Date())
      });
    }, 3000);
  }
}

export default TimelineComp;
