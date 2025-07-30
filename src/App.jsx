//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Board } from './board.jsx';
import { Chat } from './chat.jsx';


const socketUrl = import.meta.env.DEV
  ? 'http://localhost:3001'
  : 'https://mongrel-romantic-kitten.ngrok-free.app';

const socket = io(socketUrl, {
  // Using websocket transport directly can be more reliable with proxies like ngrok
  transports: ['websocket'],
});





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
 return (
  <div>
      <Board socket={socket} roomId={roomId} playerName={playerName} />
    <Chat socket={socket} roomId={roomId} playerName={playerName} />
  </div>
);
}
export default App;
