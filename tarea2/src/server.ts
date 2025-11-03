import express from 'express';
import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import path from 'path';

const app = express();

const port =  3000;

const server: Server = app.listen(port, () => {
    console.log(`api running on port ${port}`);
}); 
const io = new SocketServer(server, {
    cors:{
        origin: '*'
    }
});

const ROOMS = ['carnita asada', 'cafeteros', 'hikers'];

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/rooms', (_req, res) => {
  res.json(ROOMS);
});

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on('joinRoom', ({ room, username }) => {
    socket.join(room);
    const time = new Date().toISOString();
    socket.to(room).emit('systemMessage', { text: `${username} ha ingresado.`, time });
  });

  socket.on('leaveRoom', ({ room, username }) => {
    socket.leave(room);
    const time = new Date().toISOString();
    socket.to(room).emit('systemMessage', { text: `${username} ha salido.`, time });
  });

  socket.on('sendMessage', ({ room, username, message }) => {
    const time = new Date().toISOString();
    const payload = { username, message, time };
    io.to(room).emit('chatMessage', payload);
  });

  socket.on('disconnecting', () => {
    console.log('disconnecting', socket.id);
  });
});

