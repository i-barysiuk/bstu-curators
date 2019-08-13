import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import NotFound from "../../404/404";
import PageWrapper from "../../../containers/pageWrapper/PageWrapper";
import GroupsMenu from "../../../components/groupsMenu/GroupMenu";
import Groups from "./home/Grops";
import GroupProfile from "./profile/GroupProfile";
import GroupStudentsList from "./studentsList/GroupStudentsList";
import { fetchGroups } from "../../../redux/actions/groups";

class GroupsLayout extends React.Component {
  componentDidMount() {
    const {
      history: {
        location: { pathname }
      }
    } = this.props;
    const currentGroup = pathname.replace("/dashboard/groups", "");
    this.props.fetchGroups({ currentGroup });
    // console.log(currentGroup);
  }

  render() {
    return (
      <div style={{ display: "flex", height: "100%", flexGrow: 1 }}>
        <GroupsMenu groups={this.props.groups} />
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

const mapStateToProps = state => ({
  groups: state.groups.all
});

const mapDispatchToProps = {
  fetchGroups
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsLayout);
