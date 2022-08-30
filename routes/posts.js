const express = require("express");
const Post = require("../schemas/posts");
const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/:postId', postsController.getPost); //일정 조회
router.post('/',  postsController.createPost) //일정 생성
router.put("/:_postId",  postsController.updatepost) //일정 수정
router.delete("/:_postId",  postsController.deletepost) //일정 수정

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

<<<<<<< HEAD

//일정 조회
router.get("/:postId", async (req, res) => {
    const { postId } = req.params;
    const post = await Post.find({ _id: postId })
    res.status(200).json({
        result: post

    })

});

// 일정 생성
router.post("/", async (req, res) => {
    try {
        const { nickname, title, day: [cardNum, [placeName, locate, content]] } = req.body;

        if (!title || !cardNum || !placeName || !locate || !content) {
            res.status(401).json({ message: '데이터 형식이 올바르지 않습니다.' });
            return;
        }

        await Post.create({ nickname, title, day: [cardNum, [placeName, locate, content]] });

        res.status(201).json({ message: "게시글을 생성하였습니다." });
    } catch (error) {
        const message = `${req.method} ${req.originalUrl} : ${error.message}`;
        console.log(message);
        res.status(400).json({ message });
    }
});

//일정 수정
router.put("/:_postId", async (req, res) => {
    try {
        const _id = req.params._postId;
        console.log(_id)
        const { nickname, title, day: [cardNum, [placeName, locate, content]] } = req.body;
        if (!title || !cardNum || !placeName || !locate || !content) {
            res.status(401).json({ message: '데이터 형식이 올바르지 않습니다.' });
            return;
        }

        const isExist = await Post.findOne({ _id });
        if (!isExist) {
            res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
            return;
        }

        await Post.updateOne({ _id }, { $set: { nickname, title, day: [cardNum, [placeName, locate, content]] } });

        res.status(201).json({ message: "게시글을 수정하였습니다." });
    } catch (error) {
        const message = `${req.method} ${req.originalUrl} : ${error.message}`;
        console.log(message);
        res.status(400).json({ message });
    }
});

//일정 삭제
router.delete("/:_postId", async (req, res) => {
    try {
        const _id = req.params._postId;
        const { nickname } = req.body;

        const isExist = await Post.findOne({ _id });

        if (!isExist || !_id) {
            res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
            return;
        }

        await Post.deleteOne({ _id });
        res.status(201).json({ message: "게시글을 삭제하였습니다." });
    } catch (error) {
        const message = `${req.method} ${req.originalUrl} : ${error.message}`;
        console.log(message);
        res.status(400).json({ message });
    }
});

=======
>>>>>>> 93c0c4e7a9ede0a75cb698a62e2ae9c5abecc850
module.exports = router;