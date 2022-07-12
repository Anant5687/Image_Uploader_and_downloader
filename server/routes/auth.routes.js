const express = require('express')
const { registerAuth, loginAuth } = require('../controller/auth.controller')
const authRouter = express.Router()

authRouter.post('/postRegister', registerAuth)

authRouter.post('/postLogin',loginAuth)

module.exports = authRouter