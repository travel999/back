const User = require("../schemas/users");
const Post = require("../schemas/posts");

class UserRepository {
  createUser = async (email, nickname, userImage, password) => {
    
    const createUserData = await User.create({
      email,
      nickname,
      userImage,
      password,
    });

    return createUserData;
  };

  
  checkEmail = async (email) => {
    const user = await User.findOne({email});
    
    if(user){
      return {result: false, message: "이미 사용 중인 이메일입니다."};
    }
    else{
      return {result: true, message: "사용 가능한 이메일입니다."};
    }
  };

  checkNickname = async (nickname) => {
    const user = await User.findOne({nickname});

    if(user){
      return {result: false, message: "이미 사용 중인 닉네임입니다."};
    }
    else{
      return {result: true, message: "사용 가능한 닉네임입니다."};
    }

    
  };



  login = async (email, password) => {
    const user = await User.findOne({ email: email, password: password });
    console.log(user);
    
    return user;
  };

  findUser = async (nickname, password) => {
    const findUserData = await User.findOne({ nickname: nickname, password: password });
    
    return findUserData;
  };

  updateImage = async (nickname, newImage) => {
    
    const updateUser = await User.updateOne({ nickname: nickname },{ $set: { userImage: newImage } });
    const userInfo = await User.findOne({ nickname: nickname });

    return userInfo;
  };

  updatePassword = async (nickname,newPassword) => {
    
    const updateUser = await User.updateOne({ nickname: nickname },{ $set: { password: newPassword }});
    const userInfo = await User.findOne({ nickname: nickname });
    console.log(userInfo);
    return userInfo;
  };

  deleteUser = async (nickname) => {
    const updateUser = await User.deleteOne({nickname:nickname});
    const userInfo = await User.findOne({nickname:nickname});

    return userInfo;
  };
  
  findPost = async (nickname) => {
    const findPostData = await Post.find({ nickname });
    
    return findPostData;
  };

  
}

module.exports = UserRepository;
