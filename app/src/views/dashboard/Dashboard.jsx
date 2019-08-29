import Menu from "../../components/menu/Menu";
import React from "react";
import { Switch, Route } from "react-router-dom";
import { Button , Row , Col} from "antd";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faUsers,
  faCalendarAlt,
  faIdCard
} from "@fortawesome/free-solid-svg-icons";
import Request from "../../components/request/Request";
import NotFound from "../404/404";
import PageWrapper from "../../containers/pageWrapper/PageWrapper";
import GroupLayout from "./groups";
import StudentLayout from "./students";

import GroupModal from "../../components/groupModal/GroupModal"

class Dashboard extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = { display: "flex" };
    this.click = this.click.bind(this);
  }

  click()
  {
    this.setState({ display: 'none' });
  }

  render() {
    return (
      <div style={{ display: "flex", height: "100%", flexGrow: 1 }}>
        <Menu />
        <div 
        style={{ 
          display: this.state.display, 
          flexDirection: "column", 
          height: "100%", 
          marginLeft: "auto" , 
          marginRight: "auto" , 
          paddingTop: "15vh"}}
        >
          <Row gutter={100} style={{marginBottom:"100px"}}>
            <Col span={12}>
              <NavLink to="/dashboard/groups">
                <Button 
                onClick={this.click} 
                type="primary" 
                style={{width: "20vw" , height: "20vw" , maxWidth: "300px" , maxHeight: "300px"}}>
                  <FontAwesomeIcon icon={faUsers} style={{fontSize: "60px"}} />  
                </Button>
              </NavLink>
            </Col>
            <Col span={12}>
              <NavLink to="/dashboard/students">
                <Button 
                onClick={this.click}
                type="primary" 
                style={{width: "20vw" , height: "20vw" , maxWidth: "300px" , maxHeight: "300px"}}>
                  <FontAwesomeIcon icon={faIdCard} style={{fontSize: "60px"}} />  
                </Button>
              </NavLink>
            </Col>
          </Row>
          
          <Row gutter={100}>
            <Col span={12}>
              <NavLink to="/dashboard/events">
                <Button 
                onClick={this.click}
                type="primary" 
                style={{width: "20vw" , height: "20vw" , maxWidth: "300px" , maxHeight: "300px"}}>
                  <FontAwesomeIcon icon={faCalendarAlt} style={{fontSize: "60px"}} />  
                </Button>
              </NavLink>
            </Col>
            <Col span={12}>
              <NavLink to="/dashboard/reports">
                <Button 
                onClick={this.click}
                type="primary" 
                style={{width: "20vw" , height: "20vw" , maxWidth: "300px" , maxHeight: "300px"}}>
                  <FontAwesomeIcon icon={faFileAlt} style={{fontSize: "60px"}} />  
                </Button>
              </NavLink>
            </Col>
          </Row>
        </div>
        <Switch>
          <Route
            exec
            path="/dashboard/groups"
            render={props => (
              <PageWrapper {...props} title="Группы" component={GroupLayout} />
            )}
          />
          <Route
            exec
            path="/dashboard/students"
            render={props => (
              <PageWrapper {...props} title="Студенты" component={StudentLayout} />
            )}
          />
          <Route
            exec
            path="/dashboard/reports"
            render={props => (
              <PageWrapper {...props} title="Отчеты" component={Request} />
            )}
          />
          <Route
            path="/dashboard/*"
            exact
            render={props => (
              <PageWrapper {...props} title="Упс!" component={NotFound} />
            )}
          />
        </Switch>
        <GroupModal />
      </div>
    );
  }
}

export default Dashboard;
