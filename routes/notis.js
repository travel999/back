const express = require("express");
const router = express.Router();

const NotisController = require('../controllers/notis.controller');
const notisController = new NotisController();

router.get("/", notisController.getAllNotice); //알림확인
router.delete("/:noticeMessageId", notisController.deleteNotice); //알림삭제

module.exports = router;