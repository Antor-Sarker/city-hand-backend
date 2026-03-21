const express = require('express')
const userRouter=express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { getProfile } = require('../controllers/userController')

userRouter.get("/profile",authMiddleware, getProfile)

module.exports = userRouter