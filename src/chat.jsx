import { useState, useEffect, useRef } from 'react';

export function Chat({ socket, roomId, playerName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
  socket.on('chat', (msgObj) => { // Listen for 'chat' events

    setMessages(prev => [...prev, msgObj]);
  });
  socket.on('playerJoined', (name) => {
    setMessages(prev => [...prev, { system: true, text: `${name} joined the lobby.` }]);
  });

  return () => {
    socket.off('chat');
    socket.off('playerJoined');
  };
}, [socket]);

  useEffect(() => {
    // Scroll to bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const msgObj = {
        text: input,
        sender: playerName,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit('chat', msgObj,roomId);
      setMessages(prev => [...prev, { ...msgObj, self: true }]);
      setInput('');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 10, margin: 10, color: 'white', background: '#222', borderRadius: 8 }}>
      <div style={{ height: 150, overflowY: 'auto', marginBottom: 10, background: '#333', padding: 5 }}>
        {messages.map((msg, i) => (
          msg.system ? (
            <div key={i} style={{ color: '#aaa', fontStyle: 'italic', textAlign: 'center' }}>{msg.text}</div>
          ) : (
            <div key={i} style={{ color: msg.self ? '#4caf50' : '#fff', marginBottom: 4 }}>
              <span style={{ fontWeight: 'bold' }}>{msg.sender || 'Unknown'}:</span> {msg.text}
              <span style={{ float: 'right', fontSize: '0.8em', color: '#bbb' }}>{msg.time}</span>
            </div>
          )
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: 6, borderRadius: 4, border: 'none', background: '#444', color: 'white' }}
        />
        <button type="submit" style={{ marginLeft: 8, padding: '6px 12px', borderRadius: 4, border: 'none', background: '#4caf50', color: 'white' }}>
          Send
        </button>
      </form>
    </div>
  );
}