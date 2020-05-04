import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game.js';
import * as firebase from 'firebase';
import firebaseConfig from '../configs/firebaseConfig.js'

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
