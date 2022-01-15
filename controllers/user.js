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
