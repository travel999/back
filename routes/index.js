const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

const UserRouter = require("./users");
const LikesRouter = require("./likes");
const postsRouter = require("./posts");
const kakaosRouter=require("./kakaos");

router.use("/user", UserRouter);
router.use("/post", authMiddleware, postsRouter);
router.use("/like",authMiddleware, LikesRouter);
router.use("/kakao", kakaosRouter);



module.exports = router;