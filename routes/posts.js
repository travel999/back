const express = require("express");
const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get("/main/:page", postsController.getMain); //메인페이지 조회
router.get("/good", postsController.recommendation); // 추천 일정 불러오기
router.get("/search/:keyword/:page", postsController.search); //검색
router.get("/:postId", postsController.getPost); //일정 조회
router.post("/", postsController.createPost); //일정 초기 생성
router.put("/:postId", postsController.updatePost); //일정 작성 
router.delete("/:postId", postsController.deletePost); //일정 삭제
router.patch("/public/:postId", postsController.publicPost); //일정 공개/비공개
router.patch("/invite/:postId", postsController.invitePost ) //일정에 멤버초대
router.put("/:postId/title", postsController.updateTitle) //일정 수정 (날짜,제목)




module.exports = router;