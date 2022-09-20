const express = require("express");
const router = express.Router();

const NotisController = require('../controllers/notis.controller');

router.get("/", NotisController.getAllNotice); //알림확인

module.exports = router;