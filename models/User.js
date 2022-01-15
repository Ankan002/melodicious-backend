const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 40
    },
    providerId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    liked_songs: {
        type: [ObjectId],
        ref: 'Song',
        default: []
    },
    followers: {
        type: [ObjectId],
        ref: 'User',
        default: []
    },
    following: {
        type: [ObjectId],
        ref: 'User',
        default: []
    }
})

module.exports = mongoose.model('User', userSchema)