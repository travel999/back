const Post = require("../schemas/posts");

class PostRepository {

    searchKey = async (keyword) => {
        console.log(keyword);
        const posts = await Post.find({title:{$regex : keyword}}).sort({"createdAt": -1});

        return posts;
    }
    
    findMain = async ( nickname ) => {
        const posts = await Post.find({nickname}).sort({ "createdAt": -1 }).limit(3);
        
        return posts;
    }
    
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
        const deletepost = await Post.deleteOne({ _id });
        return deletepost
    }
}



module.exports = PostRepository;