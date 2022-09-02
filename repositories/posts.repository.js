const Post = require("../schemas/posts");
const Like = require("../schemas/likes");

class PostRepository {

    searchKey = async (keyword,start,listSize) => {
        console.log(keyword);
        const posts = await Post.find({title:{$regex : keyword}, openPublic:true}).sort({"like": -1}).skip(start).limit(listSize);

        return posts;
    }
    
    findMain = async ( nickname ) => {
        const posts = await Post.find({nickname}).sort({ "createdAt": -1 }).limit(3);
                
        return posts;
    }

    findMain2 = async ( nickname ) => {
        const targetPost= await Like.find({ nickname }).sort({ "createdAt": -1 }).limit(4);
        const likedPost = targetPost.map((post) => post.postId)
        const post  = []
        
        for( var i = 0 ; i < likedPost.length; i++ ){    
            const data = await Post.findById(likedPost[i])
            post.push(data) 
        }
        
        return post;
    }

    findMain3 = async ( openStatus,start,listSize ) => {
        const posts = await Post.find({ openPublic: openStatus }).sort({ "like": -1 }).skip(start).limit(listSize);
                
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
        const post = await Post.deleteOne({ _id });
        return post
    }

    publicPost = async ({ openPublic, _id }) =>{
        const targetPost = await Post.findById( _id )
        const post = await targetPost.updateOne({openPublic})
        return post
    }

    recommend = async ( openStatus ) => {
        const posts = await Post.find({ openPublic: openStatus }).sort({ "like": -1 });
                
        return posts;
    };
}



module.exports = PostRepository;