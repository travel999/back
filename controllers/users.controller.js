const UserService = require("../services/users.service");
const jwt = require("jsonwebtoken");
const NoticeService = require('../services/notis.service');
class UserController {
  userService = new UserService();
  notisService = new NoticeService();

  createUser = async (req, res, next) => {
    const { email, nickname, password, confirm } = req.body;
    let userImage = "";
    if (req.file) userImage = req.file.location;
    const regPassword = /^[A-Za-z0-9]{6,20}$/;

    if (password !== confirm) {
      return res.status(411).json({ statusCode: "411: 입력하신 비밀번호가 일치하지 않습니다." });
    }
    if (!regPassword.test(password)) {
      return res.status(412).json({ statusCode: "412: 비밀번호 양식 위반." });
    }
    const nicknameCheck = await this.userService.checkNickname(nickname);
    if (nicknameCheck.result === false) {
      return res.status(413).json({ statusCode: "413", nicknameCheck });
    }
    const emailCheck = await this.userService.checkEmail(email);
    if (emailCheck.result === false) {
      return res.status(414).json({ statusCode: "414", emailCheck });
    }
    const emailValidate = await this.userService.emailValidate(email);
    if(emailValidate.result === false){
      return res.status(415).json({ statusCode:"415", emailValidate});
    }
    const user = await this.userService.createUser(
      email,
      nickname,
      userImage,
      password,
      confirm
    );
    if (user) {
      await this.notisService.createNoticeBoard( user );
      return res.status(201).json({ statusCode: "201: 새로운 유저 정보가 등록되었습니다." });
    } else {
      return res.status(400).json({ statusCode: "400: 오류 발생." });
    }

  };

  checkEmail = async (req, res, next) => {
    const { signUp } = req.body;
    const email = signUp.email;
    const checked = await this.userService.checkEmail(email);
    if (checked.result === true) {
      return res.status(200).json(checked);
    }
    else {
      return res.status(400).json(checked);
    }

  };

  sendEmail = async(req,res,next) => {
    const { email } = req.body;
    const emailSent = await this.userService.sendEmail(email);  
    if (emailSent.result === true){
      return res.status(200).json(emailSent);
    }
    else{
      return res.status(400).json(emailSent);
    }

  }

  checkCode = async (req,res,next) => {
    const { email,code } = req.body;
    const checkResult = await this.userService.checkCode(email,code);
    
    if(checkResult.result === true){
      return res.status(200).json(checkResult);
    }
    else{
      return res.status(400).json(checkResult);
    }
  }

  checkNickname = async (req, res, next) => {
    const { signUp } = req.body;
    const nickname = signUp.nickname;
    const checked = await this.userService.checkNickname(nickname);

    if (checked.result === true) {
      return res.status(200).json(checked);
    }
    else {
      return res.status(400).json(checked);
    }


  };

  findUser = async (req, res, next) => {
    const { nickname, password } = res.locals.user;

    const userInfo = await this.userService.findUser(
      nickname,
      password,
    );

    if (userInfo.result === true) {
      res.status(200).json({ data: userInfo });
    } else {
      res.status(400).json(userInfo);
    }
  };

  updateImage = async (req, res, next) => {
    let newImage = "";
    if (req.file) newImage = req.file.location;
    const { nickname } = res.locals.user;
    const userInfo = await this.userService.updateImage(nickname, newImage);

    if (userInfo.result === true) {
      res.status(200).json(userInfo);
    } else {
      res.status(400).json(userInfo);
    }
  };

  updatePassword = async (req, res, next) => {
    const { newPassword, confirm } = req.body;
    const { nickname, password } = res.locals.user;
    const userInfo = await this.userService.updatePassword(nickname, password, newPassword, confirm);

    if (userInfo.result === true) {
      res.status(200).json(userInfo);
    } else {
      res.status(400).json(userInfo);
    }
  };

  deleteUser = async (req, res, next) => {
    const { nickname } = res.locals.user;

    const userInfo = await this.userService.deleteUser(nickname);

    if (userInfo.result === true) {
      res.status(200).json(userInfo);
    } else {
      res.status(400).json(userInfo);
    }
  };

  userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await this.userService.userLogin(email, password);

    try{
      if (user) {
        if (user.result === false) {
          return res.status(400).json(user);
        }
        const token = jwt.sign({ userId: user._id }, process.env.myKey);
        return res.status(200).json({ statusCode: "200: 로그인 성공.", token, image: user.userImage, nickname: user.nickname });
      }
      else {
        return res.status(400).json({ statusCode: "400: 입력한 정보를 확인해주세요." });
      }
    }catch(err){
      console.log(err)
      err.status = 400
      next(err);
    }
    
  };

  userLogout = async (req, res, next) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ result: true, message: "로그아웃" });

    } catch (error) {
      res.status(400).json({ result: false, error: "네트워크 에러" });
    }

  };

  getmine = async (req, res, next) => {

    const { nickname } = res.locals.user;
    const post = await this.userService.findPost(nickname);
    res.status(400).json({ post });
  }
}

module.exports = UserController;
