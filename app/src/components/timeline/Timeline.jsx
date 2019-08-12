import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { Popover } from "antd";
import style from "../timeline/style.module.scss";

let data = [
  //Dataset
  {
    event: "Fuck this shit",
    eventDate: new Date("December 17, 2015 03:24:00")
  },
  {
    event: "Really?",
    eventDate: new Date("June 23, 2018 03:24:00")
  },
  {
    event: "2007 is returned.",
    eventDate: new Date("January 23, 2017 03:24:00")
  },
  {
    event: "2010? Again?!",
    eventDate: new Date("January 23, 2020 03:24:00")
  },
  {
    event: "Right now!",
    eventDate: new Date("August 12,  2019 18:00:00")
  },
  {
    event: "...?",
    eventDate: new Date("July 30, 2020 03:24:00")
  },
  {
    event: "It is coming!",
    eventDate: new Date("August 20, 2021 00:00:00")
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

function getClosest(ind) {
  //To get closest future event
  var today = new Date();
  var closest = [];
  for (var i = 0; i < data.length; i++) {
    if (today - data[i].eventDate < 0)
      closest[i] = Math.abs(today - data[i].eventDate);
    else closest[i] = 1e50;
  }
  var min = Math.min.apply(Math, closest);
  i = closest.indexOf(min);
  if (i === ind)
    return {
      icon: faDotCircle,
      cName: style.activeIcon
    };
  else
    return {
      icon: faCircle,
      cName: style.icon
    };
}

class TimelineComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timelineWidth: "0%"
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
                width: `${this.state.timelineWidth}`,
                transitionDelay: "1s"
              }}
            />
            <div className={style.timeMarks}>
              {data.map((element, index) => (
                <Popover
                  content={popoverGet(index).body}
                  title={popoverGet(index).title}
                >
                  <FontAwesomeIcon
                    icon={getClosest(index).icon}
                    className={getClosest(index).cName}
                    style={styleGet(index)}
                  />
                </Popover>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.setState({
      timelineWidth: positionGet(new Date())
    });
  }
}

export default TimelineComp;
