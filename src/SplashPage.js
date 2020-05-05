import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "./css/main.css";

class SplashPage extends React.Component {
  createGame() {
    console.log("Creating Game");
    window.location = window.location + "create";
  }

  joinGame() {
    console.log("Joining Game");
  }

  render() {
    return (
    <div className="wrapper">
      <div className="parent inline-flex-parent">  
        <button onClick={this.createGame} className="button">Create Game</button>
        <button onClick={this.joinGame} className="button">Join Game</button>
      </div>
    </div>
    );
  }
}

export default SplashPage;
