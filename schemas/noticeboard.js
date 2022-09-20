const mongoose = require('mongoose');

const NoticeBoardSchema = new mongoose.Schema(
    {
        boardNum: {
            type: String,
        },
        userId: {
            type: String,
        },
    },
    { timestamps: true }
);
NoticeBoardSchema.virtual('noticeBoardId').get(function () {
    return this._id.toHexString();
});

NoticeBoardSchema.virtual('notices', {
    ref: 'NoticeMessage',
    localField: '_id',
    foreignField: 'noticeBoardId',
});



NoticeBoardSchema.set('toJSON', { virtuals: true });
NoticeBoardSchema.set('toObject', { virtuals: true });



module.exports = mongoose.model('NoticeBoard', NoticeBoardSchema);
