import React from "react";
import { Steps } from "antd";

const { Step } = Steps;

export default props => {
  const items = [];

  for (var i = 0; i < props.total; i++) {
    items.push(<Step key={i} />);
  }

  return (
    <Steps progressDot current={props.current - 1} className={props.className}>
      {items}
    </Steps>
  );
};
