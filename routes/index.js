const express = require("express");
const router = express.Router();

const LikesRouter = require("./likes");
const postsRouter = require("./posts");
// const Comments = require("./comments");



router.use("/post", postsRouter);
router.use('/likes', LikesRouter);
// router.use('/comments/', Comments);

module.exports = router;