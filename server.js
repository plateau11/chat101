// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the client (optional if you want to serve static files)
app.get('/', (req, res) => {
  res.send("Server is running");
});

// Listen for connection from clients
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Listen for a message from the client
  socket.on('clientMessage', (data) => {
    console.log('Message from user:', data);
    
    // Send a response back to the client
    //socket.emit('serverMessage', { message: 'Hello from server!' });
    socket.emit('serverMessage', { message: 'data' });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

