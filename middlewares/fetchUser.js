require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.fetchUser = async(req, res, next) => {
    const token = req.header('auth-token')

    if(!token){
        res.status(401).json({
            success: false,
            message: 'Unauthorized Access!!'
        })
    }

    try{
        const data = jwt.verify(token, process.env.SECRET)

        req.user = data.id
        next()
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!!'
        })
    }
}