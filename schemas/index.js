const mongoose = require("mongoose");

const connect = () => {
    const uri = process.env.MONGDB;
    mongoose.connect(
        uri,
        {
            useNewUrlParser: true,
            ignoreUndefined: true,
            useUnifiedTopology: true,
        },
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

// 연결 종료 시 재연결을 시도한다.
mongoose.connection.on('disconnected', () => {
    console.error("Mongo Db DisConnect. reconnect.");
    connect();
})

module.exports = connect;

