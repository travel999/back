const UserRepository = require("../repositories/users.repository");

class UserService {
  userRepository = new UserRepository();

  createUser = async (email, nickname, password, confirm) => {
    
    const createUserData = await this.userRepository.createUser(
      email,
      nickname,
      password,
    );

    return createUserData;
  };

  checkEmail = async (email) => {
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    
    if(!regEmail.test(email)){
      return { result:false, message: "이메일 양식 위반."}
    }

    const checked = await this.userRepository.checkEmail(email);

    return checked;

  };

  checkNickname = async (nickname) => {
    const regNickname = /^[A-Za-z가-힣0-9]{2,15}$/;
    
    if(!regNickname.test(nickname)){
      return { result:false, message: "닉네임 양식 위반."};
    }

    const checked = await this.userRepository.checkNickname(nickname);

    return checked;

  };

  userLogin = async (email, password) => {
    const userData = await this.userRepository.login(email, password);
    
    return userData;

  };

  findUser = async (nickname, password) => {
    const findUser = await this.userRepository.findUser(nickname, password);

    return {
      email: findUser.email,
      nickname: findUser.nickname,
      password: findUser.null,
      createdAt: findUser.createdAt,
    };
  };

  
}

module.exports = UserService;
