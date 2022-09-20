const NoticeBoard = require('../schemas/noticeboard');
const NoticeMessage = require('../schemas/noticemessage');
const Post = require('../schemas/posts');


const getAllNotice = async (req, res, next) => {

    const { user } = res.locals;
    if (user === undefined) {
        return res.status(401).json({
            result: 'fail',
            message: '로그인 후 이용 가능한 기능입니다.',
        });

    } console.log(user)
    //초대된 nickname2의 noticeboard 안의 NoticeMessage 확인하기
    const findBoard = await NoticeBoard.findOne({
        userId: user.nickname,
    }).populate({
        path: 'notices'
    });
    // await NoticeMessage.where({
    //     noticeBoardId: findBoard.noticeBoardId,
    // }).updateMany({ checkNotice: 'true' });

    const result = findBoard.notices;
    return res.json({
        result,
        message: '성공',
    });
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
        throw error;
    }
};
//초대된 닉네임2 의  noticeboard 안에 noticemessage 넣기
const createNoticeMessage = async ({ nickname2 }) => {

    const findinviteuser = await Post.findOne({ nickname: nickname2 });
    const findBoard = await NoticeBoard.findOne({
        userId: findinviteuser.nickname,
    });
    // console.log(findBoard)

    const newMessage = new NoticeMessage({
        noticeBoardId: findBoard.noticeBoardId,
        noticeContent: "초대장이 도착했습니다!"

    });

    await newMessage.save();
    return;
}

module.exports = {
    getAllNotice,
    createNoticeMessage,
    createNoticeBoard
};
