const http = require ('http');
const express = require('express');
const socketio = require('socket.io');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');

const PORT = process.env.PORT || 8000;

const router = require('./router');

const app = express();

const server = http.createServer(app);
const io = socketio(server);


io.on('connection', (socket) => {

  socket.on('join', ({name, room}, callback) => {
      const {user, error} = addUser({id: socket.id, name, room});

      if (error) return callback(error);

      socket.join(user.room); 

      socket.emit('message', { user: 'admin', text: `${user.name}, Welcome to the room ${user.room}`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`});

      callback();
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', {user: user.name, text: message});

    callback();
  })

  socket.on('disconnect', () =>{
      console.log('User has left!!');
  })
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
})