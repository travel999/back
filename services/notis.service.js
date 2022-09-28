const NotisRepository = require('../repositories/notis.repository');

class NotisService {
    notisRepository = new NotisRepository();

    //알림조회
    findAllNotice = async (user) => {
        const findBoard = await this.notisRepository.findAllNotice(user)
        return findBoard;
    }
    //회원가입시 알림창 생성
    createNoticeBoard = async (newUser) => {
        const findExistBoard = await this.notisRepository.createNoticeBoard(newUser)
        return findExistBoard
    };

    //초대된 닉네임2 의  noticeboard 안에 noticemessage 넣기
    createNoticeMessage = async (nickname2) => {
        const newMessage = await this.notisRepository.createNoticeMessage(nickname2);
        return newMessage
    };

    //알림삭제
    deleteNotice = async (noticeMessageId) => {
        const deleteNotice = await this.notisRepository.deleteNotice(noticeMessageId)
    };
};
module.exports = NotisService;