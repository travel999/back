const express = require("express");
const Post = require("../schemas/posts");
const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get("/main", postsController.getMain); //메인페이지 조회
router.get("/good", postsController.recommendation); // 추천 일정 불러오기
router.get("/search/:keyword", postsController.search); //검색
router.get('/:postId', postsController.getPost); //일정 조회
router.post('/',  postsController.createPost); //일정 생성
router.put("/:postId",  postsController.updatePost); //일정 수정
router.delete("/:postId",  postsController.deletePost); //일정 삭제
router.patch("/public/:postId",  postsController.publicPost); //일정 공개/비공개


module.exports = router;