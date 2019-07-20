import React from 'react';
import axios from 'axios';
 
export default class Request extends React.Component {
  state = {
    people: []
  }
  componentDidMount() {
    axios.get(`http://localhost:3000/`)
      .then(res => {
        const people= res.data;
        this.setState({ people});
      })
  }
 
  render() {
    return (
      <ol>
        { this.state.people}
      </ol>
    )
  }
}


