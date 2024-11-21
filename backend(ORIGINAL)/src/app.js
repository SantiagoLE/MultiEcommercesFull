// app.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');
require('dotenv').config();

const app = express();
const http = require('http');
const { Server } = require('socket.io');

// Crear un servidor HTTP
const server = http.createServer(app);

// Crear una instancia de Socket.io
const io = new Server(server, {
  cors: {
    // origin: "*",
    // methods: ["GET", "POST"]
  }
});

// Middleware para pasar `io` a los controladores
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.json());
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors());

app.use('/api/v1', router);

app.get('/', (req, res) => {
  return res.send("Welcome to express!");
});

app.use(errorHandler);

// Exportar la aplicación y el servidor para uso en server.js
module.exports = { app, server, io };
