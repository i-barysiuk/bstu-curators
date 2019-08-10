import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { Popover } from "antd";
import ProgressBar from "../progressBar/ProgressBar";
import style from "../timeline/style.module.scss";

let data = [
  {
    event: "Fuck this shit",
    date: new Date("December 17, 2003 03:24:00")
  },
  {
    event: "Really?",
    date: new Date("January 23, 2005 03:24:00")
  },
  {
    event: "2007 is returned.",
    date: new Date("January 23, 2007 03:24:00")
  },
  {
    event: "2010? Again?!",
    date: new Date("January 23, 2010 03:24:00")
  },
  {
    event: "...?",
    date: new Date("July 30, 2018 03:24:00")
  },
  {
    event: "It is coming!",
    date: new Date("August 20, 2019 00:00:00")
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
    title: data[ind].event
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
                icon={faCircle}
                className={style.icon}
                style={styleGet(0)}
              />
            </Popover>
            <Popover content={popoverGet(1).body} title={popoverGet(1).title}>
              <FontAwesomeIcon
                icon={faDotCircle}
                className={style.activeIcon}
                style={styleGet(1)}
              />
            </Popover>
            <Popover content={popoverGet(2).body} title={popoverGet(2).title}>
              <FontAwesomeIcon
                icon={faCircle}
                className={style.icon}
                style={styleGet(2)}
              />
            </Popover>
            <Popover content={popoverGet(3).body} title={popoverGet(3).title}>
              <FontAwesomeIcon
                icon={faCircle}
                className={style.icon}
                style={styleGet(3)}
              />
            </Popover>
            <Popover content={popoverGet(4).body} title={popoverGet(4).title}>
              <FontAwesomeIcon
                icon={faCircle}
                className={style.icon}
                style={styleGet(4)}
              />
            </Popover>
            <Popover content={popoverGet(5).body} title={popoverGet(5).title}>
              <FontAwesomeIcon
                icon={faCircle}
                className={style.icon}
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
