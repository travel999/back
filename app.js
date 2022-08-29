const express = require('express');

const indexRouter = require("./routes/index")
require("dotenv").config();

const app = express();


//db연결
const connect = require("./schemas");
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);


module.exports = app;

app.listen(3000, () => {
    console.log(3000, '포트로 서버가 열렸어요!');
  });