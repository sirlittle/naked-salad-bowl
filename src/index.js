import React from 'react';
import ReactDOM from 'react-dom';
import CreateRoomCard from './CreateRoomCard.js';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCFbf8nmSOZXSgSQwaIZ1rfQs0XjjAMg_I",
  authDomain: "naked-salad-bowl.firebaseapp.com",
  databaseURL: "https://naked-salad-bowl.firebaseio.com",
  projectId: "naked-salad-bowl",
  storageBucket: "naked-salad-bowl.appspot.com",
  messagingSenderId: "876467476462",
  appId: "1:876467476462:web:89fda7706f7ecca368e0ff",
  measurementId: "G-E2T6H9HMH4"
};

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <CreateRoomCard />,
  document.getElementById('root')
);
