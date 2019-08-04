import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
const PageWrapper = props => {
  useEffect(() => {
    if (props.title) document.title = props.title;
  });

  const Component = props.component;

  if (props.notAuth && props.auth.accessToken) return <Redirect to={"/"} />;

  if (props.Auth && !props.auth.accessToken) return <Redirect to={"/login"} />;

  return <Component {...props} />;
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  null
)(PageWrapper);
