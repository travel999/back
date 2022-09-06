const LikeRepository = require('../repositories/likes.repository');

class LikeService {
    likeRepository = new LikeRepository();

    findAllLike = async (nickname) => {
        const like = await this.likeRepository.findAllLike(nickname);
        if (!like) {
            return { message: '잘못된 접근 입니다' }
        }
        return like;
    }

    updateLike = async (nickname, postId) => {
        const isLike = await this.likeRepository.findLike(nickname, postId);
        if (!isLike) {

            const existLikes = await this.likeRepository.targetId({ _id: postId });
            if (existLikes) {

                const countLikes = existLikes.like;
                const postLike = countLikes + 1
                await this.likeRepository.createLike(nickname, postId);
                await this.likeRepository.updateLike(postId, postLike);
                return { message: '일정에 좋아요를 했습니다', existLikes };
            } else {
                return { message: '일정이 없습니다' };
            }
        } else {

            const existLikes = await this.likeRepository.targetId({ _id: postId });
            if (existLikes) {
                const countLikes = existLikes.like;
                const postLike = countLikes - 1
                await this.likeRepository.deleteLike(nickname, postId);
                await this.likeRepository.updateLike(postId, postLike);
                return { message: '일정에 좋아요를 취소했습니다', existLikes};
            } else {
                return { message: '일정이 없습니다' };
            }
        }
    }
}

module.exports = LikeService;