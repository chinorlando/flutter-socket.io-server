const express = require('express');
const path = require('path');
require('dotenv').config();

// const port = process.env.PORT || 3000;

// appa de express
const app = express();

// Node server
const server = require('http').createServer(app);

module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicpath = path.resolve(__dirname, 'public');
app.use(express.static(publicpath));

server.listen(process.env.PORT, "0.0.0.0", (err) => {
    if (err) throw new Error(err);
    console.log('Servidor escuchando en el puerto:', process.env.PORT);
});

// server.listen(port, "0.0.0.0", () => {
//   console.log("server started");
//   console.log('Servidor escuchando en el puerto:', port);
// });





// const express = require("express");
// var http = require("http");
// const app = express();
// const port = process.env.PORT || 3000;
// var server = http.createServer(app);
// var io = require("socket.io")(server);

// //middlewre
// app.use(express.json());
// var clients = {};

// io.on("connection", (socket) => {
//   console.log("connetetd");
//   console.log(socket.id, "has joined");
//   socket.on("signin", (id) => {
//     console.log(id);
//     clients[id] = socket;
//     console.log(clients);
//   });
//   socket.on("message", (msg) => {
//     console.log(msg);
//     let targetId = msg.targetId;
//     if (clients[targetId]) clients[targetId].emit("message", msg);
//   });
// });

// server.listen(port, "0.0.0.0", () => {
//   console.log("server started");
// });
