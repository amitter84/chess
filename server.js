import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer();
const io = new Server(server, { 
cors: {
    // It's good practice to restrict this to your frontend's URL
    origin: ['http://localhost:5173', 'https://amitter84.github.io'],
    methods: ['GET', 'POST'],
  }
});

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

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});