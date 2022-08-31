const Post = require("../schemas/posts");

class PostRepository {

    findPost = async ( postId ) => {
        const post = await Post.findById( postId )
        return post;
    }

    targetPost = async ({ _id}) => {
        const post = await Post.findById(_id )
        return post;
    }

    createPost = async ({ nickname, title, day: [cardNum, [placeName, locate, content]] }) => {
        const post = await Post.create({ nickname, title, day: [cardNum, [placeName, locate, content]] });
        return post
    }

    updatepost = async ({ _id, nickname, title, day: [cardNum, [placeName, locate, content]] }) => {
        const targetPost = await Post.findById( _id )
        const post = await targetPost.updateOne({ nickname, title, day: [cardNum, [placeName, locate, content]] });
        // await Post.updateOne({ _id }, { $set: { nickname, title,  day : [cardNum,[placeName ,locate, content] ]} })
        return post
    }


    deletepost = async ({ _id }) => {
        const post = await Post.deleteOne({ _id });
        return post
    }

    publicPost = async ({ openPublic, _id }) =>{
        const targetPost = await Post.findById( _id )
        const post = await targetPost.updateOne({openPublic})
        return post
    }
}



module.exports = PostRepository;