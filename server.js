const server = require("./app");
const port = process.env.Port
require("dotenv").config();
require("./socket");


server.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

