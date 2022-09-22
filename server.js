const app = require("./app");
const http = require('http');
require("dotenv").config();
const port = process.env.Port;

const webSocket = require('./socket');
const server = http.createServer(app);

server.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
  });

  
webSocket(server, app);  //소켓 서버 열기