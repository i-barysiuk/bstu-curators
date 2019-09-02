import React from "react";
import style from "./style.module.scss";
import PageHead from "../../../../components/pageHead/PageHead";
import BigButton from "../../../../components/common/bigButton/BigButton";
import { faPen, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "antd";

import Timeline from "../../../../components/timeline/Timeline";
import EventList from "../../../../components/eventList/EventList";
import HealthTemp from "../../../../components/healthTemp/HealthTemp";
import HealthMap from "../../../../components/healthMap/HealthMap";

import AveragePoint from "../../../../components/averagePoint/AveragePoint";
import AverageMap from "../../../../components/averageMap/AverageMap";

export default class StudentProfile extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <PageHead
          title={
            // this.props.student.last_name +
            // " " +
            // this.props.student.first_name +
            // " " +
            // this.props.student.f_name
            "Cергиевич Андрей Викторович"
          }
          subtitle={
            // "Номер зачетки: " +
            // this.props.student.studentId +
            // " / " +
            // this.props.student.faculty
            "Номер зачетки: 1543232364 / ФЭИС / МС-3"
          }
        >
          <BigButton icon={faPen} />
          <BigButton icon={faEllipsisH} />
        </PageHead>

        <Row>
          <Col>
            <Timeline data={[]} />
          </Col>
        </Row>

        <Row type={"flex"} gutter={24} style={{ marginBottom: "20px" }}>
          <Col span={10}>
            <EventList />
          </Col>
        </Row>

        <Row type={"flex"} gutter={24} style={{ marginBottom: "20px" }}>
          <Col span={8}>
            <HealthTemp />
          </Col>
          <Col span={16}>
            <HealthMap />
          </Col>
        </Row>

        <Row type={"flex"} gutter={24} style={{ marginBottom: "20px" }}>
          <Col span={16}>
            <AverageMap />
          </Col>
          <Col span={8}>
            <AveragePoint />
          </Col>
        </Row>
      </div>
    );
  }
}
