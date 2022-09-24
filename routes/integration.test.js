const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

require("dotenv").config();

// 토큰
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzJkNWNjMzM1ZjQzYTRkYjg1MTU5NTAiLCJpYXQiOjE2NjM5MzY0OTZ9.peOn42IcG51fMw3E9HdTtUGbRDraZ3iK828J-gDW6F0"


describe("POST / signup", ()=>{
    
    test("로그인", async () => {
       const data = {
            email: "test1234@test.com",
            password: "123456"
            }
        await request(app).post("/user/login").send(data)
        })

    test("임시 일정 작성", async () => {
        const data = {
            title : "나의 여행 일정",
            date : ["2022-11-11", "2022-11-15"]
        }
        await request(app).post("/post").set("authorization", "Bearer " + token).send(data)
        expect(200)
    })

    test("일정 작성", async () => {
        const data = {
            day1:[{con :
                [{day: 1, cardNum: '11', cardMemo: '경주월드'},
                {day: 1, cardNum: '12', cardMemo: '동궁과월지'},
                {day: 1, cardNum: '21', cardMemo: '"황리단길'}]},
                {pin:[
                {day: 1, title: '경주월드', lat: '35.836252574629924', lng: '129.28206598992438'},
                {day: 1, title: '동궁과월지', lat: '35.836252574629924', lng: '129.28206598992438'},
                {day: 2, title: '황리단길', lat: '35.836252574629924', lng: '129.28206598992438'}
            ]}]
            
        }
        await request(app).put("/post/632dae42916c7dfcd375930e").set("authorization", "Bearer " + token).send(data)
        expect(200)
    })
    test("일정 작성 권한 없음", async () => {
        const data = {
            day1:[{con :[
                    {day: 1, cardNum: '11', cardMemo: '경주월드'},
                    {day: 1, cardNum: '12', cardMemo: '동궁과월지'},
                    {day: 1, cardNum: '21', cardMemo: '"황리단길'}]},
                    {pin:[
                    {day: 1, title: '경주월드', lat: '35.836252574629924', lng: '129.28206598992438'},
                    {day: 1, title: '동궁과월지', lat: '35.836252574629924', lng: '129.28206598992438'},
                    {day: 2, title: '황리단길', lat: '35.836252574629924', lng: '129.28206598992438'}
            ]}]
        }
        await request(app).put("/post/632d0049f8d99ed90bee791c").set("authorization", "Bearer " + token).send(data) //DB 초기화 할때 게시글 수정.
        
    })
    
})
afterAll(async () => {
    mongoose.disconnect()
})


