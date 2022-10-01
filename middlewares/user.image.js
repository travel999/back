const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');

const s3 = new AWS.S3({
    accessKeyId:  process.env.AWSAccessKeyId, 
    secretAccessKey:  process.env.SecretAccessKey,
    region: "ap-northeast-2"
})

const fileFilter = (req, file, callback) => {
    const ext = path.extname(file.originalname).toLocaleLowerCase();
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {errMassage = '이미지 파일 형식이 맞지 않습니다.', callback(errMassage, false);}
    else callback(null, true);                              
    
};


const storage = multerS3({
    s3: s3,
    acl: 'public-read-write',     //권한 설정
    bucket: process.env.BUCKET,   //s3 버킷 주소
    key: (req, file, callback) => {
        callback(null,  `user_image/${Date.now()}_` + file.originalname);  // 저장되는 위치 및 파일명 
    },
    limits: { fileSize: 10 * 5000 * 5000 }
});

const img_up = multer({ 
    storage: storage,
    fileFilter: fileFilter,
});

exports.img_up = img_up