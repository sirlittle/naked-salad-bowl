import React from 'react';
import "./css/main.css";
import {
  withRouter
} from "react-router-dom";

class GameRoom extends React.Component {
  render() {
    let { id } = this.props.match.params
    return (
      <div>
      	<h3> ID: {id} </h3>
      </div>
    );
  }
}

export default withRouter(GameRoom);
