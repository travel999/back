const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

const UserRouter = require("./users");
const LikesRouter = require("./likes");
const postsRouter = require("./posts");
const kakaosRouter = require("./kakaos");
const NotisRouter = require("./notis");

const mailRouter = require("./email");
const chatRouter = require("./chat")



router.use("/user", UserRouter);
router.use("/post", authMiddleware, postsRouter);
router.use("/like",authMiddleware, LikesRouter);
router.use("/kakao", kakaosRouter);

router.use("/noti", authMiddleware, NotisRouter);
router.post("/mail", mailRouter);
router.use("/chat",authMiddleware, chatRouter);





module.exports = router;