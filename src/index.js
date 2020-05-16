import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game.js';
import * as firebase from 'firebase';
import firestoreConfig from './config/firestoreConfig.js'

firebase.initializeApp(firestoreConfig);

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
