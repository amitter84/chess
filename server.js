import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer();
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  socket.on('joinLobby', (roomId, playerName) => {
    socket.join(roomId);
    socket.data.playerName = playerName;
    io.to(roomId).emit('playerJoined', playerName);
  });

  socket.on('move', (move, roomId) => {
    socket.broadcast.to(roomId).emit('move', move);
  });

  socket.on('chat', (msgObj, roomId) => {
    socket.to(roomId).emit('chat', msgObj);
  });

  socket.on('disconnect', () => {
    // Notify all rooms the user was in that they've left
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        io.to(room).emit('chat', { system: true, text: `${socket.data.playerName || 'A player'} has left.` });
      }
    }
  });
});

server.listen(3001, () => {
  console.log('Socket.IO server running on port 3001');
});