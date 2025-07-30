import React, { useState } from 'react';

export function Lobby({ onJoin }) {
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');

  const handleJoin = () => {
    if (playerName.trim() && roomId.trim()) {
      onJoin(playerName, roomId);
    }
  };

  return (
    <div style={styles.lobbyContainer}>
      <h2>Join a Chess Game</h2>
      <input
        style={styles.input}
        value={playerName}
        onChange={e => setPlayerName(e.target.value)}
        placeholder="Your name"
      />
      <input
        style={styles.input}
        value={roomId}
        onChange={e => setRoomId(e.target.value)}
        placeholder="Lobby ID"
      />
      <button style={styles.button} onClick={handleJoin}>Join Lobby</button>
    </div>
  );
}

const styles = {
  lobbyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: '10px',
    background: '#282c34',
    color: 'white',
  },
  input: { padding: '10px', fontSize: '16px', width: '200px', borderRadius: '4px', border: '1px solid #ccc' },
  button: { padding: '10px 20px', fontSize: '16px', cursor: 'pointer', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px' }
};