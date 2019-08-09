import React from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "../../404/404";
import PageWrapper from "../../../containers/pageWrapper/PageWrapper";
import GroupsMenu from "../../../components/groupsMenu/GroupMenu";
import Groups from "./home/Grops";
import GroupProfile from "./profile/GroupProfile";
import GroupStudentsList from "./studentsList/GroupStudentsList";

class GroupsLayout extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", height: "100%" }}>
        <GroupsMenu />
        <Switch>
          <Route
            exec
            path="/dashboard/groups/:id/students"
            render={props => (
              <PageWrapper
                {...props}
                title="Отчеты"
                component={GroupStudentsList}
              />
            )}
          />
          <Route
            path="/dashboard/groups/:id"
            render={props => (
              <PageWrapper
                {...props}
                title="Студенты"
                component={GroupProfile}
              />
            )}
          />
          <Route
            exec
            path="/dashboard/groups"
            render={props => (
              <PageWrapper {...props} title="Группы" component={Groups} />
            )}
          />

          <Route
            path="/dashboard/groups/*"
            exact
            render={props => (
              <PageWrapper {...props} title="Упс!" component={NotFound} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default GroupsLayout;
