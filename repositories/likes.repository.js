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
        console.log("닉네임:", nickname, " 포스트ID:", postId);
        const likesData = await Like.findOne({ nickname, postId });
        console.log(likesData)
        return likesData;
    }

    createLike = async (nickname, postId) => {
        const createLikeData = await Like.create({ nickname, postId });
        return createLikeData;
    }

    updateLike = async ( _id, postLike ) => {
        const updateLikeData = await Post.updateOne(
            { _id },
            { $set: { like: postLike } });
        return updateLikeData;
    }

    deleteLike = async (nickname, postId) => {
        const deleteLikeData = await Like.deleteOne({ nickname, postId });
        return deleteLikeData;
    }

    targetId = async (_id) => {
        const targetData = await Post.findById(_id);
        return targetData;
    }
}



module.exports = LikeRepository;