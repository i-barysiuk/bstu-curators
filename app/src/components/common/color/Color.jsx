import React from "react";

function percentageToHsl(percentage, hue0, hue1) {
  var hue = percentage * (hue1 - hue0) + hue0;
  return "hsl(" + hue + ", 100%, 50%)";
}

export default props => {
  return (
    <div
      style={{
        color: percentageToHsl(props.percentage, props.hue0, props.hue1)
      }}
    >
      {props.children}
    </div>
  );
};
