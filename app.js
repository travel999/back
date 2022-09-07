const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require('morgan');
const socket = require("socket.io");

require("dotenv").config();
const app = express();
const http = require("http");
const logger = require('./logger')
const Router = require("./routes/index");

// 패스포트연결
const passport = require("passport");
const passportConfig = require("./passport/index.js"); // passportIndex
passportConfig();

//소켓 서버 연결
const fs = require("fs");
const server  = http.createServer(app);
const io = socket(server);

app.use("/css", express.static("./static/css"))
app.use("/js", express.static("./static/js"))

app.get("/", function(request,response){
  fs.readFile("./static/index.html", function(err,data){
    if(err){
      response.send("에러");
    }else{
      response.writeHead(200, {"content-type": "text/html"});
      response.write(data);
      response.end();
    }
  })
});

io.sockets.on('connection', function(socket) {

  /* 새로운 유저가 접속했을 경우 다른 소켓에게도 알려줌 */
  socket.on('newUser', function(name) {
    console.log(name + ' 님이 접속하였습니다.')

    /* 소켓에 이름 저장해두기 */
    socket.name = name

    /* 모든 소켓에게 전송 */
    io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다.'})
  })

  /* 전송한 메시지 받기 */
  socket.on('message', function(data) {
    /* 받은 데이터에 누가 보냈는지 이름을 추가 */
    data.name = socket.name
    
    console.log(data)

    /* 보낸 사람을 제외한 나머지 유저에게 메시지 전송 */
    socket.broadcast.emit('update', data);
  })

  /* 접속 종료 */
  socket.on('disconnect', function() {
    console.log(socket.name + '님이 나가셨습니다.')

    /* 나가는 사람을 제외한 나머지 유저에게 메시지 전송 */
    socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.'});
  })
})


server.listen(8080, () => {
  console.log("8080서버 실행중");
});



//db연결
const connect = require("./schemas");
connect();


app.use(
  cors({
  // origin: true,
  origin:[
  "http://43.200.173.40:3000",
  "http://localhost:3000",
  "http://localhost:3000/kakao/callback",
  "http://localhost:3000/kakao"
  
  ],
  credentials: true
  })
);

app.use(morgan('combined', {                                  // 코드가 400 미만라면 함수를 리턴해 버려서 로그 기록 안함.
    skip : function(req, res) { return res.statusCode < 400 } // 코드가 400 이상이면 로그 기록함
}));


app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", Router);








//404에러 페이지 없을때 처리하는 미들웨어
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});


app.use((err, req, res, next) => {
  logger.error(err.message) //서버 배포할때 주석 해제해서 에러 로그가 남게 설정!!!
  res.status(err.status || 500).send(err.message);
});


app.listen(3000, () => {
    console.log(3000, '포트로 서버가 열렸어요!');
  });



module.exports = app;



