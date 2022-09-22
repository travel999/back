const request = require("supertest");
const app = require("../app");
const Post = require("../schemas/posts");
require("dotenv").config();

// const connect = require("../schemas/");

// connect();
const mongoose = require("mongoose");



// describe("POST / signup", ()=>{

    test("회원가입 - 신규 가입", async ()=>{
        const content = {
            email : "tester122223@naver.com",
            nickname : "테스터123241",
            userImage : "1234asasdff",
            password : "123456",
            confirm  : "123456"
        }    
        await request(app).post("/user/signup").send(content)
        // .expect((res)=>{console.log("신규 회원 가입 시 db : ",res.body)})
        expect(201);
        // expect(res.statusCode).toBe(201)
    });

    // test("로그인", async () => {
    //     const content = {
    //         email : "tester122223@naver.com",
    //         password : "123456"
    //     }
    //     await request(app).post(/user/login).send(content)
    //     .expect(200)
    // })
// })

    test("임시 일정 작성", async () => {
        const content = {
            title : "나의 여행 일정",
            date : ["2022-11-11", "2022-11-15"]
        }
        await request(app).post("/post").set("token", "Bearer " + token).send(content)
        expect(200)
    })
afterAll(async () => {
    await mongoose.disconnect();
  });


// it('returns 200 OK when sign-up request is valid', (done) => {
//     request(app)
//       .post('/api/1.0/users')
//       .send({
//         first_name: 'person',
//         last_name: 'one',
//         password: '123',
//       })
//       .expect(200, done);
//   });