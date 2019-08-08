import React from "react";
import { Button } from "antd";

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
      <p style={{ width: "100%" }}>
        Я ТУТ!<Button type={"primary"}>123</Button>
      </p>
    );
  }
}
