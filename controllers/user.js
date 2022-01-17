require('dotenv').config()
const User = require('../models/User')

//A controller to get the user by the jwt access token. Certain super powers are given to this user. You need to be logged in to do so.
exports.getUser = async(req, res) => {
    const userId = req.user

    //TODO: Populate the get songs field as well once Song field is registered in the DataBase 
    try{
        const user = await User.findById(userId).populate('followers').populate('following').exec()

        res.status(200).json({
            success: true,
            user
        })
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!!'
        })
    }
}

//A controller to get a single user by their id. No super powers are given in this route more likely for stalking other users. You need to be logged in to do so.
exports.getUserById = async(req, res) => {
    const userId = req.params.userId
    
    try{
        const user = await User.findById(userId).populate('followers').populate('following').select('-liked_songs').exec()

        res.status(200).json({
            success: true,
            user 
        })
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!!'
        })
    }
}

//A route to update a user's username. It requires that user to be logged in.
exports.updateUsername = async(req, res) => {
    const {username} = req.body

    if(username.length >= 4  && (username.substring(username.length - 4)) === '_gal'){
        return res.status(200).json({
            success: false,
            message: 'Username should not contain "_gal" at the end'
        })
    }

    try{
        const isThereSameUsername = await User.countDocuments({username})

        if(isThereSameUsername > 0){
            return res.status(200).json({
                success: false,
                message: 'User with the same username already exists'
            })
        }

        const userId = req.user

        const newUser = {}

        if(username) newUser.username = username

        const user =  await User.findByIdAndUpdate(userId, {$set: newUser}, {new: true})

        res.status(200).json({
            success: true,
            user
        })
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!!'
        })
    }
}
