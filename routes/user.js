const express = require('express')
const router = express.Router()
const {fetchUser} = require('../middlewares/fetchUser') 
const {getUser, getUserById} = require('../controllers/user')

//A route to get the user by the jwt access token. Certain super powers are given to this user. You need to be logged in to do so
router.get('/user', fetchUser, getUser)

//A route to get a single user by their id. No super powers are given in this route more likely for stalking other users. You need to be logged in to do so.
router.get('/user/:userId', fetchUser, getUserById)


module.exports = router