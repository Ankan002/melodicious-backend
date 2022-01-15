require('dotenv').config()
const User = require('../models/User')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')


exports.login = async(req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            error: errors.array()
        })
    }

    try{
        const {name, username, providerId, image, email} = req.body
        const user = await User.findOne({providerId})

        if(user){
            const data = {
                id: user._id
            }

            const token = jwt.sign(data, process.env.SECRET)

            return res.status(200).json({
                success: true,
                token 
            })
        }

        const newUser = await User.create({
            name,
            username,
            providerId,
            image,
            email
        })

        const data = {
            id: newUser._id
        }

        const token = jwt.sign(data, process.env.SECRET)

        res.status(200).json({
            success: true,
            token
        })

    }
    catch(error){
        console.error(error.message)
        res.json({
            success: false,
            error: 'Internal Server Error!'
        })
    }
}