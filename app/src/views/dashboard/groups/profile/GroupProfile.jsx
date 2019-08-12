import React from "react";
import style from "./style.module.scss";
import PageHead from "../../../../components/pageHead/PageHead";
import BigButton from "../../../../components/common/bigButton/BigButton";
import Card from "../../../../components/common/card/Card";
import { faPen, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "antd";
import GroupParams from "../../../../components/groupParams/GroupParams";
import HealthTemp from "../../../../components/healthTemp/HealthTemp";
import HealthMap from "../../../../components/healthMap/HealthMap";
import StudentTable from "../../../../components/studentTable/StudentTable";

export default props => {
  return (
    <div className={style.container}>
      <PageHead
        title="Мелиарация и водное хозяйство - 146"
        subtitle="Факультет Инженерных Сетей и Экологии / Кафедра природоохранной деятельности"
      >
        <BigButton icon={faPen} />
        <BigButton icon={faEllipsisH} />
      </PageHead>

      <Row gutter={24} style={{ marginBottom: "20px" }}>
        <Col span={14}>
          <GroupParams />
        </Col>
        <Col span={8} />
      </Row>

      <Row type={"flex"} gutter={24} style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <HealthTemp />
        </Col>
        <Col span={16}>
          <HealthMap />
        </Col>
      </Row>

      <Row gutter={24} style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Card title="Наглость">123</Card>
        </Col>
        <Col span={16}>
          <Card title="Здоровье" buttons={<BigButton icon={faPen} />}>
            123
          </Card>
        </Col>
      </Row>

      <Row style={{ marginBottom: "20px" }}>
        <Col>
          <StudentTable />
        </Col>
      </Row>
    </div>
  );
};
