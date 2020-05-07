import React from 'react';
import CreateRoomCard from './CreateRoomCard.js'
import JoinRoomCard from './JoinRoomCard.js'

import "./css/main.css";

class SplashPage extends React.Component {
  constructor() {
    super();
    this.state = {
      joinRoomClicked: true,
    };
  }
  
  createGame() {
    this.setState({ joinRoomClicked: false })
    console.log("Creating Game Card Shown");
  }

  joinGame() {
    this.setState({ joinRoomClicked: true })
    console.log("Joining Game Card Shown");
  }

  render() {
    var joinRoomClicked = this.state.joinRoomClicked;
    return (
      <div className="wrapper">
        <div className="parent inline-flex-parent">
          <button onClick={() => this.createGame()} className="orange">Create Game</button>
          <button onClick={() => this.joinGame()} className="blue">Join Game</button>
        </div>
        {!joinRoomClicked && <CreateRoomCard />}
        {joinRoomClicked && <JoinRoomCard />}
      </div>
    );
  }
}

export default SplashPage;
