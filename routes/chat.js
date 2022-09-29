const express = require("express");
const router = express.Router();
const Chat = require("../schemas/chat");


router.get("/:postId", async (req, res, next) => {  //채팅방 로그 돌려주는 
    try {
        const { postId } = req.params;
        const chatRoom = await Chat.findOne({ postId })
        if(!chatRoom){
            res.status(201).json({ message: "채팅기록이 없습니다." })
        }else{
            res.status(200).json({ chatRoom });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;