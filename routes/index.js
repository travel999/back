const express = require("express");
const router = express.Router();


const postsRouter = require("./posts");
// const Comments = require("./comments");



router.use("/post", postsRouter);
// router.use('/comments/', Comments);

module.exports = router;