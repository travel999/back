const express = require('express');
const Router = require("./routes/index")
const app = express();

require("dotenv").config();




//db연결
const connect = require("./schemas");
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", Router);


module.exports = app;

app.listen(3000, () => {
    console.log(3000, '포트로 서버가 열렸어요!');
  });