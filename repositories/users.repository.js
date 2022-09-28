const User = require("../schemas/users");
const Post = require("../schemas/posts");
const bcrypt = require("bcrypt");
const salt = 12;
const Email = require("../schemas/emailValidation");

class UserRepository {
    
  createUser = async (email, nickname, userImage, password) => {
    const hash = await bcrypt.hash(password, salt);
    const createUserData = await User.create({
      email,
      nickname,
      userImage,
      password: hash,
    });
  
    return createUserData;
  };


  checkEmail = async (email) => {
    const user = await User.findOne({ email });

    if (user) {
      return { result: false, message: "이미 사용 중인 이메일입니다." };
    }
    else {
      return { result: true, message: "사용 가능한 이메일입니다." };
    }
  }

  emailValidate = async (email) => {
    const userEmail = await Email.findOne({email});

    return userEmail;
  }

  sendEmail = async (email,code) => {
    const userEmailInfo = await Email.findOne({email});
    
    if(userEmailInfo){
      return userEmailInfo;
    }
    else{
      const userEmailInfo = await Email.create({
        email,
        code,
        verified:false,
      });
  
      return userEmailInfo;
    }
    
  }

  checkCode = async (email,code) => {
    const userInfo = await Email.findOne({email,code});

    if(userInfo.code === code){
      const updateUser = await Email.updateOne({ email: email, code: code },{ $set: { verified: true } });
      return {verified:true};
    }
    else{
      return {verified:false};
    }
  }

  checkNickname = async (nickname) => {
    const user = await User.findOne({ nickname });

    if (user) {
      return { result: false, message: "이미 사용 중인 닉네임입니다." };
    }
    else {
      return { result: true, message: "사용 가능한 닉네임입니다." };
    }


  };



  login = async (email, password) => {
    const user = await User.findOne({ email });

    try{
      if(!user){
        return { result:false, message: "해당 유저의 정보를 찾을수 없습니다."};
      }
      const match = await bcrypt.compare(password, user.password);
      if(!match){
        return { result:false, message: "입력한 정보를 확인해주세요"};
      }
      else{
        return user;
      }
    }catch(err){
      console.log(err)
    }
  };

  findUser = async (nickname, password) => {
    const findUserData = await User.findOne({ nickname: nickname, password: password });
    return findUserData;
  };

  updateImage = async (nickname, newImage) => {

    const updateUser = await User.updateOne({ nickname: nickname }, { $set: { userImage: newImage } });
    const userInfo = await User.findOne({ nickname: nickname });

    return userInfo;
  };

  updatePassword = async (nickname, newPassword) => {

    const updateUser = await User.updateOne({ nickname: nickname }, { $set: { password: newPassword } });
    const userInfo = await User.findOne({ nickname: nickname });
    return userInfo;
  };

  deleteUser = async (nickname) => {
    const updateUser = await User.deleteOne({ nickname: nickname });
    const userInfo = await User.findOne({ nickname: nickname });

    return userInfo;
  };

  findPost = async (nickname) => {
    const findPostData = await Post.find({ nickname });

    return findPostData;
  };


}

module.exports = UserRepository;
