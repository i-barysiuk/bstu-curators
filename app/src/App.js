import React from "react";
import { connect } from "react-redux";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Login from "./views/login/Login";
import Register from "./views/register/Register";
import Welcom from "./views/dashboard/Dashboard";
import Dashboard from "./views/dashboard/Dashboard";
import NotFound from "./views/404/404";

import history from "./helper/history";
import Analitic from "./helper/analitics";

import PageWrapper from "./containers/pageWrapper/PageWrapper";

import { logout } from "./redux/actions/auth";
import { whoAmI } from "./redux/actions/users";

history.listen(location => {
  Analitic.pageview(location.pathname);
});

class App extends React.Component {
  componentDidMount() {
    Analitic.pageview(window.location.pathname);
    if (this.props.auth.accessToken)
      this.props.whoAmI().catch(() => {
        this.props.logout();
      });
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <PageWrapper {...props} title="Главная" component={Welcom} />
          )}
        />
        <Route
          path="/login"
          render={props => (
            <PageWrapper {...props} title="Вход" component={Login} notAuth />
          )}
        />
        <Route
          path="/register"
          render={props => (
            <PageWrapper
              {...props}
              title="Регистрация"
              component={Register}
              notAuth
            />
          )}
        />
        <Route
          path="/dashboard"
          render={props => <PageWrapper {...props} component={Dashboard} />}
        />
        <Route
          path="*"
          exact
          render={props => (
            <PageWrapper {...props} title="Упс!" component={NotFound} />
          )}
        />
      </Switch>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = {
  logout,
  whoAmI
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
