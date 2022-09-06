require('dotenv').config();
const passport = require('passport');
const kakao = require('./kakao');

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log('직렬화', user[0].userId);
        done(null, user.userId);
    });
    passport.deserializeUser((user, done) => {
        console.log('역직렬화', user);
        done(null, user);
    });
    kakao();
};