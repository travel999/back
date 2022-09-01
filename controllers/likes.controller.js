const LikeService = require('../services/likes.service');

//Likes의 컨트롤러 역할을 하는 클래스

class LikesController {
    likeService = new LikeService();
    getLikes = async (req, res, next) => {
        const { nickname } = res.locals.user;
        const likes = await this.likeService.findAllLike(nickname);
        return res.status(200).json({ data: likes });
    }
    updateLike = async (req, res, next) => {
        const { nickname } = res.locals.user;
        const { postId } = req.params;
        const isLike = await this.likeService.updateLike(nickname, postId);
        res.status(200).json({isLike});
    }
}

module.exports = LikesController;