import React from "react";
import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

export default class Colapse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isContenShow: props.show || false
    };
  }

  onToggle = () => {
    if (!this.state.isContenShow && this.props.fetch) {
      this.props.fetch();
    }
    this.setState({ isContenShow: !this.state.isContenShow });
  };

  render() {
    return (
      <div className={style.container}>
        <div className={style.header} onClick={this.onToggle}>
          <div>
            <FontAwesomeIcon className={style.icons} icon={this.props.icon} />
            {this.props.title}
          </div>
          <div>
            <FontAwesomeIcon
              className={style.icons}
              icon={this.state.isContenShow ? faAngleDown : faAngleUp}
            />
          </div>
        </div>
        <div
          className={
            style.content + " " + (this.state.isContenShow ? style.expand : "")
          }
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
