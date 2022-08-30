const express = require("express");
const router = express.Router();

const LikesRouter = require("./likes");
const postsRouter = require("./posts");




router.use("/post", postsRouter);
router.use('/likes', LikesRouter);


module.exports = router;