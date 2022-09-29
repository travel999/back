const mongoose = require("mongoose");
const uri = process.env.MONGDB;
const connect = () => {
    
    mongoose.connect(
        uri,
        (error) => {
            if (error) console.log("Mongo DB Connect Error");
            else console.log("몽고db에 성공적으로 연결하였습니다");
        }
    );
};

// 몽구스 Connection에 이벤트 리스너를 삽입
// 에러 발생 시 에러 내용을 기록
mongoose.connection.on("error", (err) => {
    console.error("Mongo DB Connect Error", err);
});



module.exports = connect;


