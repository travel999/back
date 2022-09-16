const nodemailer = require('nodemailer');
const crypto = require("crypto");

module.exports = async (req, res, next) => {
  const { email, title, desc, username } = req.body; // 보낼 이메일 주소, 이메일 제목, 이메일 본문, 받는 사람 이름
  try {
  // 전송하기
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com', // gmail server 사용
      port: 587,
      secure: false,
      auth: {
        user: process.env.GOOGLEID, // 보내는 사람의 구글계정 메일 
        pass: process.env.GOOGLEPW, // 보내는 사람의 구글계정 비밀번호 (또는 생성한 앱 비밀번호)
      },
    });

    const code = crypto.randomBytes(3).toString('hex'); // 해시코드 생성
    
    // 보낼 메세지
    let message = {
      from: "origachi99@gmail.com", // 보내는 사람
      to: `${username}<${email}>`, // 받는 사람 이름과 이메일 주소
      subject: "테스트 메일", // 메일 제목
      html: `<div // 메일 본문 -> html을 이용해 꾸며서 보낼수 있다
      style='
      text-align: center; 
      width: 50%; 
      height: 60%;
      margin: 15%;
      padding: 20px;
      box-shadow: 1px 1px 3px 0px #999;
      '>
      <h2> ${username}님, 안녕하세요.</h2> <br/> <h2>제목: ${title}</h2> <br/>${desc} <br/><br/>${code}<br/><br/></div>`,
    };
    
    // 메일이 보내진 후의 콜백 함수
    transporter.sendMail(message, (err) => {
      if (err) next(err);
      else res.status(200).json({ isMailSucssessed: true});
    });
  } catch (err) {
    next(err);
  }
};