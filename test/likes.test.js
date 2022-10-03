const likeService = require("../services/likes.service");

const likeservice = new likeService()

describe("좋아요 기능", () => {
    const nickname = "테스터"
    const postId = "12312414124"
    test("게시글 조회 성공", async () => {
        likeservice.likeRepository.findAllLike = jest.fn(() => ({
            nickname: ['제비제비', '우리가치'],
            title: '부산여행',
            openPublic: true,
            isLiked: false,
            like: 39,
            date: ['2022-10-01', '2022-10-02']
        }))
        expect(await likeservice.findAllLike(nickname)).toEqual({
            nickname: ['제비제비', '우리가치'],
            title: '부산여행',
            openPublic: true,
            isLiked: false,
            like: 39,
            date: ['2022-10-01', '2022-10-02']
        })
    })

    test("게시글 조회 성공", async () => {
        likeservice.likeRepository.findAllLike = jest.fn(() => (
            false
        ))
        expect(await likeservice.findAllLike(nickname)).toEqual({
            message: '잘못된 접근 입니다'
        })
    })

    test("좋아요 추가", async () => {
        likeservice.likeRepository.findLike = jest.fn(() => (
            undefined
        ))
        likeservice.likeRepository.targetId = jest.fn(() => (
            existLikes = {
                nickname: ['제비제비', '우리가치'],
                title: '부산여행',
                openPublic: true,
                isLiked: false,
                like: 39,
                date: ['2022-10-01', '2022-10-02']
            }
        ))
        likeservice.likeRepository.createLike = jest.fn()
        likeservice.likeRepository.updateLike = jest.fn()
        expect(await likeservice.updateLike(nickname, postId)).toEqual({
            message: '일정에 좋아요를 했습니다', existLikes
        })
    })

    test("좋아요 추가 일정 X", async () => {
        likeservice.likeRepository.findLike = jest.fn(() => (
            undefined
        ))
        likeservice.likeRepository.targetId = jest.fn(() => (
            null
        ))
        likeservice.likeRepository.createLike = jest.fn()
        likeservice.likeRepository.updateLike = jest.fn()
        expect(await likeservice.updateLike(nickname, postId)).toEqual({
            message: '일정이 없습니다'
        })
    })

    test("좋아요 취소", async () => {
        likeservice.likeRepository.findLike = jest.fn(() => (
            {
                postId: '6336b23c8c80bf93985e5c80',
                nickname: '테스터',
              }
        ))
        likeservice.likeRepository.targetId = jest.fn(() => (
            existLikes = {
                nickname: ['제비제비', '우리가치'],
                title: '부산여행',
                openPublic: true,
                isLiked: false,
                like: 39,
                date: ['2022-10-01', '2022-10-02']
            }
        ))
        likeservice.likeRepository.deleteLike = jest.fn()
        likeservice.likeRepository.updateLike = jest.fn()
        expect(await likeservice.updateLike(nickname, postId)).toEqual({
            message: '일정에 좋아요를 취소했습니다', existLikes
        })
    })

    test("좋아요 취소 일정 x", async () => {
        likeservice.likeRepository.findLike = jest.fn(() => (
            {
                postId: '6336b23c8c80bf93985e5c80',
                nickname: '테스터',
              }
        ))
        likeservice.likeRepository.targetId = jest.fn(() => (
           null
        ))
        likeservice.likeRepository.deleteLike = jest.fn()
        likeservice.likeRepository.updateLike = jest.fn()
        expect(await likeservice.updateLike(nickname, postId)).toEqual({
            message: '일정이 없습니다'
        })
    })
    
})