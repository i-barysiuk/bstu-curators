import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { Popover } from "antd";
import style from "../timeline/style.module.scss";

let data = [
  {
    event: "Fuck this shit",
    date: new Date("December 17, 2015 03:24:00")
  },
  {
    event: "Really?",
    date: new Date("June 23, 2018 03:24:00")
  },
  {
    event: "2007 is returned.",
    date: new Date("January 23, 2017 03:24:00")
  },
  {
    event: "2010? Again?!",
    date: new Date("January 23, 2020 03:24:00")
  },
  {
    event: "...?",
    date: new Date("July 30, 2020 03:24:00")
  },
  {
    event: "It is coming!",
    date: new Date("August 20, 2021 00:00:00")
  }
];

function positionGet(date) {
  var fDate = data[0].date;
  var lDate = data[data.length - 1].date;
  var allSet = lDate - fDate;
  var curDate = date - fDate;
  var ret = (curDate / allSet) * 100;
  return ret.toString() + "%";
}

function styleGet(ind) {
  var shift = positionGet(data[ind].date);
  if (ind === 0) shift = 20;
  else shift = positionGet(data[ind].date);
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
  return {
    body: data[ind].event,
    title: data[ind].date.toString()
  };
}

function getClosest(ind) {
  var today = new Date();
  var closest = [];
  for (var i = 0; i < data.length; i++) {
    if (today - data[i].date < 0) closest[i] = Math.abs(today - data[i].date);
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

function Timeline() {
  return (
    <React.Fragment>
      <div className={style.container}>
        <div className={style.timeLine}>
          <div
            className={style.timeMarks}
            style={{ position: "relative", width: "100%" }}
          >
            <Popover content={popoverGet(0).body} title={popoverGet(0).title}>
              <FontAwesomeIcon
                icon={getClosest(0).icon}
                className={getClosest(0).cName}
                style={styleGet(0)}
              />
            </Popover>
            <Popover content={popoverGet(1).body} title={popoverGet(1).title}>
              <FontAwesomeIcon
                icon={getClosest(1).icon}
                className={getClosest(1).cName}
                style={styleGet(1)}
              />
            </Popover>
            <Popover content={popoverGet(2).body} title={popoverGet(2).title}>
              <FontAwesomeIcon
                icon={getClosest(2).icon}
                className={getClosest(2).cName}
                style={styleGet(2)}
              />
            </Popover>
            <Popover content={popoverGet(3).body} title={popoverGet(3).title}>
              <FontAwesomeIcon
                icon={getClosest(3).icon}
                className={getClosest(3).cName}
                style={styleGet(3)}
              />
            </Popover>
            <Popover content={popoverGet(4).body} title={popoverGet(4).title}>
              <FontAwesomeIcon
                icon={getClosest(4).icon}
                className={getClosest(4).cName}
                style={styleGet(4)}
              />
            </Popover>
            <Popover content={popoverGet(5).body} title={popoverGet(5).title}>
              <FontAwesomeIcon
                icon={getClosest(5).icon}
                className={getClosest(5).cName}
                style={styleGet(5)}
              />
            </Popover>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Timeline;
