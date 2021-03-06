require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const connectToDB = require('./config/dbConnect')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

const startServer = async() => {
    const app = express()
    const PORT = process.env.PORT
    connectToDB()

    app.use(cors())
    app.use(express.json())
    app.use(fileUpload({
        useTempFiles: true
    }))

    app.get('/', (req, res) => {
        res.json('Welcome to the Melodicious API')
    })

    app.use('/api', authRoutes)
    app.use('/api', userRoutes)

    app.listen(PORT, () => console.log(`App is running`))
}

module.exports = startServer