import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import NotFound from "../../404/404";
import PageWrapper from "../../../containers/pageWrapper/PageWrapper";
import GroupsMenu from "../../../components/groupsMenu/GroupMenu";
import Groups from "./home/Grops";
import GroupProfile from "./profile/GroupProfile";
import GroupStudentsList from "./studentsList/GroupStudentsList";
import { fetchGroups, fetchActiveGroup } from "../../../redux/actions/groups";

class GroupsLayout extends React.Component {
  componentDidMount() {
    this.props.fetchGroups();
  }

  render() {
    const { fetchActiveGroup, groups, history } = this.props;
    return (
      <div style={{ display: "flex", height: "100%", flexGrow: 1 }}>
        <GroupsMenu groups={groups} history={history} />
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
                fetchGroup={fetchActiveGroup}
                group={groups.active}
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

const mapStateToProps = state => ({
  groups: state.groups
});

const mapDispatchToProps = {
  fetchGroups,
  fetchActiveGroup
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsLayout);
