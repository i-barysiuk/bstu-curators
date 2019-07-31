import Menu from "../../components/menu/Menu";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Request from "../../components/request/Request";
import Groups from "../../components/dashboard/Group";

class Dashboard extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", height: "100%" }}>
        <Menu />
        <Switch>
          <Route path="/dashboard/groups" component={Groups} />
          <Route path="/dashboard/students" component={Request} />
          <Route path="/dashboard/reports" component={Request} />
        </Switch>
      </div>
    );
  }
}

export default Dashboard;
