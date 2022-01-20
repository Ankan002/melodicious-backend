const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        trim: true,
        maxlength: 250
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    song: {
        type: ObjectId,
        ref: 'Song',
        required: true
    },
    heart: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema)