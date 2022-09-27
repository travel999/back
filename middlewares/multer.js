const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');

const s3 = new AWS.S3({
    accessKeyId:  process.env.AWSAccessKeyId, 
    secretAccessKey:  process.env.SecretAccessKey,
    region: "ap-northeast-2"
})

const uploadProfile = multer({
    storage: multerS3({
      s3,
      bucket: process.env.BUCKET,
      key(req, file, cb) {
        // cb === callback
        const fileName = Math.floor(Math.random() * 100000000).toString();
        const extension = file.mimetype.split("/")[1];
        if (!["png", "jpg", "jpeg", "JPG", "JPEG"].includes(extension)) {
          return cb(
            new Error("png, jpg, jpeg 확장자명의 파일만 업로드 가능합니다")
          );
        }
        cb(null, `mimic/${Date.now()}-${fileName}.${extension}`);
      },
    }),
    // 10mb로 제한
    limits: { fileSize: 10 * 5000 * 5000 },
  });

  module.exports = {uploadProfile} ;