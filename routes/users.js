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

router.get("/me", usercontroller.findUser);
router.get('/mine',authMiddlewares,usercontroller.getmine);//나의여행일정 가져오기(닉네임이같아야함)

// router.get("/me", authMiddleware, usercontroller.findUser); // 수정중


module.exports = router;


