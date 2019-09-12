import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import NotFound from "../../404/404";
import PageWrapper from "../../../containers/pageWrapper/PageWrapper";
import GroupsMenu from "../../../components/groupsMenu/GroupMenu";
import Groups from "./home/Grops";
import GroupProfile from "./profile/GroupProfile";
import GroupStudentsList from "./studentsList/GroupStudentsList";
import {
  fetchMyAndFavGroups,
  fetchActiveGroup,
  fetchAllGroups,
  fetchArchiveGroups
} from "../../../redux/actions/groups";
import style from "./style.module.scss";

class GroupsLayout extends React.Component {
  componentDidMount() {
    this.props.fetchMyAndFavGroups();
  }

  render() {
    const {
      fetchActiveGroup,
      fetchAllGroups,
      fetchArchiveGroups,
      groups,
      history
    } = this.props;
    return (
      <div className={style.layout}>
        <GroupsMenu
          groups={groups}
          fetchAll={fetchAllGroups}
          fetchArchive={fetchArchiveGroups}
          history={history}
        />
        <Route
          exact
          path="/dashboard/groups"
          render={props => (
            <PageWrapper {...props} title="Группы" component={Groups} />
          )}
        />
        <Switch>
          <Route
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
            path="/dashboard/groups/*"
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
  fetchMyAndFavGroups,
  fetchActiveGroup,
  fetchAllGroups,
  fetchArchiveGroups
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsLayout);
