const UserRepository = require("../repositories/users.repository");

class UserService {
  userRepository = new UserRepository();

  createUser = async (email, nickname, userImage, password, confirm) => {

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
    
    if(userInfo){
      return {result: true, userInfo};
    }
    else{
      return {result:false, message:"정보 조회 실패"};
    }
    
  };

  updateImage = async (nickname, newImage) => {
    const updateUser = await this.userRepository.updateImage(nickname,newImage);
    console.log("기본 이미지: ", updateUser);
    if(updateUser.userImage === newImage){
      return {result:true, message:"유저 이미지가 변경되었습니다", updateUser};
    }else{
      return {result:false, message:"네트워크 에러",  updateUser};
    }

  };

  updatePassword = async (nickname, password, newPassword, confirm) => {
    
    const regPassword = /^[A-Za-z0-9]{6,20}$/;
    
    if(password === newPassword){
      return {result:false, message:"새로운 비밀번호를 입력하세요"};
    }

    if(newPassword !== confirm){
      return {result:false, message:"비밀번호가 일치하지 않습니다"};
    }

    if(!regPassword.test(newPassword)){
      return {result:false, message:"비밀번호 양식위반"};
    }


    const userInfo = await this.userRepository.updatePassword(nickname,newPassword);

    if(userInfo.password === newPassword){
      return {result:true, message:"비밀번호가 변경되었습니다"};
    }else{
      return {result:false, message:"네트워크 에러"};
    }
  };

  deleteUser = async (nickname) => {
    const userInfo = await this.userRepository.deleteUser(nickname);

    if(!userInfo){
      return {result:true, message:"유저 정보를 삭제하였습니다"};
    }else{
      return {result:false, message:"네트워크에러"};
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
