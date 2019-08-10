import React from "react";
import style from "./style.module.scss";

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: 0
    };
  }

  render() {
    return <Progress percentage={this.state.percentage} />;
  }
}

const Progress = props => {
  return (
    <div className={style.progressBar}>
      <Filler percentage={props.percentage} />
    </div>
  );
};

const Filler = props => {
  return (
    <div className={style.filler} style={{ width: `${props.percentage}%` }} />
  );
};

export default ProgressBar;
