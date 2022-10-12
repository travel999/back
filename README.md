#### 우리같이 여행일정 짜보지 않을래?
# 🛩 실시간 여행일정 공유 서비스 'OORIGACHI(우리가치)' 

### ❤️ [OORIGACHI 바로가기](https://oorigachi.com)
### ❤️ [OORIGACHI 발표영상 바로가기](https://youtu.be/4dvEbESYDXQ)

## 서비스 개요
#### 다 같이 가는 여행인데, 나 혼자서만 계획짜고 정리 한다는건 너무 불편한거 같아!!
##### 그런 당신을 위한 실시간 여행일정 공유 서비스 'OORIGACHI(우리가치)' 를 소개합니다.
##### 가고싶은 여행지를 선택하고, 작성한 일정글들을 초대된 일행과 실시간으로 확인할 수 있어서 다함께 여행계획을 짤 수 있습니다.


## 🗓 프로젝트 기간
2022.08.26 ~ 2022.10.07

## 아키텍쳐
![아키텍쳐](https://user-images.githubusercontent.com/108726282/195365742-1ba4f24d-e1d9-485d-b5af-840a2932c507.png)

## 📑 페이지
#### 1. 회원가입 / 로그인
* 이메일 인증
* 일반 로그인
* 카카오 소셜로그인
#### 2. 메인 페이지 (DashBord)
* 내가 작성한 여행일정, 내가 찜한 여행일정, 공개일정 축약 리스트
#### 3. 일정 등록페이지
* 여행일행 초대
* 여행장소 선택 후 일정 작성
* 실시간 채팅
#### 4. 찜한 일정 페이지
* 찜한 일정 전체 리스트
#### 5. 공개일정 페이지
* 다른사람이 공개한 여행일정 전체 리스트


## 🔎 주요 기능
|카카오맵 마커 표기 및 일정카드 생성|
|---|
![ 마커](https://user-images.githubusercontent.com/54390853/193458236-983776ab-c4a9-40db-a022-3c968a457bed.gif)
|실시간 공유 및 채팅|
|![채팅](https://user-images.githubusercontent.com/54390853/193409603-1d24e08a-e668-4c49-b1eb-78e3329adb33.gif)|
|다른 사람이 작성한 여행일정 공유|
|![공개](https://user-images.githubusercontent.com/54390853/193458867-8bfa0633-813b-4741-bc42-76e3b0d456f7.gif)|



##  팀 맴버

|이름|포지션|깃허브|담당기능|
|---|---|---|---------------|
|임주영|FE🔰|[주영's github](https://github.com/JJOOYYONG)|카카오맵API를 사용하여 일정 CRUD 기능 구현, 등록된 일정 상세보기(수정/삭제) 알고리즘 구축|
|강나오미|FE|[나오미's github](https://github.com/na-0-mi)|일반,소셜로그인/ 회원가입 / 마이페이지 / 이메일 인증 / cloudFront(https) 서버 배포|
|문동환|FE|[동환's github](https://github.com/moduri)| 메인페이지/ 공개된 일정 페이지 / 좋아요 페이지 /소켓ios을 사용한 실시간 채팅 및 작성 글 공유 기능|
|김승남|BE🔰|[승남's github](https://github.com/hinel03)|elb nginx https 리버스 프록시 서버/ 로드밸런싱/ 이메일 인증/ 유저,메인페이지 CRUD|
|김동일|BE|[동일's github](https://github.com/dongridongil)|좋아요 CRUD / 소셜로그인(카카오톡) /알림 기능 /Morgan 기능/ Bycrypt 암호화기능구현|
|신현호|BE|[현호's github](https://github.com/azoong)|일정 CRUD / 소켓io을 사용한 실시간 채팅 및 작성 글 공유 기능/ 자동배포 / 로깅 / 테스트코드|
|최소이|DE|-| 메인,모바일,홍보물 디자인|




## 사용 툴
* ### 프론트 엔드
![html](https://user-images.githubusercontent.com/54390853/192483579-861d9e0f-92a8-45cf-83f9-c516b8b77829.svg)
![css](https://user-images.githubusercontent.com/54390853/192483828-f232adbe-aee0-4fbf-93e7-7a70938b0ced.svg)
![compo](https://user-images.githubusercontent.com/54390853/192484076-2b7d6061-0a63-48c4-a968-901ff4d0129a.svg)
![login](https://user-images.githubusercontent.com/54390853/192484009-8439f8d4-5e16-4ab9-83de-76128a0c92ca.svg)
![map](https://user-images.githubusercontent.com/54390853/192484145-99596bd4-6d0b-45e3-abc6-7d902a5b58fc.svg)
![react](https://camo.githubusercontent.com/d7a20725f534274737c2e8ea95bd345a2f09c31f22910de188b3151aad65b45d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d3631444146423f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d626c61636b)
![redux](https://camo.githubusercontent.com/2c78c672eaa7ca9fad81351ca2f9f3c97f02cf4b596b2e7ca3e924434d22d3a2/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656475782d3736344142433f7374796c653d666f722d7468652d6261646765266c6f676f3d7265647578266c6f676f436f6c6f723d707572706c65)
![router](https://user-images.githubusercontent.com/54390853/192484202-72ee2667-9db1-4dc0-8263-c1d6e54bb7df.svg)
![socket](https://user-images.githubusercontent.com/54390853/192484224-219022c8-d6a6-45c4-9a76-89524aff6484.svg)
![toastui](https://user-images.githubusercontent.com/54390853/192484248-98e45055-e31f-43b1-beae-8f4daa787787.svg)
![axios](https://user-images.githubusercontent.com/54390853/192484278-c3bb21d9-5d17-4129-80c3-65ffc2f7f87c.svg)
![amazon](https://user-images.githubusercontent.com/54390853/192484308-30812333-d88a-4300-b81f-8ae9ebb64081.svg)
![cloudFront](https://camo.githubusercontent.com/8c7f11d9cda7605bd4a831c91dbad11bbc06c49f72eb709a853037761869e0d0/687474703a2f2f696d672e736869656c64732e696f2f62616467652f2d436c6f75642046726f6e742d3531324244343f7374796c653d666f722d7468652d6261646765266c6f676f3d266c6f676f436f6c6f723d7768697465)
![github](https://user-images.githubusercontent.com/54390853/192484352-fab7cfb7-2942-4bed-93c3-29491206f1a6.svg)
![githubAction](https://camo.githubusercontent.com/9c814c1d9d546d5c4c330663262c9abe1374cbed2b11a8b50c49c6676e881625/687474703a2f2f696d672e736869656c64732e696f2f62616467652f2d47697448756220416374696f6e732d3230383846463f7374796c653d666f722d7468652d6261646765266c6f676f3d47697448756220416374696f6e73266c6f676f436f6c6f723d7768697465)



* ### 백엔드
![node](https://camo.githubusercontent.com/3a8a16bb825e6350e0f777e29358061eedaf615b6a61c5b8b1e975ee75227440/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64652e6a732d3333393933333f7374796c653d666f722d7468652d6261646765266c6f676f3d4e6f64652e6a73266c6f676f436f6c6f723d7768697465)
![pm2](https://camo.githubusercontent.com/1fca614ed16883f52cd1e1ea59b13f9e57ba97e21e5356a07d6af86ee558a560/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f706d322d3242303337413f7374796c653d666f722d7468652d6261646765266c6f676f3d706d32266c6f676f436f6c6f723d7768697465)
![ng](https://camo.githubusercontent.com/542020159f0557d364ce8e53417ddc14bec95d67ba261e603b48dc00a4ecf9dd/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e47494e582d3030393633393f7374796c653d666f722d7468652d6261646765266c6f676f3d4e47494e58266c6f676f436f6c6f723d7768697465)
![mongo](https://camo.githubusercontent.com/328a99ffe07bf6e828693432b0b56997b31dc1f778a6b668c95ae321ad67c692/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d6f6e676f44422d3437413234382e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d4d6f6e676f4442266c6f676f436f6c6f723d7768697465)
![login](https://user-images.githubusercontent.com/54390853/192484009-8439f8d4-5e16-4ab9-83de-76128a0c92ca.svg)
![github](https://user-images.githubusercontent.com/54390853/192484352-fab7cfb7-2942-4bed-93c3-29491206f1a6.svg)
![amazon](https://user-images.githubusercontent.com/54390853/192484308-30812333-d88a-4300-b81f-8ae9ebb64081.svg)
![ec2](https://camo.githubusercontent.com/50b3d8f1d8a1b77b26030be2141ff771bda0c9a2ab3ed73d2e6076b0bc68dfb4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4543322d2532334646393930302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d416d617a6f6e454332266c6f676f436f6c6f723d7768697465)
![githubAction](https://camo.githubusercontent.com/9c814c1d9d546d5c4c330663262c9abe1374cbed2b11a8b50c49c6676e881625/687474703a2f2f696d672e736869656c64732e696f2f62616467652f2d47697448756220416374696f6e732d3230383846463f7374796c653d666f722d7468652d6261646765266c6f676f3d47697448756220416374696f6e73266c6f676f436f6c6f723d7768697465)
![s3](https://camo.githubusercontent.com/ee5364442e009a57640492ac3f8a992ea519c96356875068cf081ba1d334beed/687474703a2f2f696d672e736869656c64732e696f2f62616467652f2d416d617a6f6e2053332d3536394133313f7374796c653d666f722d7468652d6261646765266c6f676f3d416d617a6f6e205333266c6f676f436f6c6f723d7768697465)
<img src="https://img.shields.io/badge/Jeset-C21325?style=for-the-badge&logo=Jest&logoColor=white">
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JWT&logoColor=white">
<img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white">
