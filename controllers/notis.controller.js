const NoticeBoard = require('../schemas/noticeboard');
const NoticeMessage = require('../schemas/noticemessage');
const Post = require('../schemas/posts');

//모든알림메시지확인
const getAllNotice = async (req, res, next) => {
    try {
        const { user } = res.locals;
        if (user === undefined) {
            return res.status(401).json({
                result: 'fail',
                message: '로그인 후 이용 가능한 기능입니다.',
            });
        } console.log(user)
        const findBoard = await NoticeBoard.findOne({
            userId: user.nickname,
        }).populate({
            path: 'notices'
        });
        const result = findBoard.notices;
        return res.json({
            result,
            message: '성공',
        });
    } catch (error) {
        console.log(err)
        next(err);
    }
};

//회원가입할때 noticeboard 생성하기
const createNoticeBoard = async ({ user }) => {
    try {
        const findExistBoard = await NoticeBoard.findOne({
            boardNum: user.email,
            userId: user.nickname,
        });
        if (findExistBoard) return;
        else {
            const newBoard = new NoticeBoard({
                boardNum: user.email,
                userId: user.nickname,
            });
            await newBoard.save();
            return;
        }
    } catch (error) {
        console.log(err)
        next(err);
    }
};

//초대된 닉네임2 의  noticeboard 안에 noticemessage 넣기
const createNoticeMessage = async ({ nickname2 }) => {
    try {
        const findinviteuser = await Post.findOne({ nickname: nickname2 });
        const findBoard = await NoticeBoard.findOne({
            userId: findinviteuser.nickname,
        });
        const newMessage = new NoticeMessage({
            noticeBoardId: findBoard.noticeBoardId,
            noticeContent: "초대장이 도착했습니다!"
        });
        await newMessage.save();
    } catch (error) {
        console.log(err)
        next(err);
    }
}
//알림삭제하기
const deleteNotice = async (req, res, next) => {
    try {
        const { noticeMessageId } = req.params;
        const deletenotice = await NoticeMessage.deleteOne({
            _id: noticeMessageId,
        });
        res.json({
            result: "성공",
            message: '삭제완료되었습니다'
        })
    } catch (error) {
        console.log(err)
        next(err);
    }
}
module.exports = {
    getAllNotice,
    createNoticeMessage,
    createNoticeBoard,
    deleteNotice
};
