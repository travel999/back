const express = require("express");
const Like = require("../schemas/likes");
const User = require("../schemas/users");
const Post = require("../schemas/posts");
const router = express.Router();

router.post('/test', async (req, res, next) =>{
    try{
    const {_id} = res.locals.user
    const pop = res.locals.user
    const post = await Post.creat( pop )
    res.status(200).json({
        result: post,
        message : "=============================="    
    })
    } catch (err){
    res.status(400).json({ result : message });

}
    

});

//내가 좋아요한 모든 일정 조회하기
router.get("/", async (req, res) => {
    try {
        const { nickname } = res.locals.user
        const targetPost= await Like.find({ nickname });
        const likedPost = targetPost.map((post) => post.postId)
        const post  = []
        for( var i = 0 ; i < likedPost.length; i++ ){    
            const data = await Post.findById(likedPost[i])
            post.push(data) 
        }
        res.status(201).json({ result : data });

    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            errorMessage: '좋아요 일정 조회에 실패하였습니다.',
        });
    }
});




router.post("/:postId", async (req, res) => {
    const { nickname } = res.locals.user
    console.log(nickname)
    const { postId } = req.params;
    const isLike = await Like.findOne({ postId, nickname })
    if (!isLike) {
        await Like.create({ postId, nickname })
        const existLikes = await Post.findById({ _id: postId })
        if (existLikes) {
            const countLikes = existLikes.like
            const postLike = countLikes + 1
            await Post.updateOne(
                { _id: postId },
                { $set: { like : postLike } }
                
            )
            res.status(201).json({ message: '일정에 좋아요를 눌렀습니다' });
        }else{ 
            res.status(401).json({ message: '일정을 찾을수 없습니다.' });
        }
    } else {
        await Like.deleteOne({ postId, nickname })
        const deleteLikes = await Post.findById({ _id: postId })
        if (deleteLikes) {
            const countLikes = deleteLikes.like
            const postLike = countLikes -1
            await Post.updateOne(
                { _id: postId },
                { $set: { like : postLike } }
            )
            res.status(201).json({ message: '일정에 좋아요를 취소하였습니다' })
        }else{ 
            res.status(401).json({ message: '일정을 찾을수 없습니다.' });
        } 
    }
});








module.exports = router;