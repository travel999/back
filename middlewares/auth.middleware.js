const jwt = require("jsonwebtoken");
const User = require("../schemas/users");

/* 로컬 환경에서 테스트 시에는 쿠키를 
   서버 환경에서 테스트 에는 헤더를 이용해주세요.*/

module.exports = (req, res, next) => {

  const { authorization } = req.headers;
  console.log(authorization);
  const [tokenType, tokenValue] = authorization.split(' ');
  console.log("토큰타입: ", tokenType, " 토큰값: ", tokenValue);

  if (tokenType !== "Bearer") {
    res.status(401).json({ result: false, error: "로그인이 필요합니다1." });

    return;
  } 

  try {
    const {userId} = jwt.verify(tokenValue, process.env.myKey); // userId 는 jwt.sign(userId : user._id)의 user._id가 할당된다.
    User.findById(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ result: false, error: "로그인이 필요합니다2." });

    return;
  }
};

