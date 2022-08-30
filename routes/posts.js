const express = require("express");
const Post = require("../schemas/posts");
const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/:postId', postsController.getPost); //일정 조회
router.post('/',  postsController.createPost) //일정 생성
router.put("/:_postId",  postsController.updatepost) //일정 수정
router.delete("/:_postId",  postsController.deletepost) //일정 삭제


module.exports = router;