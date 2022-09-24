const express = require('express');
const http = require("http");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require('morgan');
const fs = require('fs');


require("dotenv").config();
const app = express();

const server = http.createServer(app);
const logger = require('./logger')
const Router = require("./routes/index");

// 패스포트연결
const passport = require("passport");
const passportConfig = require("./passport/index.js"); // passportIndex
passportConfig();


//db연결
const connect = require("./schemas");
const { fstat } = require('fs');
connect();


app.use(
  cors({
    // origin: true,
    origin: [
      "http://54.180.131.25:3000",
      "http://localhost:3000",
      "http://oorigachi.com"
        ],
    credentials: true
  })
);



app.use(morgan('combined', {                                  // 코드가 400 미만라면 함수를 리턴해 버려서 로그 기록 안함.
  skip: function (req, res) { return res.statusCode < 400 } // 코드가 400 이상이면 로그 기록함
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
  // logger.error(err.message) //서버 배포할때 주석 해제해서 에러 로그가 남게 설정!!!
  res.status(err.status || 500).send(err.message);
});


module.exports = server;



