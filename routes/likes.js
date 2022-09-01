const express = require("express");
const router = express.Router();
const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

router.get("/", likesController.getLikes);//내가 좋아요한 모든 일정 조회하기
router.post("/:postId", likesController.updateLike);//좋아요하기

module.exports = router;