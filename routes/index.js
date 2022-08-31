const express = require("express");
const router = express.Router();
const authMiddlewares = require("../middlewares/auth-middleware");

const UserRouter = require("./users");
const LikesRouter = require("./likes");
const postsRouter = require("./posts");

router.use("/user", UserRouter);
router.use("/post", authMiddlewares, postsRouter);
router.use('/likes', LikesRouter);



module.exports = router;