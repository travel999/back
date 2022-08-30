const express = require("express");
const router = express.Router();
const Posts = require("./posts");
// const Comments = require("./comments");
const UserRouter = require("./users");

router.use("/uesrs", [UserRouter]);

router.use('/posts', Posts);
// router.use('/comments/', Comments);

module.exports = router;