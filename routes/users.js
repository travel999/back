const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddlewares = require("../middlewares/auth.middleware");
const Post = require("../schemas/posts");
const UserController = require("../controllers/users.controller");
const usercontroller = new UserController();

router.post("/signup", usercontroller.createUser);
router.post("/login", usercontroller.userLogin);
router.post("/logout", usercontroller.userLogout);
router.post("/checkEmail", usercontroller.checkEmail);
router.post("/checkNickname", usercontroller.checkNickname);
// router.get("/me", authMiddleware, usercontroller.findUser); // 수정중

//나의여행일정 가져오기(닉네임이같아야함)

router.get('/mine',authMiddlewares, async (req, res) => {

    try {
        const { nickname } = res.locals.user;
        const post = await Post.find({ nickname });
        if (!post.length) {
            return res.status(400).json({
                errorMessage: '나의 일정 조회에 실패하였습니다.',
            });
        }
        return res.status(200).json({ "statusCode": 200, post });

    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);

    }
});

module.exports = router;


