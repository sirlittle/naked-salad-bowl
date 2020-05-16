import React from 'react';
import "./css/main.css";
import {
  withRouter
} from "react-router-dom";
import AddWordsComponent from './AddWordsComponents.js';
import RoomCard from './RoomCard.js';

class GameRoom extends React.Component {
  constructor() {
    super(); // need to add props here
    this.state = {
      showFirstPaper: true,
      showSecondPaper: true,
      showThirdPaper: true,
      path: window.location.pathname
    };
  }

  hideFirstPaper() {
    this.setState({ showFirstPaper: !this.state.showFirstPaper })
  }

  hideSecondPaper() {
    this.setState({ showSecondPaper: !this.state.showSecondPaper })
  }

  hideThirdPaper() {
    this.setState({ showThirdPaper: !this.state.showThirdPaper })
  }

  render() {
    let { showFirstPaper, showSecondPaper, showThirdPaper } = this.state;
    let room_id = this.props.match.params.id;
    console.log(room_id)
    return (
      <div>
        <h3> ID: {this.state.path} </h3>
        <RoomCard room_id={room_id}/>
        <div className="wordsWrapper">
          {showFirstPaper && <AddWordsComponent onSubmit={() => this.hideFirstPaper()} />}
          {showSecondPaper && <AddWordsComponent onSubmit={() => this.hideSecondPaper()} />}
          {showThirdPaper && <AddWordsComponent onSubmit={() => this.hideThirdPaper()} />}
        </div>
      </div>
    );
  }
}

export default withRouter(GameRoom);
