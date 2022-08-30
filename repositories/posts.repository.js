const Post = require("../schemas/posts");
const { exists } = require("../schemas/users");

class PostRepository {

    findPost = async ( postId ) => {
        const post = await Post.findOne({ _id : postId } )
        return post;
    }

    targetPost = async ({ _id, nickname }) => {
        const post = await Post.findOne({ _id, nickname })
        return post;
    }

    createPost = async ({ nickname, title, day: [cardNum, [placeName, locate, content]] }) => {
        const post = await Post.create({ nickname, title, day: [cardNum, [placeName, locate, content]] });
        return post
    }

    updatepost = async ({ _id, nickname, title, day: [cardNum, [placeName, locate, content]] }) => {
        const targetPost = await Post.findOne({ _id })
        const post = await targetPost.updateOne({ nickname, title, day: [cardNum, [placeName, locate, content]] });
        // await Post.updateOne({ _id }, { $set: { nickname, title,  day : [cardNum,[placeName ,locate, content] ]} })
        return post
    }


    deletepost = async ({ _id }) => {
        const deletepost = await Post.deleteOne({ _id });
        return deletepost
    }
}



module.exports = PostRepository;