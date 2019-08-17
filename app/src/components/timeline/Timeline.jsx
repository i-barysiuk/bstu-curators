import React from "react";
import { Popover } from "antd";
import style from "../timeline/style.module.scss";

var stretches = true;

let data = [
  //Dataset
  {
    event: "17 Марта - 20 Апреля 2019",
    dateStart: new Date("March 17, 2019 03:24:00"),
    dateEnd: new Date("April 20, 2019 03:24:00"),
    isActive: false
  },
  {
    event: "23 Июня 2019",
    dateStart: new Date("June 23, 2019 03:24:00"),
    dateEnd: null,
    isActive: false
  },
  {
    event: "23 Июля - 30 Июля 2019",
    dateStart: new Date("July 23, 2019 03:24:00"),
    dateEnd: new Date("July 30, 2019 03:24:00"),
    isActive: false
  },
  {
    event: "Прямо сейчас!",
    dateStart: new Date(),
    dateEnd: null,
    isActive: true
  },
  {
    event: "30 Сентября 2019",
    dateStart: new Date("September 30, 2019 03:24:00"),
    dateEnd: null,
    isActive: false
  },
  {
    event: "20 Октября - 30 Октября 2019",
    dateStart: new Date("October 20, 2019 00:00:00"),
    dateEnd: new Date("October 30, 2019 00:00:00"),
    isActive: false
  }
];

function positionGet(date) {
  //To get dots shift from left side
  var fDate = data[0].dateStart;
  var lDate = data[data.length - 1].dateStart;
  var allSet = lDate - fDate;
  var curDate = date - fDate;
  var ret = (curDate / allSet) * 100;
  return ret.toString();
}

function whenContinuous(ind) {
  var start = data[ind].dateStart;
  var end = data[ind].dateEnd;
  if (end != null && stretches === true)
    return (
      (
        parseFloat(positionGet(end), 10) - parseFloat(positionGet(start), 10)
      ).toString() + "%"
    );
  else return undefined;
}

function styleGet(ind) {
  //To get styles of each dot
  var shift;
  if (ind === 0) shift = 10;
  else shift = positionGet(data[ind].dateStart) + "%";
  var style = {
    position: "absolute",
    left: shift,
    width: whenContinuous(ind),
    minWidth: "20px",
    borderRadius: "1000px"
  };
  if (ind === data.length - 1)
    style = {
      position: "absolute",
      right: 10,
      width: whenContinuous(ind),
      minWidth: "20px",
      borderRadius: "1000px"
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
        timelineWidth: positionGet(new Date()) + "%"
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
                  getPopupContainer={trigger => trigger.parentNode}
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
