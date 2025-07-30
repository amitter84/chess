//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Board } from './board.jsx';
import { Chat } from './chat.jsx';
import { Lobby } from './Lobby.jsx';

const socketUrl = import.meta.env.DEV
  ? 'http://localhost:3001'
  : import.meta.env.VITE_SOCKET_URL;
  





function App() {
  const [socket, setSocket] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [joined, setJoined] = useState(false);

  // Effect to manage the socket connection
  useEffect(() => {
    const newSocket = io(socketUrl, {
      transports: ['websocket'],
    });
    setSocket(newSocket);

    // Cleanup on component unmount
    return () => newSocket.close();
  }, []);

  const handleJoinLobby = (name, room) => {
    if (socket) {
      setPlayerName(name);
      setRoomId(room);
      socket.emit('joinLobby', room, name);
      setJoined(true);
    }
  };

  if (!joined || !socket) {
    return <Lobby onJoin={handleJoinLobby} />;
  }

  return (
    <div>
      <Board socket={socket} roomId={roomId} playerName={playerName} />
      <Chat socket={socket} roomId={roomId} playerName={playerName} />
    </div>
  );
}
export default App;
