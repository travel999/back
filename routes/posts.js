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



//게시글 상세 조회
router.get("/:_postId", async (req, res) => {
    try {
        const _id = req.params._postId;

        if (!_id) { // TODO: Joi를 사용하지 않음
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
            return;
        }

        const post = await Post.findOne({ _id });

        const result = {
            postId: post._id,
            user: post.user,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
        };

        res.status(200).json({ data: result });
    } catch (error) {
        const message = `${req.method} ${req.originalUrl} : ${error.message}`;
        console.log(message);
        res.status(400).json({ message });
    }
});

//개시글 생성
router.post("/", async (req, res) => {
    try {
        const { Nickname,title,Day,cardNum,PlaceName,Locate,Content } = req.body;

        // if (!user || !password || !title || !content) { // TODO: Joi를 사용하지 않음
        //     res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
        //     return;
        // }

        await Post.create({ Nickname,title,Day,cardNum,PlaceName,Locate,Content });

        res.status(201).json({ message: "게시글을 생성하였습니다." });
    } catch (error) {
        const message = `${req.method} ${req.originalUrl} : ${error.message}`;
        console.log(message);
        res.status(400).json({ message });
    }
});

//게시글 수정
router.put("/:_postId", async (req, res) => {
    try {
        const _id = req.params._postId;

        const user = req.body["user"];
        const password = req.body["password"];
        const title = req.body["title"];
        const content = req.body["content"];

        if (!_id || !user || !password || !title || !content) { // TODO: Joi를 사용하지 않음
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
            return;
        }


        const isExist = await Post.findOne({ _id, password });
        if (!isExist) {
            res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
            return;
        }

        await Post.updateOne({ _id }, { $set: { user, title, content } });

        res.status(201).json({ message: "게시글을 수정하였습니다." });
    } catch (error) {
        const message = `${req.method} ${req.originalUrl} : ${error.message}`;
        console.log(message);
        res.status(400).json({ message });
    }
});

// 게시글 삭제
router.delete("/:_postId", async (req, res) => {
    try {
        const _id = req.params._postId;
        const password = req.body["password"];

        if (!user || !password) { // TODO: Joi를 사용하지 않음
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
            return;
        }

        const isExist = await Post.findOne({ _id, password });

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