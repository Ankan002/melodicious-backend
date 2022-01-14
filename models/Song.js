const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 40
    },
    created_by: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    song: {
        type: String,
        required: true,
        trim: true
    },
    likes: {
        type: Number,
        default: 0
    },
    liked_users: {
        type: [ObjectId],
        ref: 'User',
        default: []
    }
})

module.exports = mongoose.model('Song', songSchema)