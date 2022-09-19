const express = require("express");
const router = express.Router();
const Chat = require("../schemas/chat");


// router.get("/", async (req, res, next) => {
//     try {
//         const 
//         const { postId } = req.params;
//         const { nickname2 } = req.body
//         const targetUser = await User.findOne({ nickname : nickname2 })
//         if(!targetUser){
//             res.status(400).json({ result: false, errorMessage: "존재하지 않는 닉네임입니다." })
//         }else{
//             await Post.updateOne({ _id : postId }, { $push: { nickname : nickname2} }) // $push 닉네임 배열에 새로운값 을 추가해준다. 
//             res.status(200).json({ result: true, message: `${nickname2}를 일정에 초대하엿습니다.`, });
//         }
//     } catch (err) {
//         console.log(err)
//         next(err);
//     }
// });
module.exports = router;