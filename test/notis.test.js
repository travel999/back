const notisService = require("../services/notis.service");

const NotisService = new notisService()

describe("알림 기능", () => {
    const user = {
        email: "userdata@gmail.com",
        password: "$2b$12$JRd.kQKihVk6.uImXEsSLuHJeGAkPFHCGzZBZLyN5Ceu/5DQ92mzG",
        nickname: "테스트코드",
        userImage: "테스트이미지"
    }

    test("알림 조회", async () => {
        NotisService.notisRepository.findAllNotice = jest.fn(() => (
            { notice: "633449e101a2fef1b0ae976222a" }
        ))
        expect(await NotisService.findAllNotice(user)).toEqual(
            { notice: "633449e101a2fef1b0ae976222a" }
        )
    })

    test("알림 삭제", async () => {
        NotisService.notisRepository.deleteNotice = jest.fn(() => (
            { notice: "633449e101a2fef1b0ae976222a" }
        ))
        expect(await NotisService.deleteNotice(user)).toEqual(
            { notice: "633449e101a2fef1b0ae976222a" }
        )
    })

    test("알림창 생성", async () => {
        NotisService.notisRepository.createNoticeBoard = jest.fn(() => (
            {
                boardNum: "userdata@gmail.com",
                userId: "테스트코드",
            }
        ))
        expect(await NotisService.createNoticeBoard(user)).toEqual(
            {
                boardNum: "userdata@gmail.com",
                userId: "테스트코드",
            }
        )
    })

    test("초대 알림 보내기", async () => {
        const nickname2 = "테스터"
        NotisService.notisRepository.deleteNotice = jest.fn()
        expect(await NotisService.deleteNotice(nickname2)).toEqual()
    })



})