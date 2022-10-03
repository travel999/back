const postService = require("../services/posts.service");

const postservice = new postService()
// 테스트 데이터
const nickname = "테스터"
const nickname2 = "테스터0"
const title = "테스트 제목"
const date = ["2030.05.24", "2030.05.25"]
const _id = "12345"
const postId = "1234"

const data = {
    nickname: ["테스터", "테스터1"],
    title: '서울 구경',
    openPublic: false,
    isLiked: false,
    like: 0,
    date: ['2022-10-26', '2022-10-27']
}
const falseData = {
    nickname: ["테스터1", "테스터2"],
    title: '서울 구경',
    openPublic: false,
    isLiked: false,
    like: 0,
    date: ['2022-10-26', '2022-10-27']
}

describe("게시글 CRUD", () => {
    test("게시글 조회 성공", async () => {
        postservice.postRepository.findPost = jest.fn(() => (
            data
        ))
        expect(await postservice.findPost()).toEqual(
            data
        )
    })

    test("게시글 조회 실패", async () => {
        postservice.postRepository.findPost = jest.fn(() => (false))
        expect(await postservice.findPost()).toEqual({
            errormessage: '일정을 찾을수 없습니다.'
        })

    })
    test("게시글 작성", async () => {
        postservice.postRepository.createPost = jest.fn(() => ({
            "title": "가로수길 루트"
        }))
        expect(await postservice.createPost(nickname, title, date)).toEqual({
            "title": "가로수길 루트"
        })
    })

    test("게시글 업데이트", async () => {
        postservice.postRepository.findPost = jest.fn(() => (
            data
        ))
        postservice.postRepository.updatepost = jest.fn(() => ({
            nickname: ["테스터", "테스터1"],
            title: "가로수길 루트"
        }))
        expect(await postservice.updatepost(nickname, _id, title, date)).toEqual({
            nickname: ["테스터", "테스터1"],
            title: "가로수길 루트"
        })
    })

    test("게시글 업데이트 권한 x", async () => {
        postservice.postRepository.findPost = jest.fn(() => (
            falseData
        ))
        postservice.postRepository.updatepost = jest.fn(() => ({
            "nickname": ["테스터1", "테스터2"],
            "title": "가로수길 루트"
        }))
        expect(await postservice.updatepost(nickname, _id, title, date)).toEqual(
            2 //권한이 없음
        )
    })

    test("게시글 제목변경 ", async () => {
        postservice.postRepository.findPost = jest.fn(() => (
            data
        ))
        postservice.postRepository.updatepost = jest.fn(() => ({
            "nickname": ["테스터", "테스터1"],
            "title": "가로수길 루트"
        }))
        expect(await postservice.updatetitle(nickname, _id)).toEqual({
            "nickname": ["테스터", "테스터1"],
            "title": "가로수길 루트"
        })
    })

    test("게시글 제목변경 권한 x", async () => {
        postservice.postRepository.findPost = jest.fn(() => (
            falseData
        ))
        postservice.postRepository.updatepost = jest.fn(() => ({
            "nickname": ["테스터1", "테스터2"],
            "title": "가로수길 루트"
        }))
        expect(await postservice.updatetitle(nickname, _id)).toEqual(
            2 //권한이 없음
        )
    })


    test("게시글 삭제", async () => {
        postservice.postRepository.targetPost = jest.fn(() => (
            data
        ))
        postservice.postRepository.deletepost = jest.fn()
        expect(await postservice.deletepost({ nickname, postId })).toEqual(
            { message: '일정을 삭제하였습니다.' }
        )
    })

    test("게시글 삭제 권한 없음", async () => {
        postservice.postRepository.targetPost = jest.fn(() => (
            falseData
        ))
        postservice.postRepository.deletepost = jest.fn()
        expect(await postservice.deletepost({ nickname, postId })).toEqual(
            { message: '삭제권한이 없습니다. ' }
        )
    })

    test("게시글 삭제 일정 없음", async () => {
        postservice.postRepository.targetPost = jest.fn()
        postservice.postRepository.deletepost = jest.fn()
        expect(await postservice.deletepost({ nickname, postId })).toEqual(
            { message: '일정을 찾을수 없습니다. ' }
        )
    })
})

describe("게시글 공개 ", () => {
    test("게시글 공개 설정", async () => {
        postservice.postRepository.targetPost = jest.fn(() => (
            data
        ))
        postservice.postRepository.publicPost = jest.fn()
        expect(await postservice.publicPost({ postId, nickname, openPublic: true })).toEqual(
            { message: '일정이 공개상태로 변경되었습니다.' }
        )
    })

    test("게시글 비공개 설정", async () => {
        postservice.postRepository.targetPost = jest.fn(() => (
            data
        ))
        postservice.postRepository.publicPost = jest.fn()
        expect(await postservice.publicPost({ postId, nickname, openPublic: false })).toEqual(
            { message: '일정이 비공개상태로 변경되었습니다.' }
        )
    })

    test("게시글 비공개 권한 x", async () => {
        postservice.postRepository.targetPost = jest.fn(() => (
            falseData
        ))
        postservice.postRepository.publicPost = jest.fn()
        expect(await postservice.publicPost({ postId, nickname, openPublic: false })).toEqual(
            2 // 권한이 없음
        )
    })

})

describe("일정에 멤버 초대", () => {
    test("일정에 멤버 추가", async () => {
        postservice.postRepository.targetPost = jest.fn(() => (
            data
        ))
        postservice.postRepository.findUser = jest.fn(() => (true))
        postservice.postRepository.invite = jest.fn(() => (
            data
        ))
        expect(await postservice.invite({ nickname, nickname2, postId })).toEqual(
            data
        )
    })

    test("일정에 멤버 추가 닉네임 X", async () => {
        postservice.postRepository.targetPost = jest.fn(() => (
            data
        ))
        postservice.postRepository.findUser = jest.fn(() => (false))
        postservice.postRepository.invite = jest.fn(() => (
            data
        ))
        expect(await postservice.invite({ nickname, nickname2, postId })).toEqual(
            3 // 존재하지 않는 닉네임
        )
    })

    test("일정에 멤버 추가 권한 X", async () => {
        postservice.postRepository.targetPost = jest.fn(() => (
            falseData
        ))
        postservice.postRepository.findUser = jest.fn(() => (true))
        postservice.postRepository.invite = jest.fn(() => (
            data
        ))
        expect(await postservice.invite({ nickname, nickname2, postId })).toEqual(
            2 // 권한이 없음
        )
    })

    test("일정에 멤버 추가 일정 X", async () => {
        postservice.postRepository.targetPost = jest.fn(() => (
            false
        ))
        postservice.postRepository.findUser = jest.fn(() => (true))
        postservice.postRepository.invite = jest.fn(() => (
            data
        ))
        expect(await postservice.invite({ nickname, nickname2, postId })).toEqual(
            1 // 일정이 없음
        )
    })
})


