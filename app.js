const express = require('express');
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const Router = require("./routes/index")




//db연결
const connect = require("./schemas");
connect();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", Router);


module.exports = app;

app.listen(3000, () => {
    console.log(3000, '포트로 서버가 열렸어요!');
  });





