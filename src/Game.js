import React from 'react';
import CreateRoomCard from './CreateRoomCard.js'
import AddWordsComponent from './AddWordsComponents.js'
import GameRoom from './GameRoom.js'
import SplashPage from './SplashPage.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default class Game extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route exact path="/create">
            <CreateRoomCard />
          </Route>
          <Route path="/room/:id">
            <GameRoom />
          </Route>  
          <Route path="/test">
          	<AddWordsComponent />
          </Route>
       </Switch>

      </Router>
    );
  }
}
