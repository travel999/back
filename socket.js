const http = require("./app");
const socketIo = require("socket.io");
const server = require("./app");

const io = socketIo(server);
const socket = io();

io.on("connection", (socket) => {
    console.log("소켓통신 연결");
  
});

