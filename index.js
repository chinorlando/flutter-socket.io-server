const express = require('express');
const path = require('path');
require('dotenv').config();

// appa de express
const app = express();

// Node server
const server = require('http').createServer(app);

module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicpath = path.resolve(__dirname, 'public');
app.use(express.static(publicpath));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor escuchando en el puerto:', 30000);
});