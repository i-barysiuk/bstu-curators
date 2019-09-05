import React from "react";
import style from "./style.module.scss";
import Card from "../common/card/Card";
import BigButton from "../common/bigButton/BigButton";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { 
  Avatar,
  Collapse,
  Row,
  Col,
  } from "antd";
import { Pie } from "react-chartjs-2";

import logoP from "../../assets/images/logos/avatarTest.png";

const { Panel } = Collapse;

const getDate = (ids, data) => {
  return data ? ids.map(id => data[id]) : [];
};

const config = [
  {
    label: "gender",
    labels: ["Юноши", "Девушки"],
    labelsIds: ["men", "women"],
    backgroundColor: ["#00BFFF", "#FF6384"],
    text: "Гендерный состав"
  },
  {
    label: "community",
    labels: ["БРСМ", "ПРОФКОМ", "Студсовет", "Прочая"],
    labelsIds: ["brsm", "profkom", "studsovet", "others"],
    backgroundColor: ["#FF6384", "#FFCD56", "#36A2EB", "#C9CBCF"],
    text: "Общественные организации"
  },
  {
    label: "family",
    labels: ["Полная", "Не полная", "Многодетные", "Сироты"],
    labelsIds: ["full", "notfull", "manychild", "orphan"],
    backgroundColor: ["#4BC0C0", "#FF9F40", "#9966FF", "#FF6384"],
    text: "Состав семьи"
  },
  {
    label: "geography",
    labels: ["Местный", "Иногородний", "Иностранный"],
    labelsIds: ["local", "nonresident", "foreign"],
    backgroundColor: ["#36A2EB", "#FFCD56", "#FF6384"],
    text: "География"
  },
  {
    label: "living",
    labels: ["Родители", "Родственники", "Самостоятельно", "Общежитие"],
    labelsIds: ["parents", "relatives", "independent", "hostel"],
    backgroundColor: ["#9966FF", "#36A2EB", "#FF6384", "#4BC0C0"],
    text: "Проживание"
  }
];
export default ({ data }) => {
  var curatorName =
    data.user &&
    data.user.first_name +
      " " +
      (data.user.f_name !== null ? data.user.f_name : "") +
      " " +
      data.user.last_name;
  var curatorInitials =
    data.user &&
    data.user.last_name[0] +
      data.user.first_name[0] +
      (data.user.f_name !== null ? data.user.f_name[0] : "");

  return (
    <Card
      title="Характеристика"
      buttons={<BigButton icon={faPen} onClick={() => {}} />}
    >
      <div className={style.curator}>
        <Avatar size={64} src={logoP} >{curatorInitials}</Avatar>
        <div>
          {curatorName}
          <br /> <span>{data.user && data.user.department}</span>
        </div>
      </div>

      <div className={style.firstRow}>
        {data.gender &&
          config.map(element => (
            <div style={{ width: "50%" }} key={element.label}>
              <Pie
                data={{
                  labels: element.labels,

                  datasets: [
                    {
                      data: getDate(element.labelsIds, data[element.label]),
                      backgroundColor: element.backgroundColor
                    }
                  ]
                }}
                options={{
                  title: {
                    display: true,
                    text: element.text,
                    fontSize: 14
                  },
                  legend: {
                    display: false
                  }
                }}
              />
            </div>
          ))}
      </div>
      <Collapse bordered={false}>
        <Panel header="Социальный статус" key="1">
          {data.social && (
            <React.Fragment>
              <Row>
                <Col span={20}>Дети сироты (до 18 лет)</Col>
                <Col span={4}>{data.social.socOrphan18 || " - "}</Col>
              </Row>
              <Row>
                <Col span={20}>Дети без родителей (до 18 лет)</Col>
                <Col span={4}>{data.social.socWithoutParents18 || " - "}</Col>
              </Row>
              <Row>
                <Col span={20}>Сироты и без родителей (18-23)</Col>
                <Col span={4}>{data.social.socOrphans || " - "}</Col>
              </Row>
              <Row>
                <Col span={20}>Особенности развития </Col>
                <Col span={4}>{data.social.socFeature || " - "}</Col>
              </Row>
              <Row>
                <Col span={20}>Родители инвалиды </Col>
                <Col span={4}>{data.social.socParentsInvalid || " - "}</Col>
              </Row>
              <Row>
                <Col span={20}>Регионы ЧАЭС </Col>
                <Col span={4}>{data.social.socCHAES || " - "}</Col>
              </Row>
              <Row>
                <Col span={20}>Семьи из зоны загрязнения </Col>
                <Col span={4}>{data.social.socCHAESRegion || " - "}</Col>
              </Row>
            </React.Fragment>
          )}
        </Panel>
        <Panel header= " Прочее " key=" 2 ">
          {data.others}
        </Panel>
      </Collapse>
    </Card>
  );
};
