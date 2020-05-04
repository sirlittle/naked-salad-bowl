import React from 'react';
import CreateRoomCard from './CreateRoomCard.js'
import AddWordsComponent from './AddWordsComponents.js'
import GameRoom from './GameRoom.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

const firebase = require("firebase");
require("firebase/firestore");

export default class Game extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
        	<CreateRoomCard />
          </Route>
          <Route path="/room/:id">
          	<GameRoom />
          </Route>	
          <Route path="/test">
          	<AddWordsComponent/>
          </Route>
       </Switch>

      </Router>
    );
  }
}
