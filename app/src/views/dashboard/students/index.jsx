import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import NotFound from "../../404/404";
import PageWrapper from "../../../containers/pageWrapper/PageWrapper";
import StudentMenu from "../../../components/studentsMenu/studentMenu";
import Students from "./home/students";
import StudentProfile from "./profile/StudentProfile";

class StudentLayout extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", height: "100%", flexGrow: 1 }}>
        <StudentMenu />
        <Switch>
          <Route
            exec
            path="/dashboard/students"
            render={props => (
              <PageWrapper
                {...props}
                title="Cтуденты"
                component={StudentProfile}
              />
            )}
          />
          <Route
            path="/dashboard/students/*"
            // exact
            render={props => (
              <PageWrapper {...props} title="Упс!" component={NotFound} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default connect()(StudentLayout);
