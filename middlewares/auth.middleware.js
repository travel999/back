const jwt = require("jsonwebtoken");
const User = require("../schemas/users");

/* 로컬 환경에서 테스트 시에는 쿠키를 
   서버 환경에서 테스트 에는 헤더를 이용해주세요.*/

module.exports = (req, res, next) => {
<<<<<<< HEAD
  // const  token  = req.headers.token;
  const {token} = req.cookies;
=======
  const  token  = req.headers.token;
  // const {token} = req.cookies;
>>>>>>> 32b1eef3022e9c3cc7c40e952c57b74ae27f7a2f
  console.log("토큰 확인", token);

  if (!token) {
    res.status(401).json({ result: false, error: "로그인이 필요합니다1." });

    return;
  } 

  try {
    const {userId} = jwt.verify(token, process.env.myKey); // userId 는 jwt.sign(userId : user._id)의 user._id가 할당된다.
    User.findById(userId).then((user) => {
      res.locals.user = user;
<<<<<<< HEAD
=======
      console.log("유저정보:", res.locals.user);
>>>>>>> 32b1eef3022e9c3cc7c40e952c57b74ae27f7a2f
      next();
    });
  } catch (error) {
    res.status(401).json({ result: false, error: "로그인이 필요합니다2." });

    return;
  }
};
<<<<<<< HEAD
=======

>>>>>>> 32b1eef3022e9c3cc7c40e952c57b74ae27f7a2f
