const express = require("express");
const router = express.Router();
const authMiddlewares = require("../middlewares/auth.middleware");
const { img_up } = require('../middlewares/user.image');
const UserController = require("../controllers/users.controller");
const usercontroller = new UserController();



router.post("/signup", img_up.single('img'), usercontroller.createUser); // 회원가입 multer 주석
router.post("/login", usercontroller.userLogin);
router.post("/logout", usercontroller.userLogout);
router.post("/checkEmail", usercontroller.checkEmail);
router.post("/checkNickname", usercontroller.checkNickname);
router.post("/sendEmail", usercontroller.sendEmail);
router.post("/checkCode", usercontroller.checkCode);

router.get("/me", authMiddlewares, usercontroller.findUser);
router.put("/me/image", authMiddlewares, img_up.single('img'), usercontroller.updateImage);
router.put("/me/password", authMiddlewares, usercontroller.updatePassword);
router.delete("/me/delete", authMiddlewares, usercontroller.deleteUser);
router.get('/mine',authMiddlewares,usercontroller.getmine);//나의여행일정 가져오기(닉네임이같아야함)




module.exports = router;


