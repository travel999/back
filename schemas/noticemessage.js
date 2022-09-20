const mongoose = require('mongoose');

const NoticeMessageSchema = new mongoose.Schema(
    {
        noticeBoardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NoticeBoard',
        },
        checkNotice: {
            type: Boolean,
            default: false,
        },
        noticeTitle: {
            type: String,
        },
        noticeContent: {
            type: String,
        },
        
    },
    { timestamps: true }
);

NoticeMessageSchema.virtual('noticeMessageId').get(function () {
    return this._id.toHexString();
});

NoticeMessageSchema.set('toJSON', { virtuals: true });
NoticeMessageSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('NoticeMessage', NoticeMessageSchema);
