const User = require("../schemas/users");

class UserRepository {
  createUser = async (email, nickname, password) => {
    
    const createUserData = await User.create({
      email,
      nickname,
      password,
    });

    return createUserData;
  };

  
  checkEmail = async (email) => {
    const user = await User.findOne({email});
    
    if(user){
      return {result: false, message: "이미 사용 중인 이메일입니다."}
    }
    else{
      return {result: true, message: "사용 가능한 이메일입니다."}
    }
  };

  checkNickname = async (nickname) => {
    const user = await User.findOne({nickname});

    if(user){
      return {result: false, message: "이미 사용 중인 닉네임입니다."}
    }
    else{
      return {result: true, message: "사용 가능한 닉네임입니다."}
    }

    
  };



  login = async (email, password) => {
    const user = await User.findOne({ email: email, password: password });
    console.log(user);
    
    return user;
  };

  findUser = async (nickname, password) => {
    const findUserData = await User.findOne({nickname, password});

    return findUserData;
  };

  
}

module.exports = UserRepository;
