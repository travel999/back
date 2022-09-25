const NotisService = require('../services/notis.service');

//모든알림메시지확인
class NotisController {
    notisService = new NotisService();
    getAllNotice = async (req, res, next) => {
        try {
            const { user } = res.locals;
            if (user === undefined) {
                return res.status(401).json({
                    result: 'fail',
                    message: '로그인 후 이용 가능한 기능입니다.',
                });
            }
            const findNotices = await this.notisService.findAllNotice(user);
            return res.json({
                message: '성공',
                findNotices,
            });
        } catch (error) {
            console.log(err)
            next(err);
        }
    };

    //알림삭제하기
    deleteNotice = async (req, res, next) => {
        try {
            const { noticeMessageId } = req.params;
            const deletenotice = await this.notisService.deleteNotice(noticeMessageId)
            res.json({
                result: "성공",
                message: '삭제완료되었습니다'
            })
        } catch (error) {
            console.log(err)
            next(err);
        }
    }
}
module.exports = NotisController;