const express = require("express");
const Like = require("../schemas/likes");
const User = require("../schemas/users");
const Post = require("../schemas/posts");
const router = express.Router();


//내가 좋아요한 모든 일정 조회하기
router.get("/", async (req, res) => {
    try {
        const { userId } = res.locals.user;
        const likeuser = await Like.find({ postId: userId });
        console.log(likeuser);
        const LikeUsers = likeuser.map((e) => e.userId);
        res.status(201).json({ LikeUsers });

        // const likes = await Like.find({ postId: userId });
        // let result = [];
        // for (const like of likes) (
        //     result.push({
        //         post_id: like.postId,
        //         userId: like.userId
        //     })
        // )
        res.status(200).json(result)

    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            errorMessage: '좋아요 일정 조회에 실패하였습니다.',
        });
    }
});


//일정에 좋아요 등록


// router.post("/:postId", async (req, res) => {
//     try {
//         const { postId } = req.params;
//         const { user } = res.locals;
//         const userId = user.userId;

//         const detailpost = await Post.findOne({ _id: postId  });

//         if (!detailpost) {
//             return res.status(400).json({
//                 ok: false,
//                 errorMessage: "해당 게시물을 찾을 수 없습니다.",
//             });
//         } else {
//             const likesaved = detailpost.like;
//             const likedpost = await Like.findOne({_id: userId } );
//             console.log(likedpost)
//             if (!likedpost) {
//                 await Post.updateOne({ like: likesaved + 1 }, { postId  });
//                 await Like.create({ userId, postId });
//                 return res.status(200).json({ ok: true, message: "좋아요!" });
//             } else {
//                 await Post.updateOne({ likes: likesaved - 1 }, { postId  });
//                 await Like.destroy({  userId: userId, postId: postId  });
//                 return res.status(200).json({ ok: true, message: "좋아요 취소!" });
//             }
//         }
//     } catch (err) {
//         return res.status(400).json({
//             ok: false,
//             errorMessage: "좋아요 기능에 문제가 발생했습니다",
//         });
//     }
// });
router.post("/:postId", async (req, res) => {

    const userId = "1234";
    const { postId } = req.params;
    console.log(userId);
    const isLike = await Like.findOne({ postId, userId })
    if (!isLike) {
        await Like.create({ userId, postId })
        const existLikes = await Post.findOneAndUpdate({ _id: postId })
        console.log(existLikes)
        if (existLikes) {
            const countLikes = existLikes.like
            const postLike = countLikes + 1
            console.log(postLike);
            await Post.updateOne(
                { _id: postId },
                { $set: { like : postLike } }
                
            )
        } res.status(201).json({ message: '일정에 좋아요를 눌렀습니다' });
    } else {
        await Like.deleteOne({ userId, postId })
        const deleteLikes = await Post.findOne({ _id: postId })
        if (deleteLikes) {
            const countLike = deleteLikes.like - 1
            await Post.updateOne(
                { _id: postId },
                { $set: { countLike } }
            )
        } res.status(201).json({ message: '일정에 좋아요를 취소하였습니다' })
    }
});




// router.post("/:postId", async (req, res) => {
//     try {
//         const { postId } = req.params;
//         const { nickname } = res.locals.user;

//         const isExist = await Like.find({ nickname });
//         console.log(isExist);
//         if (!isExist) {
//             return res.status(404).json({
//                 errorMessage: '일정 이 존재하지 않습니다.',
//             });
//         }
//         let isLike = await Like.findOne({ postId, nickname });

//         if (!isLike) {
//             await this.Post.update({ like})
//             await Like.create({ postId, nickname });
//             return res
//                 .status(200)
//                 .json({ message: '일정에 좋아요를 등록하였습니다.' });
//         } else {
//             await Like.deleteOne({
//                 where: { postId, nickname },
//             });
//             return res
//                 .status(200)
//                 .json({ message: '일정 의 좋아요를 취소하였습니다.' });
//         }
//     }
//     catch (error) {
//         console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
//         return res.status(400).json({
//             errorMessage: '좋아요 등록에 실패하였습니다.',
//         });
//     }
// })

module.exports = router;