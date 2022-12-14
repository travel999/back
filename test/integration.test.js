const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

require("dotenv").config();

// 토큰
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzM0NTQwYzAxYTJmZWYxYjBhZWE0OTIiLCJpYXQiOjE2NjQzNzM5MTZ9.4Fw2mwv3LxZMjRBwMrecuL80NEAS2BqehJaPjC7oSr0"


describe("POST / signup", ()=>{

    test("로그인", async () => {
        const data = {
             email: "shshinkitec2@gmail.com",
             password: "111111"
             }
         await request(app).post("/user/login").send(data)
         .expect(200)
         .expect(200)
         })
    
    test("임시 일정 작성", async () => {
        const data = {
            title : "테스트 여행 일정",
            date : ["2022-11-11", "2022-11-15"]
        }
        await request(app).post("/post").set("authorization", "Bearer " + token).send(data)
        .expect(200)
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
        await request(app).put("/post/633454df01a2fef1b0aea505").set("authorization", "Bearer " + token).send(data)
        .expect(200)
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
        await request(app).put("/post/633450cd01a2fef1b0aea015").set("authorization", "Bearer " + token).send(data) //DB 초기화 할때 게시글 수정.
        .expect(400)
    })

    test("일정 조회", async () => {
        await request(app).get("/post/63344f6601a2fef1b0ae9ecd").set("authorization", "Bearer " + token)
        .expect(200)
    })
    
    
    test("일정 멤버 초대", async () => {
        const data = {
            nickname2 : "테스트코드"
        }
        await request(app).patch("/post/invite/6334557801a2fef1b0aea534").set("authorization", "Bearer " + token).send(data)
        .expect(200)
    })
    
    test("메인페이지 게시글 조회", async () => {
        await request(app).get("/post/main/0").set("authorization", "Bearer " + token)
        .expect(200)
    })

    test("검색기능", async () => {
        await request(app).get(encodeURI(`/post/search/테스트/0`)).set("authorization", "Bearer " + token)
        .expect(200)
    })

    test("좋아요기능", async () => {
        await request(app).post("/like/633450cd01a2fef1b0aea015").set("authorization", "Bearer " + token)
        .expect(200)
    })
    
    test("유저정보 페이지", async () => {
        await request(app).get("/user/me").set("authorization", "Bearer " + token)
        .expect(200)
    })
        
      
})
afterAll(async () => {
    mongoose.disconnect()
})


