import React from 'react';
import CreateRoomCard from './CreateRoomCard.js'
const firebase = require("firebase");
require("firebase/firestore");

export default class Game extends React.Component {
  render() {
    return <CreateRoomCard />
  }
}
