const userService = require("../services/users.service");

const userservice = new userService()
//테스트 데이터
const email = "test1234@test.com"
const nickname = "테스터"
const userImage = "테스트이미지"
const password = "12345678"
const code = 1234

const userdata = {
    _id: "63390e10b1ef86814ed1a7cd",
    email: "userdata@gmail.com",
    password: "$2b$12$JRd.kQKihVk6.uImXEsSLuHJeGAkPFHCGzZBZLyN5Ceu/5DQ92mzG",
    nickname: "테스트코드",
    userImage: "테스트이미지"
}

describe("회원가입", () => {
    test("회원가입 아이디 생성", async () => {
        userservice.userRepository.createUser = jest.fn(() => (
            userdata
        ))
        expect(await userservice.createUser(email, nickname, userImage, password)).toEqual(
            userdata
        )
    })

    test("이메일 형식 체크", async () => {
        userservice.userRepository.checkEmail = jest.fn(() => ({
            email
        }))
        expect(await userservice.checkEmail(email)).toEqual({
            email
        })
    })

    test("이메일 형식 X", async () => {
        const email = "test1234test.com"
        userservice.userRepository.checkEmail = jest.fn(() => ({
            email: "test1234@test.com"
        }))
        expect(await userservice.checkEmail(email)).toEqual({
            result: false, message: "이메일 형식에 맞게 입력해주세요."
        })
    })

    test("이메일 인증 확인 X", async () => {
        userservice.userRepository.emailValidate = jest.fn(() => ({
            verified: true
        }))
        expect(await userservice.emailValidate(email)).toEqual({
            result: true, message: "인증된 이메일입니다."
        })
    })

    test("이메일 인증 X", async () => {
        userservice.userRepository.emailValidate = jest.fn(() => (
            false
        ))
        expect(await userservice.emailValidate(email)).toEqual({
            result: false, message: "이메일 인증이 필요합니다."
        })
    })

    test("이메일 인증 확인 X", async () => {
        userservice.userRepository.emailValidate = jest.fn(() => ({
            verified: false
        }))
        expect(await userservice.emailValidate(email)).toEqual({
            result: false, message: "인증되지 않은 이메일입니다."
        })
    })

    test("이메일 코드 일치", async () => {
        userservice.userRepository.checkCode = jest.fn(() => ({
            verified: true
        }))
        expect(await userservice.checkCode(email, code)).toEqual({
            result: true, message: "이메일 인증 완료"
        })
    })

    test("이메일 코드 불일치", async () => {

        userservice.userRepository.checkCode = jest.fn(() => ({
            verified: false
        }))
        expect(await userservice.checkCode(email, code)).toEqual({
            result: false, message: "코드가 일치하지 않습니다"
        })
    })

    test("닉네임 양식 체크", async () => {
        const nickname = "테스터"
        userservice.userRepository.checkNickname = jest.fn(() => ({
            nickname: "테스터"
        }))
        expect(await userservice.checkNickname(nickname)).toEqual({
            nickname: "테스터"
        })
    })

    test("닉네임 양식 불일치", async () => {
        const nickname = "@$&*"
        userservice.userRepository.checkNickname = jest.fn(() => ({
            nickname: "테스터"
        }))
        expect(await userservice.checkNickname(nickname)).toEqual({
            result: false, message: "닉네임은 특수문자 제외 2~10 글자로 입력할 수 있습니다."
        })
    })
})


describe("유저 정보 처리", () => {
    test("로그인 확인", async () => {
        userservice.userRepository.login = jest.fn(() => ({
            userdata
        }))
        expect(await userservice.userLogin(nickname, password)).toEqual({
            userdata
        })
    })

    test("유저 정보 조회", async () => {
        userservice.userRepository.findUser = jest.fn(() => (
            userdata
        ))
        expect(await userservice.findUser(nickname, password)).toEqual({
            result: true, userInfo: userdata
        })
    })

    test("유저 정보 조회 실패", async () => {
        userservice.userRepository.findUser = jest.fn(() => (
            false
        ))
        expect(await userservice.findUser(nickname, password)).toEqual({
            result: false, message: "정보 조회 실패"
        })
    })

    test("유저 이미지 변경", async () => {
        const newImage = "테스트이미지"
        userservice.userRepository.updateImage = jest.fn(() => (
            userdata
        ))
        expect(await userservice.updateImage(nickname, newImage)).toEqual({
            result: true, message: "유저 이미지가 변경되었습니다", updateUser: userdata
        })
    })

    test("유저 이미지 변경 실패", async () => {
        const newImage = "테스트이미지 실패"
        userservice.userRepository.updateImage = jest.fn(() => (
            userdata
        ))
        expect(await userservice.updateImage(nickname, newImage)).toEqual({
            result: false, message: "네트워크 에러", updateUser: userdata
        })
    })

    test("유저 이미지 변경 실패", async () => {
        const newImage = "테스트이미지 실패"
        userservice.userRepository.updateImage = jest.fn(() => (
            userdata
        ))
        expect(await userservice.updateImage(nickname, newImage)).toEqual({
            result: false, message: "네트워크 에러", updateUser: userdata
        })
    })

    test("비밀번호 변경", async () => {
        const newPassword = "123456789"
        const confirm = "123456789"
        userservice.userRepository.updatePassword = jest.fn()
        expect(await userservice.updatePassword(nickname, password, newPassword, confirm)).toEqual({
            result: true, message: "비밀번호가 변경되었습니다"
        })
    })

    test("비밀번호 변경 기존비밀변호 ", async () => {
        const newPassword = "12345678"
        const confirm = "12345678"
        userservice.userRepository.updatePassword = jest.fn()
        expect(await userservice.updatePassword(nickname, password, newPassword, confirm)).toEqual({
            result: false, message: "새로운 비밀번호를 입력하세요"
        })
    })

    test("비밀번호 변경 비밀번호 불일치", async () => {
        const newPassword = "123456789"
        const confirm = "12345678900000"
        userservice.userRepository.updatePassword = jest.fn()
        expect(await userservice.updatePassword(nickname, password, newPassword, confirm)).toEqual({
            result: false, message: "비밀번호가 일치하지 않습니다"
        })
    })

    test("비밀번호 변경 양식위반", async () => {
        const newPassword = "1223"
        const confirm = "1223"
        userservice.userRepository.updatePassword = jest.fn()
        expect(await userservice.updatePassword(nickname, password, newPassword, confirm)).toEqual({
            result: false, message: "비밀번호 양식위반"
        })
    })

    test("계정 삭제", async () => {
        userservice.userRepository.deleteUser = jest.fn()
        expect(await userservice.deleteUser(nickname)).toEqual({
            result: true, message: "유저 정보를 삭제하였습니다"
        })
    })

    test("계정 삭제 실패", async () => {
        userservice.userRepository.deleteUser = jest.fn(() => ({
            undefined
        }))
        expect(await userservice.deleteUser(nickname)).toEqual({
            result: false, message: "네트워크에러"
        })
    })

    // test("나의 일정 조회", async () => {
    //     userservice.userRepository.findPost = jest.fn(() => ({
    //         nickname: ["테스터", "테스터1"],
    //         title: '서울 구경',
    //         openPublic: false,
    //         isLiked: false,
    //         like: 0,
    //         date: ['2022-10-26', '2022-10-27']
    //     }))
    //     expect(await userservice.findPost(nickname)).toEqual({
    //         nickname: ["테스터", "테스터1"],
    //         title: '서울 구경',
    //         openPublic: false,
    //         isLiked: false,
    //         like: 0,
    //         date: ['2022-10-26', '2022-10-27']
    //     })
    // })


})    