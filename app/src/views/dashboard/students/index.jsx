import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import NotFound from "../../404/404";
import PageWrapper from "../../../containers/pageWrapper/PageWrapper";
import StudentMenu from "../../../components/studentsMenu/studentMenu";
import Students from "./home/students";
import StudentProfile from "./profile/StudentProfile";
import style from "./style.module.scss";

class StudentLayout extends React.Component {
  render() {
    return (
      <div className={style.layout}>
        <StudentMenu />
        <Route
          exact
          path="/dashboard/students"
          render={props => (
            <PageWrapper {...props} title="Cтуденты" component={Students} />
          )}
        />
        <Switch>
          <Route
            path="/dashboard/students/id"
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
