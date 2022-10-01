const NoticeBoard = require('../schemas/noticeboard');
const NoticeMessage = require('../schemas/noticemessage');
const User = require('../schemas/users')

class NotisRepository {

    findAllNotice = async (user) => {
        const findBoard = await NoticeBoard.findOne({
            userId: user.nickname,
        }).populate({
            path: 'notices'
        });
        console.log(findBoard.notices)
        return findBoard.notices;
    }

    createNoticeBoard = async (newUser) => {
        const newBoard = await NoticeBoard.create({
            boardNum: newUser.email,
            userId: newUser.nickname,
        });
        return newBoard;
    }


    createNoticeMessage = async (nickname2) => {
        const findinviteuser = await User.findOne({ nickname: nickname2 });
        console.log(nickname2)
        const findBoard = await NoticeBoard.findOne({
            userId: findinviteuser.nickname,
        });
        const newMessage = new NoticeMessage({
            noticeBoardId: findBoard.noticeBoardId,
            noticeContent: "초대장이 도착했습니다!"
        });
        await newMessage.save();

    };

    deleteNotice = async (noticeMessageId) => {
        const deletenotice = NoticeMessage.deleteOne({ _id: noticeMessageId })
        return deletenotice;
    }
}

module.exports = NotisRepository;