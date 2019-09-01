import React from "react";
import { Popover } from "antd";
import style from "../timeline/style.module.scss";

var stretches = true;

class TimelineComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timelineWidth: "0%",
      isVisible: false,
      data: []
    };
  }

  whenContinuous = ind => {
    if (this.state.data.length !== 0) {
      var start = this.state.data[ind].dateStart;
      var end = this.state.data[ind].dateEnd;
      if (end != null && stretches === true)
        return (
          (
            parseFloat(this.positionGet(end), 10) -
            parseFloat(this.positionGet(start), 10)
          ).toString() + "%"
        );
      else return undefined;
    } else return undefined;
  };

  positionGet = date => {
    //To get dots shift from left side
    if (this.state.data.length !== 0) {
      var fDate = this.state.data[0].dateStart;
      var lDate = this.state.data[this.state.data.length - 1].dateStart;
      var allSet = lDate - fDate;
      var curDate = date - fDate;
      var ret = (curDate / allSet) * 100;
      return ret.toString();
    }
  };

  styleGet = ind => {
    //To get styles of each dot
    var shift;
    if (ind === 0) shift = 10;
    else shift = this.positionGet(this.state.data[ind].dateStart) + "%";
    var style = {
      position: "absolute",
      left: shift,
      width: this.whenContinuous(ind),
      minWidth: "20px",
      borderRadius: "1000px"
    };
    if (ind === this.state.data.length - 1)
      style = {
        position: "absolute",
        right: 10,
        width: this.whenContinuous(ind),
        minWidth: "20px",
        borderRadius: "1000px"
      };
    return style;
  };

  dataToDates() {
    var dates = [];
    if (!this.props.data) return dates;
    if (
      this.props.data.coursePeriodStart !== undefined &&
      this.props.data.coursePeriodEnd !== undefined &&
      this.props.data !== undefined
    )
      dates = [
        {
          event: "Начало года",
          dateStart: new Date(this.props.data.coursePeriodStart),
          dateEnd: null,
          isActive: true
        },
        {
          event: "Зимние каникулы",
          dateStart: new Date(this.props.data.winterHolidayStart),
          dateEnd: new Date(this.props.data.winterHolidayEnd),
          isActive:
            this.props.data.winterHolidayStart !== undefined ? true : false
        },
        {
          event: "Зимняя сессия",
          dateStart: new Date(this.props.data.winterSessionStart),
          dateEnd: new Date(this.props.data.winterSessionEnd),
          isActive:
            this.props.data.winterSessionStart !== undefined ? true : false
        },
        {
          event: "Летняя сессия",
          dateStart: new Date(this.props.data.summerSessionStart),
          dateEnd: new Date(this.props.data.summerSessionEnd),
          isActive:
            this.props.data.summerSessionStart !== undefined ? true : false
        },
        {
          event: "Практика",
          dateStart: new Date(this.props.data.practiceStart),
          dateEnd: new Date(this.props.data.practiceEnd),
          isActive: this.props.data.practiceStart !== undefined ? true : false
        },
        {
          event: "Первая аттестация",
          dateStart: new Date(this.props.data.attestation1Start),
          dateEnd: new Date(this.props.data.attestation1End),
          isActive:
            this.props.data.attestation1Start !== undefined ? true : false
        },
        {
          event: "Вторая аттестация",
          dateStart: new Date(this.props.data.attestation2Start),
          dateEnd: new Date(this.props.data.attestation2End),
          isActive:
            this.props.data.attestation2Start !== undefined ? true : false
        },
        {
          event: "Третья аттестация",
          dateStart: new Date(this.props.data.attestation3Start),
          dateEnd: new Date(this.props.data.attestation3End),
          isActive:
            this.props.data.attestation3Start !== undefined ? true : false
        },
        {
          event: "Четвертая аттестация",
          dateStart: new Date(this.props.data.attestation4Start),
          dateEnd: new Date(this.props.data.attestation4End),
          isActive:
            this.props.data.attestation4Start !== undefined ? true : false
        },
        {
          event: "Конец года",
          dateStart: new Date(this.props.data.coursePeriodEnd),
          dateEnd: null,
          isActive: true
        }
      ];
    return dates;
  }

  timelineDeleteOrNot() {
    if (this.state.data.length !== 0) return this.positionGet(new Date()) + "%";
    else return "0";
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      this.setState({
        data: this.dataToDates(),
        timelineWidth: this.timelineDeleteOrNot(),
        isVisible: true
      });
    }, 1000);
  }

  componentDidMount() {
    if (this.state.data !== undefined) {
      setTimeout(() => {
        this.setState({
          data: this.dataToDates(),
          timelineWidth: this.timelineDeleteOrNot(),
          isVisible: true
        });
      }, 1000);
    }
  }

  render() {
    console.log(this.state.data);
    return (
      <div className={style.container}>
        {this.state.data.length === 0 ? (
          <div className={style.notFilledText}>
            Пожалуйста, заполните процесс обучения для текущей группы
          </div>
        ) : (
          undefined
        )}
        <div
          className={style.timeLine}
          style={{ width: this.state.timelineWidth }}
        >
          {this.state.data.length !== 0 ? (
            <div className={style.marker} />
          ) : (
            undefined
          )}
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
                >
                  <div className={style.icon} style={this.styleGet(index)} />
                </Popover>
              );
          })}
        </div>
      </div>
    );
  }
}

export default TimelineComp;
