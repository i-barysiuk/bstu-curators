import React, { useEffect } from "react";

const PageWrapper = props => {
  useEffect(() => {
    if (props.title) document.title = props.title;
  });

  const Component = props.component;

  return <Component {...props} />;
};

export default PageWrapper;
