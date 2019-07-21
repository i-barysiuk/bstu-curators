import React from 'react';
import api from '../../helper/api';

export default class Request extends React.Component {
  state = {
    people: []
  }
  componentDidMount() {
    api(`http://localhost:3000/`)
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


