const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const Router = require("./routes/index");
require("dotenv").config();

//db연결
const connect = require("./schemas");
connect();

app.use(
  cors({
  credentials: true,
  origin: "http://localhost:3000",
  })
  );

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", Router);


module.exports = app;

app.listen(3000, () => {
    console.log(3000, '포트로 서버가 열렸어요!');
  });





