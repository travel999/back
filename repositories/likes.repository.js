const Like = require("../schemas/likes");
const Post = require("../schemas/posts");

class LikeRepository {
    findAllLike = async (nickname) => {
        const targetPost = await Like.find({ nickname });
        const likedPost = targetPost.map((post) => post.postId)
        const post = []
        for (var i = 0; i < likedPost.length; i++) {
            const data = await Post.findById(likedPost[i])
            console.log(data)
            post.push(data)
        }
        return post;
    }

    findLike = async (nickname, postId) => {
        const likesData = await Like.findOne({ nickname, postId });
        return likesData;
    }

    targetId = async (_id) => {
        const targetData = await Post.findById(_id);
        return targetData;
    }

    createLike = async (nickname, postId) => {
        const createLikeData = await Like.create({ nickname, postId });
        return createLikeData;
    }

    deleteLike = async (nickname, postId) => {
        const deleteLikeData = await Like.deleteOne({ nickname, postId });
        return deleteLikeData;
    }

    updateLike = async (postId, postLike) => {
        const updateLikeData = await Post.updateOne(
            { _id: postId },
            { $set: { like: postLike } });

        return updateLikeData;
    }

}



module.exports = LikeRepository;