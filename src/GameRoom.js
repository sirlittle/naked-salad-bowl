import React from 'react';
import "./css/main.css";
import {
  withRouter
} from "react-router-dom";
import AddWordsComponent from './AddWordsComponents.js'

class GameRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      showFirstPaper: true,
      showSecondPaper: true,
      showThirdPaper: true,
    };
  }

  hideFirstPaper() {
    this.setState({showFirstPaper : !this.state.showFirstPaper})
  }

  hideSecondPaper() {
    this.setState({showSecondPaper : !this.state.showSecondPaper})
  }

  hideThirdPaper() {
    this.setState({showThirdPaper : !this.state.showThirdPaper})
  }

  render() {
      let { id } = this.props.match.params
      let { showFirstPaper, showSecondPaper, showThirdPaper } = this.state;
      return (
          <div>
        <h3> ID: {id} </h3>
        <div className="wordsWrapper">
          {showFirstPaper && <AddWordsComponent onSubmit={() => this.hideFirstPaper()}/>}
          {showSecondPaper && <AddWordsComponent onSubmit={() => this.hideSecondPaper()}/>}
          {showThirdPaper  && <AddWordsComponent onSubmit={() => this.hideThirdPaper()}/>}
        </div>
      </div>
      );
  }
}

export default withRouter(GameRoom);
