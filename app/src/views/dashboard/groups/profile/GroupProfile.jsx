import React from "react";
import style from "./style.module.scss";
import PageHead from "../../../../components/pageHead/PageHead";
import BigButton from "../../../../components/common/bigButton/BigButton";
import { faPen, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "antd";

import Timeline from "../../../../components/timeline/Timeline";
import GroupParams from "../../../../components/groupParams/GroupParams";
import EventList from "../../../../components/eventList/EventList";
import HealthTemp from "../../../../components/healthTemp/HealthTemp";
import HealthMap from "../../../../components/healthMap/HealthMap";

import AveragePoint from "../../../../components/averagePoint/AveragePoint";
import AverageMap from "../../../../components/averageMap/AverageMap";

import StudentTable from "../../../../components/studentTable/StudentTable";

import Selector from "../../../../components/selector/Selector";

export default class GroupProfile extends React.Component {
  componentDidMount() {
    this.activeGroupRequest();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.activeGroupRequest();
    }
  }

  activeGroupRequest = () => {
    const { id } = this.props.match.params;
    this.props.fetchGroup({ id });
  };

  render() {
    const {
      gender,
      community,
      family,
      geography,
      living,
      social,
      others
    } = this.props.group;
    return (
      <div className={style.container}>
        <PageHead
          title="Мелиарация и водное хозяйство - 146"
          subtitle="Факультет Инженерных Сетей и Экологии / Кафедра природоохранной деятельности"
        >
          <BigButton icon={faPen} />
          <BigButton icon={faEllipsisH} />
        </PageHead>

        <Row>
          <Col>
            <Timeline />
          </Col>
        </Row>

        <Row style={{ marginBottom: "20px" }}>
          <Col>
            <Selector isStudent={true} />
          </Col>
        </Row>

        <Row style={{ marginBottom: "20px" }}>
          <Col>
            <Selector />
          </Col>
        </Row>

        <Row type={"flex"} gutter={24} style={{ marginBottom: "20px" }}>
          <Col span={14}>
            <GroupParams
              data={{
                gender,
                community,
                family,
                geography,
                living,
                social,
                others
              }}
            />
          </Col>
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

        <Row style={{ marginBottom: "20px" }}>
          <Col>
            <StudentTable />
          </Col>
        </Row>
      </div>
    );
  }
}
