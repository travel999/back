const express = require("express");
const Post = require("../schemas/posts");
const router = express.Router();

// 모든 게시글 데이터를 반환하는 함수
router.get("/", async (req, res) => {
    try {
        let posts = await Post.find().sort({ createdAt: -1 });
        let resultList = [];

        for (const post of posts) {
            resultList.push({
                postId: post._id,
                user: post.user,
                title: post.title,
                createdAt: post.createdAt,
            });
        }
        res.status(200).json({ data: resultList });
    } catch (error) {
        const message = `${req.method} ${req.originalUrl} : ${error.message}`;
        console.log(message);
        res.status(400).json({ message });
    }
});

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

module.exports = router;