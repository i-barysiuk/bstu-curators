import React from "react";
import style from "./style.module.scss";
import PageHead from "../../../../components/pageHead/PageHead";
import BigButton from "../../../../components/common/bigButton/BigButton";
import { faPen, faEllipsisH, faBorderNone } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "antd";

import Timeline from "../../../../components/timeline/Timeline";
import GroupParams from "../../../../components/groupParams/GroupParams";
import EventList from "../../../../components/eventList/EventList";
import HealthTemp from "../../../../components/healthTemp/HealthTemp";
import HealthMap from "../../../../components/healthMap/HealthMap";

import AveragePoint from "../../../../components/averagePoint/AveragePoint";
import AverageMap from "../../../../components/averageMap/AverageMap";

import StudentTable from "../../../../components/studentTable/StudentTable";
import { toRomane } from "../../../../helper";

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

  mobile = () => {
    return document.body.clientWidth > 700;
  }

  render() {
    const {
      gender,
      community,
      family,
      geography,
      living,
      social,
      others,
      user
    } = this.props.group;
    return (
      <div className={style.container}>
        <PageHead
          title={this.props.group.fullName}
          course={" - " + toRomane(this.props.group.course)}
          subtitle={
            this.props.group.department + " / " + this.props.group.cathedra
          }
        >
          <BigButton icon={faPen}/>
          <BigButton icon={faEllipsisH} />
        </PageHead>

        <Row>
          <Col>
            <Timeline
              data={
                this.props.group.studyProcess &&
                this.props.group.studyProcess[this.props.group.course]
              }
            />
          </Col>
        </Row>

        <Row type={"flex"} gutter={24} style={{ marginBottom: "20px" }}>
          <Col span={this.mobile() ? 14 : 24}>
            <GroupParams
              data={{
                gender,
                community,
                family,
                geography,
                living,
                social,
                others,
                user
              }}
            />
          </Col>
          <Col span={this.mobile() ? 10 : 24}>
            <EventList />
          </Col>
        </Row>

        <Row type={"flex"} gutter={24} style={{ marginBottom: "20px" }}>
          <Col span={this.mobile() ? 8 : 24}>
            <HealthTemp />
          </Col>
          <Col span={16} className={style.mobile}>
            <HealthMap />
          </Col>
        </Row>

        <Row type={"flex"} gutter={24} style={{ marginBottom: "20px" }}>
          <Col span={16} className={style.mobile}>
            <AverageMap />
          </Col>
          <Col span={this.mobile() ? 8 : 24}>
            <AveragePoint />
          </Col>
        </Row>

        <Row style={{ marginBottom: "20px" }} className={style.mobile}>
          <Col>
            <StudentTable />
          </Col>
        </Row>
      </div>
    );
  }
}
