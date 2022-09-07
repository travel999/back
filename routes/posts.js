const express = require("express");
const router = express.Router();
const User = require("../schemas/users");
const Post = require("../schemas/posts");

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get("/main/:page", postsController.getMain); //메인페이지 조회
router.get("/good", postsController.recommendation); // 추천 일정 불러오기
router.get("/search/:keyword/:page", postsController.search); //검색
router.get('/:postId', postsController.getPost); //일정 조회
router.post('/',  postsController.createPost); //일정 생성
router.put("/:postId",  postsController.updatePost); //일정 수정
router.delete("/:postId",  postsController.deletePost); //일정 삭제
router.patch("/public/:postId",  postsController.publicPost); //일정 공개/비공개


//일정에 멤버 초대
router.patch("/invite/:postId", async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { nickname2 } = req.body
        const targetUser = await User.findOne({ nickname : nickname2 })
        if(!targetUser){
            res.status(400).json({ result: false, errorMessage: "존재하지 않는 닉네임입니다." })
        }else{
            await Post.updateOne({ _id : postId }, { $push: { nickname : nickname2} }) // $push 닉네임 배열에 새로운값 을 추가해준다. 
            res.status(200).json({ result: true, message: `${nickname2}를 일정에 초대하엿습니다.`, });
        }
    } catch (err) {
        console.log(err)
        next(err);
    }
});


module.exports = router;