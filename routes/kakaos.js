require('dotenv').config()
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require('passport')



//소셜로그인 카카오톡

router.get('/', passport.authenticate('kakao'))

const kakaoCallback = (req, res, next) => {
    passport.authenticate(
        'kakao',
        { failureRedirect: '/' },
        (err, user, info) => {
            if (err) return next(err)
            const  userId  = user._id;
            const userInfo = user;
            const token = jwt.sign({ userId }, process.env.myKey)
            result = {
                token,
                userInfo,//이메일,프로필사진,닉네임
            }
            console.log('카카오 콜백 함수 결과', result)
            res.status(200).json({ user: result })
        }
    )(req, res, next)
}
router.get('/callback', kakaoCallback)



module.exports = router;