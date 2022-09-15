const Post = require("../schemas/posts");
const Like = require("../schemas/likes");

class PostRepository {

    searchKey = async (keyword, start, listSize) => {
        const posts = await Post.find({ title: { $regex: keyword }, openPublic: true }).sort({ "like": -1 }).skip(start).limit(listSize);
        const targetPost = await Like.find({ nickname }).sort({ "createdAt": -1 });
        const likedPost = targetPost.map((post) => post.postId);
          
        for (var i = 0; i < likedPost.length; i++) {
            let ids = likedPost[i];
            for(var j = 0; j < posts.length; j++){
                if(posts[j]._id.toString() === ids){
                    posts[j].isLiked = true;
                }
            }
        }

        return posts;
    }

    findMain = async (nickname) => {
        const posts = await Post.find({ nickname }).sort({ "createdAt": -1 });

        return posts;
    }

    findMain2 = async (nickname) => {
        const targetPost = await Like.find({ nickname }).sort({ "createdAt": -1 });
        const likedPost = targetPost.map((post) => post.postId);
        const post = [];

        for (var i = 0; i < likedPost.length; i++) {
            const data = await Post.findById(likedPost[i]);
            data.isLiked = true;
            post.push(data);
        }

        return post;
    }

    findMain3 = async (openStatus, nickname, start, listSize) => {
        const posts = await Post.find({ openPublic: openStatus }).sort({ "like": -1 }).skip(start).limit(listSize);
        const targetPost = await Like.find({ nickname }).sort({ "createdAt": -1 });
        const likedPost = targetPost.map((post) => post.postId);
          
        for (var i = 0; i < likedPost.length; i++) {
            let ids = likedPost[i];
            for(var j = 0; j < posts.length; j++){
                if(posts[j]._id.toString() === ids){
                    posts[j].isLiked = true;
                }
            }
        }

        return posts;
    }


    findPost = async (postId) => {
        const post = await Post.findById(postId)
        return post;
    }

    targetPost = async ({ _id }) => {
        const post = await Post.findById(_id)
        return post;
    }

    createPost = async ({ nickname, title, day: [cardNum, [placeName, locate, content]] }) => {
        const post = await Post.create({ nickname, title, day: [cardNum, [placeName, locate, content]] });
        return post
    }

    updatepost = async ({ _id, nickname, title, day: [cardNum, [placeName, locate, content]] }) => {
        const targetPost = await Post.findById(_id)
        const post = await targetPost.updateOne({ nickname, title, day: [cardNum, [placeName, locate, content]] });
        // await Post.updateOne({ _id }, { $set: { nickname, title,  day : [cardNum,[placeName ,locate, content] ]} })
        return post
    }


    deletepost = async ({ _id }) => {
        const post = await Post.deleteOne({ _id });
        return post
    }

    publicPost = async ({ openPublic, _id }) => {
        const targetPost = await Post.findById(_id)
        const post = await targetPost.updateOne({ openPublic })
        return post
    }

    recommend = async (openStatus) => {
        const posts = await Post.find({ openPublic: openStatus }).sort({ "like": -1 });

        return posts;
    };
}



module.exports = PostRepository;