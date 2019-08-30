import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import NotFound from "../../404/404";
import PageWrapper from "../../../containers/pageWrapper/PageWrapper";
import StudentMenu from "../../../components/studentsMenu/studentMenu";
import Students from "./home/students";

class StudentLayout extends React.Component {

  render() {
    const {
      students,
      history
    } = this.props;
    return (
      <div style={{ display: "flex", height: "100%", flexGrow: 1 }}>
        <StudentMenu
          students={students}
          history={history}
        />
        <Switch>
          <Route
            exec
            path="/dashboard/students"
            render={props => (
              <PageWrapper {...props} title="Cтуденты" component={Students} />
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


export default connect(
)(StudentLayout);
