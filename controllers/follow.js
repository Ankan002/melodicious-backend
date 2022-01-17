const User = require('../models/User')

//A controller to follow an user. It  requires that user to be logged in.
exports.follow = async(req, res) => {
    const userId = req.user

    if(!req.body.userId){
        return res.status(400).json({
            success: false,
            message: 'No target user received'
        })
    }

    try{
        const originUser = await User.findById(userId).select('-followers').select('liked_songs')

        if((originUser?.following).includes(req.body.userId)){
            return res.status(400).json({
                success: false,
                message: 'You are already following this user'
            })
        }

        const targetUser = await User.findById(req.body.userId).select('-following').select('liked_songs')

        if((targetUser?.followers).includes(userId)){
            return res.status(400).json({
                success: false,
                message: 'You are already following this user'
            })
        }

        const newOriginUser = {}
        const newTargetUser = {}

        newOriginUser.following = [req.body.userId, ...originUser?.following]
        newTargetUser.followers = [req.user, ...targetUser?.followers]

        await User.findByIdAndUpdate(req.user, {$set: newOriginUser}, {new: true})

        const returningUser = await User.findByIdAndUpdate(req.body.userId, {$set: newTargetUser}, {new: true}).select('-followers').select('-following').select('-liked_songs')

        res.status(200).json({
            success: true,
            user: returningUser
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

//A controller to unfollow an user. It requires that user to be logged in.
exports.unfollow = async(req, res) => {
    const userId = req.user

    if(!req.body.userId){
        return res.status(400).json({
            success: false,
            message: 'Please provide a target user!'
        })
    }

    try{
        const originUser = await User.findById(userId).select('-followers').select('-liked_songs')

        if(!((originUser?.following).includes(req.body.userId))){
            return res.status(400).json({
                success: false,
                message: 'Please first follow the user!!'
            })
        }

        const targetUser = await User.findById(req.body.userId).select('-following').select('-liked_songs')

        if(!((targetUser?.followers).includes(userId))){
            return res.status(400).json({
                success: false,
                message: 'Please ask your follower to follow you first'
            })
        }

        const newOriginUser = {}
        const newTargetUser = {}

        newOriginUser.following = (originUser.following).filter((user_id) => user_id.toString() !== (req.body.userId).toString())
        newTargetUser.followers = (targetUser.followers).filter((user_id) => user_id.toString() !== userId.toString())

        await User.findByIdAndUpdate(userId, {$set: newOriginUser}, {new: true})

        const returningUser = await User.findByIdAndUpdate(req.body.userId, {$set: newTargetUser}, {new: true}).select('-followers').select('-following').select('-liked_songs')
        
        res.status(200).json({
            success: true,
            user: returningUser 
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