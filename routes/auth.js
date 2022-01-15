const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const {login} = require('../controllers/auth')

router.post('/auth/login', [
    body('name').isLength({min: 1, max: 100}).withMessage('Name should be at least 1 character long and at most 100 characters long'),
    body('username').isLength({min: 1, max: 40}).withMessage('The username must be at least 1 character and at most 40 characters long'),
    body('providerId').isLength({min: 1}).withMessage('A provider id is must'),
    body('image').isLength({min: 1}).withMessage('An image is must'),
    body('email').isLength({min: 1}).withMessage('An email  is must')
], login)



module.exports = router