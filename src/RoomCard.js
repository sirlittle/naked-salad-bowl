import React from 'react';
import "./css/main.css";
import openSocket from 'socket.io-client';

class RoomCard extends React.Component {
  constructor () {
      super();
      this.state = {
        response : {}
      }
  }
  componentDidMount() {
    const socket = openSocket('http://localhost:5000');
    socket.on('room_update', data => console.log(data))
    console.log(this.props.room_id);
    socket.emit('connect_to_room', {'room_name': this.props.room_id});
  }
  render() {
    return (
      <div className="wrapper">
          this is just text, check console logs
      </div>
    );
  }
}

export default RoomCard;
