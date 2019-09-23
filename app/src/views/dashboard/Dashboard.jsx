import Menu from "../../components/menu/Menu";
import FourButtons from  "../../components/fourButtons/FourButtons";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Request from "../../components/request/Request";
import NotFound from "../404/404";
import PageWrapper from "../../containers/pageWrapper/PageWrapper";
import GroupLayout from "./groups";
import StudentLayout from "./students";
import style from "./style.module.scss";

import GroupModal from "../../components/groupModal/GroupModal";
import EventModal from "../../components/eventModal/EventModal";
import StudentModal from "../../components/studentModal/StudentModal"

class Dashboard extends React.Component {
  render() {
    return (
      <div className={style.dashboard}>
        <Menu /> 
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
              <PageWrapper
                {...props}
                title="Студенты"
                component={StudentLayout}
              />
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
            exec
            path="/dashboard"
            render={props => (
              <PageWrapper {...props} title="Меню" component={FourButtons} />
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
        <StudentModal />
        <EventModal />
      </div>
    );
  }
}

export default Dashboard;
