import Menu from "../../components/menu/Menu";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Request from "../../components/request/Request";
import NotFound from '../../components/404/404';

class Dashboard extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", height: "100%" }}>
        <Menu />
        <Switch>
          <Route exact path="/dashboard"/>
          <Route exact path="/dashboard/groups"   component={Request} />
          <Route exact path="/dashboard/students" component={Request} />
          <Route exact path="/dashboard/reports"  component={Request} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default Dashboard;
