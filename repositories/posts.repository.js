const Post = require("../schemas/posts");
const Like = require("../schemas/likes");
const User = require("../schemas/users");
const NoticeService = require('../services/notis.service');
class PostRepository {
    notisService = new NoticeService();
    searchKey = async (nickname, keyword, start, pageSize) => {
        const posts = await Post.find({ title: { $regex: keyword }, openPublic: true }).sort({ "like": -1, "createdAt": -1 }).skip(start).limit(pageSize);
        const targetPost = await Like.find({ nickname }).sort({ "createdAt": -1 });
        const likedPost = targetPost.map((post) => post.postId);
        for (var i = 0; i < likedPost.length; i++) {
            let ids = likedPost[i];
            for (var j = 0; j < posts.length; j++) {
                if (posts[j]._id.toString() === ids) {
                    posts[j].isLiked = true;
                }
            }
        }
        return posts;
    }

    myPostsMain = async (nickname) => {
        const posts = await Post.find({ nickname }).sort({ "createdAt": -1 });
        return posts;
    }

    likedPostsMain = async (nickname) => {
        const targetPost = await Like.find({ nickname }).sort({ "createdAt": -1 });
        const likedPost = targetPost.map((post) => post.postId);
        const post = [];
        if(likedPost.length > 0){
            for (var i = 0; i < likedPost.length; i++) {
                const data = await Post.findById(likedPost[i]);
                data.isLiked = true;
                post.push(data);
            }
            return post;
        }else{
            return post;
        }
        
    }

    openPostsMain = async (openStatus, nickname, start, pageSize) => {
        const posts = await Post.find({ openPublic: openStatus }).sort({ "like": -1, "createdAt": -1 }).skip(start).limit(pageSize);
        const targetPost = await Like.find({ nickname }).sort({ "createdAt": -1 });
        const likedPost = targetPost.map((post) => post.postId);
        
            for (var i = 0; i < likedPost.length; i++) {
                let ids = likedPost[i];
                for (var j = 0; j < posts.length; j++) {
                    if (posts[j]._id.toString() === ids) {
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

    createPost = async ({ nickname, title, date }) => {
        const post = await Post.create({ nickname, title, date  });
        return post
    }

    updatepost = async (filter, update) => {
        await Post.findOneAndUpdate(filter, update)
        const updatePost = await Post.findById(filter) // 업데이트값 바로 보내주기
        return updatePost 
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

    invite = async ({ postId, nickname2 }) => {
        const post = await Post.updateOne({ _id : postId }, { $push: { nickname: nickname2 } })
        await this.notisService.createNoticeMessage(  nickname2  );
        return post
    }

    findUser = async ({ nickname }) => {
        const user = await User.findOne({ nickname })
        return user
    }
}



module.exports = PostRepository;