const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

const UserRouter = require("./users");
const LikesRouter = require("./likes");
const postsRouter = require("./posts");
const kakaosRouter = require("./kakaos");
const NotisRouter = require("./notis");

const chatRouter = require("./chat")

router.get('/', (req, res) => {
    res.status(200).json({ massage: '서버 잘 켜졌습니다.' });
  });

router.use("/user", UserRouter);
router.use("/post", authMiddleware, postsRouter);
router.use("/like",authMiddleware, LikesRouter);
router.use("/kakao", kakaosRouter);

router.use("/noti", authMiddleware, NotisRouter);
router.use("/chat",authMiddleware, chatRouter);





module.exports = router;