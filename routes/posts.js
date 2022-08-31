const express = require("express");
const Post = require("../schemas/posts");
const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/:postId', postsController.getPost); //일정 조회
router.post('/',  postsController.createPost) //일정 생성
router.put("/:postId",  postsController.updatepost) //일정 수정
router.delete("/:postId",  postsController.deletepost) //일정 삭제

//나의여행일정 가져오기

router.get('/mine', async (req, res) => {
    user = res.locals.user;
    try {
        const { _id } = user;
        if (!_id) {
            res.status(400).json({ message: '데이터형식이올바르지않습니다' })
        };

        const post = await Post.find({ userId: _id });
        res.status(200).json({ "statusCode": 200, post });
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            errorMessage: '나의 일정 조회에 실패하였습니다.',
        });
    }
});


module.exports = router;