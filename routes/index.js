const express = require("express");
const Posts = require("./posts");
// const Comments = require("./comments");

const router = express.Router();

router.use('/posts', Posts);
// router.use('/comments/', Comments);

module.exports = router;