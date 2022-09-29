const jwt = require("jsonwebtoken");
const User = require("../schemas/users");

module.exports = (req, res, next) => {

  try {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');
    if (tokenType !== "Bearer") {
      res.status(401).json({ result: false, error: "로그인이 필요합니다1." });
      return
    }
    const { userId } = jwt.verify(tokenValue, process.env.myKey); // userId 는 jwt.sign(userId : user._id)의 user._id가 할당된다.
    User.findById(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ result: false, error: "로그인이 필요합니다2." });

    return;

  }
};

