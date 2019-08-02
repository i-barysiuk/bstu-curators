import React from "react";
import api from "../../helper/api";
import groupModal from "./Group"

export default class Request extends React.Component {
  // state = {
  //   people: []
  // };
  // componentDidMount() {
  //   api(`http://localhost:3000/`).then(res => {
  //     const people = res.data;
  //     this.setState({ people });
  //   });
  // }

  render() {
    return (
    <div>
    <groupModal/>
    <p>Я ТУТ!</p>
    </div>
    );
  }
}
