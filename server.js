const server = require('./app');
require('./socket');
require('dotenv').config();
const port = 8000;

server.listen(port, () => {
  console.log(port, '포트가 켜졌습니다.');
});