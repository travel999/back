// const app = require("./app");
// const http = require('http');



// const webSocket = require('./socket');
// const server = http.createServer(app);


  
// webSocket(server, app);  //소켓 서버 열기nod


// const http = require("./app");
// const port = process.env.Port;
// require("dotenv").config();
// require("./socket");

const server = require("./app");
const port = process.env.Port
require("dotenv").config();
require("./socket");

// server.listen(port, () => {
// 	console.log(`Server start at http://localhost:${port}`);
// });

server.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});