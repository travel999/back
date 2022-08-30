const express = require("express");
const router = express.Router();

const UserRouter = require("./users");
const LikesRouter = require("./likes");
const postsRouter = require("./posts");

router.use("/users", UserRouter);
router.use("/post", postsRouter);
router.use('/likes', LikesRouter);



module.exports = router;