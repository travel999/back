const UserRepository = require("../repositories/users.repository");
// const crypto = require("crypto");
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const { send } = require("process");

class UserService {
  userRepository = new UserRepository();

  createUser = async (email, nickname, userImage, password) => {
    const createUserData = await this.userRepository.createUser(
      email,
      nickname,
      userImage,
      password,
    );
    return createUserData;
  };

  checkEmail = async (email) => {
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (!regEmail.test(email)) {
      return { result: false, message: "이메일 양식 위반." }
    }
    const checked = await this.userRepository.checkEmail(email);
    
    return checked;
  };

  emailValidate = async (email) => {
    const checked = await this.userRepository.emailValidate(email);

    if(!checked){
      return {result:false, message:"이메일 인증이 필요합니다."};
    }

    if(checked.verified === false){
      return {result:false, message:"인증되지 않은 이메일입니다."}
    }

    return {result:true, message:"인증된 이메일입니다."};
  }

  sendEmail = async (email) => {
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    // const code = crypto.randomBytes(10).toString('hex');
    let code = Math.random().toString(36).substr(2,8);
    if (!regEmail.test(email)) {
      return { result: false, message: "이메일 양식 위반." }
    }

    const emailSent = await this.userRepository.sendEmail(email, code);
    if (emailSent) {

      let emailTemplete;

      ejs.renderFile("./template/authMail.ejs", { authCode: emailSent.code, nickname: emailSent.email }, function (err, data) {
        if (err) { console.log(err) }
        emailTemplete = data;
      });

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.GOOGLEID,
          pass: process.env.GOOGLEPW,
        },
      });

      let mailOptions = await transporter.sendMail({
        from: "오리가치",
        to: emailSent.email,
        subject: '회원가입을 위한 인증번호를 입력해주세요.',
        html: emailTemplete,
      });

      transporter.sendMail(mailOptions, (error, responses) => {
        if (error) {
          console.log({ msg: 'err' });
        } else {
          console.log({ msg: 'sucess' });
        }
        transporter.close();
      });

      return { result: true, message: "이메일 전송 선공." };
    } else {
      return { result: false, message: "이메일&코드 전송 과정에서 오류 발생." };
    }

  };

  checkCode = async (email,code) => {
    const checkResult = await this.userRepository.checkCode(email,code);
    
    if(checkResult.verified === true){
      return {result:true, message: "이메일 인증 완료"};
    }
    else{
      return {result:false, message: "코드가 일치하지 않습니다"};
    }
  }

  checkNickname = async (nickname) => {
    const regNickname = /^[A-Za-z가-힣0-9]{2,15}$/;

    if (!regNickname.test(nickname)) {
      return { result: false, message: "닉네임 양식 위반." };
    }
    const checked = await this.userRepository.checkNickname(nickname);
    return checked;

  };

  userLogin = async (email, password) => {
    const userData = await this.userRepository.login(email, password);

    return userData;

  };

  findUser = async (nickname, password) => {
    const userInfo = await this.userRepository.findUser(nickname, password);

    if (userInfo) {
      return { result: true, userInfo };
    }
    else {
      return { result: false, message: "정보 조회 실패" };
    }

  };

  updateImage = async (nickname, newImage) => {
    const updateUser = await this.userRepository.updateImage(nickname, newImage);
    if (updateUser.userImage === newImage) {
      return { result: true, message: "유저 이미지가 변경되었습니다", updateUser };
    } else {
      return { result: false, message: "네트워크 에러", updateUser };
    }

  };

  updatePassword = async (nickname, password, newPassword, confirm) => {

    const regPassword = /^[A-Za-z0-9]{6,20}$/;

    if (password === newPassword) {
      return { result: false, message: "새로운 비밀번호를 입력하세요" };
    }

    if (newPassword !== confirm) {
      return { result: false, message: "비밀번호가 일치하지 않습니다" };
    }

    if (!regPassword.test(newPassword)) {
      return { result: false, message: "비밀번호 양식위반" };
    }


    const userInfo = await this.userRepository.updatePassword(nickname, newPassword);

    if (userInfo.password === newPassword) {
      return { result: true, message: "비밀번호가 변경되었습니다" };
    } else {
      return { result: false, message: "네트워크 에러" };
    }
  };

  deleteUser = async (nickname) => {
    const userInfo = await this.userRepository.deleteUser(nickname);

    if (!userInfo) {
      return { result: true, message: "유저 정보를 삭제하였습니다" };
    } else {
      return { result: false, message: "네트워크에러" };
    }
  };

  findPost = async (nickname) => {
    const post = await this.userRepository.findPost(nickname);
    if (!post.length) {
      return { Message: '나의 일정 조회에 실패하였습니다.' }
    }
    return post
  };

}
module.exports = UserService;
