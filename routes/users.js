const express = require("express");
const router = express.Router();
const authMiddlewares = require("../middlewares/auth.middleware");
const { img_up } = require('../middlewares/user.image');

const UserController = require("../controllers/users.controller");
const usercontroller = new UserController();

// router.post("/signup", multer.uploadProfile.single("img"), usercontroller.createUser);
router.post("/signup", img_up.single('img'), usercontroller.createUser);
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


// img_up.single('img'),

// router.post("/test", img_up.single('img'),async (req, res, next) => {
//     // img_up.single('img'),
//     // console.log (111111, req.file.location)
//     const uri = req.file.location
//     console.log(uri)
//     // const userImage = String(uri)
//     // const test = "1232satsdat134"
//     const email = "stasdtst"
//     // const { email, password} = req.body;
//     await User.create({ email, uri });
//     res.status(200).json({ message: "새로운 유저 정보가 등록되었습니다" })

// })


module.exports = router;


