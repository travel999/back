const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth-middleware");

const UserController = require("../controllers/users.controller");
const usercontroller = new UserController();

router.post("/signup", usercontroller.createUser);
router.post("/login", usercontroller.userLogin);
router.post("/logout", usercontroller.userLogout);
router.post("/checkEmail", usercontroller.checkEmail);
router.post("/checkNickname", usercontroller.checkNickname);
router.get("/me", authMiddleware, usercontroller.findUser);

module.exports = router;


