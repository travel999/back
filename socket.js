const http = require("./app");
const socketIo = require("socket.io");
const server = require("./app");

const io = socketIo(server);
const socket = io();


