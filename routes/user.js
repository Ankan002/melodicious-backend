const express = require('express')
const router = express.Router()
const {fetchUser} = require('../middlewares/fetchUser') 
const {getUser, getUserById, updateUsername} = require('../controllers/user')
const {body} = require('express-validator')

//A route to get the user by the jwt access token. Certain super powers are given to this user. You need to be logged in to do so
router.get('/user', fetchUser, getUser)

//A route to get a single user by their id. No super powers are given in this route more likely for stalking other users. You need to be logged in to do so.
router.get('/user/:userId', fetchUser, getUserById)

//A route to update a user's username. It requires that user to be logged in.
router.put('/user/username', fetchUser, [
    body('username').isLength({min: 1, max: 40}).withMessage('The username must be at least 1 character and at most 40 characters long')
], updateUsername)


module.exports = router