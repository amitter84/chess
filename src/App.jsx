//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Board } from './board.jsx';
import { Chat } from './chat.jsx';


const socket=(process.env.NODE_ENV.trim() == "development") ?  
io('http://localhost:3001') : io('http://mongrel-romantic-kitten.ngrok-free.app:80');


function App() {


const [playerName, setPlayerName] = useState('');
const [roomId, setRoomId] = useState('');
const [joined, setJoined] = useState(false);

const joinLobby = () => {
  socket.emit('joinLobby', roomId, playerName);
  setJoined(true);
};
if (!joined) {
  return (
    <div>
      <input value={playerName} onChange={e => setPlayerName(e.target.value)} placeholder="Your name" />
      <input value={roomId} onChange={e => setRoomId(e.target.value)} placeholder="Lobby ID" />
      <button onClick={joinLobby}>Join Lobby</button>
    </div>
  );
}

export default App;
