require('dotenv').config()
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const User = require('../schemas/user')
const passport = require('passport')



//소셜로그인 카카오톡

router.get('/', passport.authenticate('kakao'))

const kakaoCallback = (req, res, next) => {
    passport.authenticate(
        'kakao',
        { failureRedirect: '/' },
        (err, user, info) => {
            if (err) return next(err)
            console.log('콜백')
            const userInfo = user
            const { userId ,profileImage,nickname  } = user
            const token = jwt.sign({ userId }, process.env.KAKAO_SECRETKEY)

            result = {
                token,
                userInfo,
                profileImage,
                nickname
            
            }
            console.log('카카오 콜백 함수 결과', result)
            res.status(200).send({ user: result })
        }
    )(req, res, next)
}

router.get('/callback', kakaoCallback)


module.exports = router;