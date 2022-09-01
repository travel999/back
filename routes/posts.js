const express = require("express");
const Post = require("../schemas/posts");
const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get("/main", postsController.getMain); //메인페이지 조회
router.get("/search/:keyword", postsController.search); //검색
router.get('/:postId', postsController.getPost); //일정 조회
router.post('/',  postsController.createPost) //일정 생성
router.put("/:postId",  postsController.updatePost) //일정 수정
router.delete("/:postId",  postsController.deletePost) //일정 삭제
router.patch("/public/:postId",  postsController.publicPost) //일정 공개/비공개
//나의여행일정 가져오기



// router.patch('/public/:postId', async (req, res) => {
//     try {
//         const { nickname } = res.locals.user;
//         const postId = req.params.postId;
//         const { openPublic } = req.body;
        
//         const isPost = await Post.findById({ _id :postId });
//         if (!isPost) {
//             res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
//             return;
//         }
//         if (!isPost.nickname.includes(nickname)){
//             res.status(404).json({ message: '수정권한이 없습니다.' });
//             return { message: '수정권한이 없습니다. ' }
//         }
//         await isPost.updateOne({ openPublic })
//         res.status(200).json({ message: '일정이 공개상태로 변경되었습니다.' });
//     }catch (error) {
//         const message = `${req.method} ${req.originalUrl} : ${error.message}`;
//         console.log(message);
//         res.status(400).json({ message });
//     }
   
// })

module.exports = router;